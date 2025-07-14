"use client";
import * as Yup from "yup";
import * as React from "react";
import { cx } from "@/lib/utils";
import toast from "react-hot-toast";
import { Label } from "../ui/Label";
import { Divider } from "../ui/Divider";
import api, { endpoints } from "@/lib/api";
import { Input } from "@/components/ui/Input";
import { SelectInput } from "../ui/SelectInput";
import QuantityInput from "../ui/QuantityInput";
import { Button } from "@/components/ui/Button";
import PrintInvoice from "../pdf/PrintInvoice";
import { IMenuItem, IOrder, IPricing, ITable } from "@/types";
import { useSettingStore } from "@/stores/settingStore";
import { Check, Trash2, Plus, Printer, CheckCircle2 } from "lucide-react";
import { ErrorMessage, FieldArray, FormikProvider, useFormik } from "formik";
import { RadioGroup, RadioGroupItem } from "../ui/RadioGroup";

interface InvoiceItem {
  menu: string;
  unit: string;
  unitPrice: number;
  quantity: number;
  inventoryImpact: number;
  isNew?: boolean;
}

const defaultItem: InvoiceItem = {
  menu: "",
  unit: "",
  quantity: 1,
  unitPrice: 0,
  inventoryImpact: 0,
  isNew: true,
};

const formSchema = Yup.object().shape({
  items: Yup.array().of(
    Yup.object().shape({
      menu: Yup.string().required("Please select menu item"),
      unit: Yup.string().required("Please select item unit"),
      unitPrice: Yup.number().required(),
      quantity: Yup.number().required(),
      inventoryImpact: Yup.number().required(),
    })
  ),
  taxApplied: Yup.number().required().min(0).max(300),
  discountPercentage: Yup.number().required().min(0).max(100),
  dipositAmount: Yup.number().required().min(0).default(0),
  paymentMethod: Yup.string()
    .optional()
    .notOneOf(["", "N/A"], "Please select payment method"),
});

const getUnitPrice = (menus: IMenuItem[], item: InvoiceItem) => {
  if (!item) return 0;
  const menu = menus.find((menu) => menu._id === item.menu);
  if (!menu || !menu.pricing) return 0;
  const pricing = menu.pricing.find((p) => p.unit === item.unit);
  if (!pricing) return 0;
  return pricing.unitPrice;
};

type Props = {
  isEditMode?: boolean;
  initialsValues?: any;
  meal: string;
  table: ITable;
  menus: IMenuItem[];
};

export default function InvoiceForm({
  initialsValues = undefined,
  menus,
  meal,
  table,
  isEditMode,
}: Props) {
  const { settings } = useSettingStore();
  const [isConfirming, setIsConfirming] = React.useState(false);
  const [isConfirmed, setIsConfirmed] = React.useState(false);
  const [confirmedOrder, setConfirmedOrder] = React.useState<IOrder | null>(
    null
  );

  const formik = useFormik({
    initialValues: initialsValues
      ? initialsValues
      : {
          items: [defaultItem],
          taxApplied: settings?.taxPercentage || 0,
          discountPercentage: 0,
        },
    enableReinitialize: isEditMode,
    validationSchema: formSchema,
    onSubmit: async (values) => {
      const { items, taxApplied, discountPercentage } = values;
      const subtotal = items.reduce(
        (sum: number, item: InvoiceItem) =>
          sum + item.quantity * getUnitPrice(menus, item),
        0
      );

      const discountAmount = (subtotal * discountPercentage) / 100;
      const taxAmount = ((subtotal - discountAmount) * taxApplied) / 100;
      const totalAmount = subtotal - discountAmount + taxAmount;
      try {
        setIsConfirming(true);
        if (!isEditMode) {
          const { data } = await api.post(endpoints.orders, {
            meal,
            table,
            items,
            taxApplied,
            discountPercentage,
            totalAmount,
            discountAmount,
            taxAmount,
          });
          setConfirmedOrder(data);
          setIsConfirmed(true);
          toast.success("Order created successfully");
        } else {
          const { data: order } = await api.put(
            `${endpoints.orders}/${values._id}`,
            {
              ...values,
              totalAmount,
              taxApplied,
              discountPercentage,
              discountAmount,
              taxAmount,
              status: "SERVED",
              paymentMethod: values.paymentMethod,
              paymentStatus: "PAID",
            }
          );

          setConfirmedOrder(order);
          setIsConfirmed(true);
          toast.success("Order updated successfully");
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message || error.message);
      } finally {
        setIsConfirming(false);
      }
    },
  });

  const { values, setFieldValue } = formik;

  const handleMenuChange = (index: number, menuId: string) => {
    const item: any = values.items[index];
    const menu = menus.find((menu) => menu._id === menuId);
    if (!item || !menu) return;
    setFieldValue(`items[${index}].menu`, menuId);
    setFieldValue(`items[${index}].unit`, "");
  };

  const handleUnitChange = (index: number, unit: string) => {
    const item: any = values.items[index];
    if (!item) return;
    const menu = menus.find((menu) => menu._id === item.menu);
    if (!menu) return;
    const pricing = menu.pricing.find((p: IPricing) => p.unit === unit);
    if (pricing) {
      setFieldValue(`items[${index}].unit`, unit);
      setFieldValue(`items[${index}].unitPrice`, pricing.unitPrice);
      setFieldValue(`items[${index}].inventoryImpact`, pricing.inventoryImpact);
    }
  };

  const subtotal = values.items.reduce(
    (sum: number, item: InvoiceItem) =>
      sum + item.quantity * getUnitPrice(menus, item),
    0
  );
  const discountAmount = (subtotal * values.discountPercentage) / 100;
  const taxAmount = ((subtotal - discountAmount) * values.taxApplied) / 100;
  const grandTotal = subtotal - discountAmount + taxAmount;

  console.log(menus);

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit} className="relative">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-y bg-blue-50">
                <th className="w-12 px-2 py-3 pl-4 text-left text-sm font-medium">
                  #
                </th>
                <th className="min-w-[200px] px-2 py-3 text-left text-sm font-medium">
                  Item
                </th>
                <th className="min-w-[140px] px-2 py-3 text-left text-sm font-medium">
                  Unit
                </th>
                <th className="w-32 px-2 py-3 text-left text-sm font-medium">
                  Quantity
                </th>
                <th className="w-32 text-nowrap px-2 py-3 text-left text-sm font-medium">
                  Unit Price
                </th>
                <th className="w-32 px-2 py-3 text-left text-sm font-medium">
                  Amount
                </th>
                <th className="w-12 px-2 py-3 pr-4 text-center text-sm font-medium">
                  Action
                </th>
              </tr>
            </thead>
            <FieldArray name="items">
              {({ push, remove }) => (
                <tbody>
                  {values.items.map((item: InvoiceItem, index: number) => {
                    const isEditable = item?.isNew;
                    return (
                      <tr
                        key={index}
                        className={cx(
                          "border-b",
                          !isEditable && "bg-gray-50 cursor-not-allowed"
                        )}
                      >
                        <td className="px-2 py-4 pl-4">#{index + 1}</td>
                        <td className="px-2 py-4 pr-4">
                          <SelectInput
                            placeholder="Select item"
                            options={menus.map((menu) => ({
                              label: menu.itemName,
                              value: menu._id,
                            }))}
                            value={item.menu}
                            onChange={(val) =>
                              handleMenuChange(index, val as string)
                            }
                            disabled={!isEditable}
                          />
                          <ErrorMessage
                            name={`items[${index}].menuId`}
                            component="div"
                            className="text-xs text-red-500"
                          />
                        </td>
                        <td className="px-2 py-4 pr-4">
                          <SelectInput
                            placeholder={
                              item.menu
                                ? "Select unit"
                                : "Please select item first"
                            }
                            options={
                              menus
                                .find((m) => m._id === item.menu)
                                ?.pricing?.map((p) => ({
                                  label: p.unit,
                                  value: p.unit,
                                })) || []
                            }
                            value={item.unit}
                            onChange={(val) =>
                              handleUnitChange(index, val as string)
                            }
                            disabled={!isEditable}
                          />
                          <ErrorMessage
                            name={`items[${index}].unit`}
                            component="div"
                            className="text-xs text-red-500"
                          />
                        </td>
                        <td className="px-2 py-4">
                          <QuantityInput
                            min={1}
                            max={100}
                            value={item.quantity}
                            onChange={(val) =>
                              setFieldValue(`items[${index}].quantity`, val)
                            }
                            disabled={!isEditable}
                          />

                          <ErrorMessage
                            name={`items[${index}].quantity`}
                            className="text-xs text-red-500"
                            component="div"
                          />
                        </td>
                        <td className="px-2 py-4 text-nowrap">
                          ৳ {getUnitPrice(menus, item).toFixed(2)}
                        </td>
                        <td className="px-2 py-4 text-nowrap">
                          ৳{" "}
                          {(getUnitPrice(menus, item) * item.quantity).toFixed(
                            2
                          )}
                        </td>
                        <td className="px-2 py-4 pr-4">
                          <div className="flex gap-1.5">
                            <Button
                              type="button"
                              className="h-8 w-8 p-1"
                              variant="secondary"
                              onClick={() =>
                                push({
                                  menu: "",
                                  unit: "",
                                  quantity: 1,
                                  unitPrice: 0,
                                  inventoryImpact: 0,
                                  isNew: true,
                                })
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </Button>

                            <Button
                              disabled={
                                !isEditable || values.items.length === 1
                              }
                              type="button"
                              className="h-8 w-8 p-1"
                              variant="destructive"
                              onClick={() => remove(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              )}
            </FieldArray>
          </table>

          <div className="mt-6 flex items-start justify-between gap-10 px-4">
            <Button
              type="button"
              variant="secondary"
              className="border-dashed border-blue-300 text-blue-600 hover:bg-blue-50"
              onClick={() =>
                setFieldValue("items", [...values.items, { ...defaultItem }])
              }
            >
              <Plus className="mr-2 h-4 w-4" /> Add Item
            </Button>

            <div className="min-w-[300px] space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="mb-1 block text-sm text-gray-600">
                    Discount(%)
                  </label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    disabled={isEditMode}
                    {...formik.getFieldProps("discountPercentage")}
                  />
                </div>
                <div className="flex-1">
                  <label className="mb-1 block text-sm text-gray-600">
                    Tax(%)
                  </label>
                  <Input
                    type="number"
                    min="0"
                    disabled={isEditMode}
                    {...formik.getFieldProps("taxApplied")}
                  />
                </div>
              </div>

              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sub Total:</span>
                  <span>৳ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount:</span>
                  <span className="text-green-600">
                    ৳ {discountAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax:</span>
                  <span>৳ {taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t pt-2 text-lg font-semibold">
                  <span>Grand Total:</span>
                  <span>৳ {grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
          <Divider className="mb-1.5" />

          {!isEditMode && (
            <div className="flex justify-end gap-3.5 px-4">
              <Button
                type="button"
                disabled={isConfirming || !isConfirmed}
                isLoading={isConfirming}
              >
                <Printer size={18} /> Kitech Token
              </Button>

              {isConfirmed ||
                (isEditMode && (
                  <PrintInvoice
                    order={isEditMode ? values : confirmedOrder}
                    table={table}
                  />
                ))}
              <Button
                disabled={isConfirming}
                isLoading={isConfirming}
                loadingText="Confirming..."
                type="submit"
              >
                <Check size={18} /> Confirm Order
              </Button>
            </div>
          )}

          {isEditMode && (
            <div className="flex flex-col lg:flex-row items-end divide-y lg:divide-y-0 lg:items-center lg:justify-between gap-5 px-4">
              <div className="flex items-center gap-4">
                <div className="space-y-1">
                  <Label required htmlFor="dipositAmount">
                    Diposit Amount
                  </Label>

                  <div className="space-y-0.5">
                    <Input
                      id="dipositAmount"
                      type="number"
                      min="0"
                      {...formik.getFieldProps("dipositAmount")}
                      value={grandTotal}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label required htmlFor="paymentMethod">
                    Payment method
                  </Label>
                  <div className="space-y-0.5">
                    <RadioGroup
                      value={values.paymentMethod}
                      onValueChange={(value) =>
                        setFieldValue("paymentMethod", value)
                      }
                      className="flex items-center gap-2.5 h-8"
                    >
                      <div className="inline-flex items-center gap-1.5">
                        <RadioGroupItem value="CASH" id="CASH" />
                        <Label showRequiredHint={false} htmlFor="CASH">
                          Cash
                        </Label>
                      </div>
                      <div className="inline-flex items-center gap-1.5">
                        <RadioGroupItem value="CARD" id="CARD" />
                        <Label showRequiredHint={false} htmlFor="CARD">
                          Card
                        </Label>
                      </div>
                      <div className="inline-flex items-center gap-1.5">
                        <RadioGroupItem value="ONLINE" id="ONLINE" />
                        <Label showRequiredHint={false} htmlFor="ONLINE">
                          Online
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <ErrorMessage
                    name="paymentMethod"
                    component="div"
                    className="text-xs text-red-500"
                  />
                </div>
              </div>

              <div className="flex gap-3.5 py-3">
                <Button variant="secondary">
                  <Printer size={16} /> Kitchen Token
                </Button>
                <Button variant="secondary">
                  <Printer size={16} /> Print Order
                </Button>
                <Button
                  disabled={isConfirming}
                  isLoading={isConfirming}
                  loadingText="Confirming..."
                  type="submit"
                >
                  <CheckCircle2 size={18} /> Payment Order
                </Button>
              </div>
            </div>
          )}
        </div>
      </form>
    </FormikProvider>
  );
}
