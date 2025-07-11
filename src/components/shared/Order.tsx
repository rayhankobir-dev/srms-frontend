"use client";
import * as Yup from "yup";
import * as React from "react";
import { IMenuItem, IPricing } from "@/types";
import { Divider } from "../ui/Divider";
import { Input } from "@/components/ui/Input";
import { SelectInput } from "../ui/SelectInput";
import QuantityInput from "../ui/QuantityInput";
import { Button } from "@/components/ui/Button";
import { Check, Trash2, Plus } from "lucide-react";
import { useSettingStore } from "@/stores/settingStore";
import { ErrorMessage, FieldArray, FormikProvider, useFormik } from "formik";

interface InvoiceItem {
  menuId: string;
  unit: string;
  unitPrice: number;
  quantity: number;
  inventoryImpact: number;
  menu?: IMenuItem | null;
  pricing?: IPricing[] | null;
}

const defaultItem: InvoiceItem = {
  menuId: "",
  unit: "",
  quantity: 1,
  unitPrice: 0,
  inventoryImpact: 0,
  menu: null,
  pricing: [],
};

const formSchema = Yup.object().shape({
  items: Yup.array().of(
    Yup.object().shape({
      menuId: Yup.string().required(),
      unit: Yup.string().required(),
      unitPrice: Yup.number().required(),
      quantity: Yup.number().required(),
      inventoryImpact: Yup.number().required(),
    })
  ),
  tax: Yup.number().required().min(0).max(300),
  discount: Yup.number().required().min(0).max(100),
});

export default function InvoiceForm({ menus }: { menus: IMenuItem[] }) {
  const { settings } = useSettingStore();

  const formik = useFormik({
    initialValues: {
      items: [defaultItem],
      tax: settings?.taxPercentage || 0,
      discount: 0,
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  const { values, setFieldValue } = formik;

  const handleMenuChange = (index: number, menuId: string) => {
    const item: any = values.items[index];
    const menu = menus.find((menu) => menu._id === menuId);
    if (!item || !menu) return;
    setFieldValue(`items[${index}].menuId`, menuId);
    setFieldValue(`items[${index}].menu`, menu);
    setFieldValue(`items[${index}].pricing`, menu.pricing);
  };

  const handleUnitChange = (index: number, unit: string) => {
    const item: any = values.items[index];
    if (!item) return;
    const pricing = item.pricing.find((p: IPricing) => p.unit === unit);
    if (pricing) {
      setFieldValue(`items[${index}].unit`, unit);
      setFieldValue(`items[${index}].unitPrice`, pricing.unitPrice);
      setFieldValue(`items[${index}].inventoryImpact`, pricing.inventoryImpact);
    }
  };

  const getUnitPrice = (item: InvoiceItem) => {
    if (!item.menu || !item.menu.pricing) return 0;
    const pricing = item.menu.pricing.find((p) => p.unit === item.unit);
    if (!pricing) return 0;
    return pricing.unitPrice;
  };

  const subtotal = values.items.reduce(
    (sum, item: InvoiceItem) => sum + item.quantity * getUnitPrice(item),
    0
  );
  const discountAmount = (subtotal * values.discount) / 100;
  const taxAmount = ((subtotal - discountAmount) * values.tax) / 100;
  const grandTotal = subtotal - discountAmount + taxAmount;

  console.log(values);

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
                  {values.items.map((item: InvoiceItem, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-2 py-4 pl-4">{index + 1}</td>
                      <td className="px-2 py-4 pr-4">
                        <SelectInput
                          placeholder="Select item"
                          options={menus.map((menu) => ({
                            label: menu.itemName,
                            value: menu._id,
                          }))}
                          value={item.menuId}
                          onChange={(val) =>
                            handleMenuChange(index, val as string)
                          }
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
                            item.menuId
                              ? "Select unit"
                              : "Please select item first"
                          }
                          options={
                            item.menu?.pricing.map((p) => ({
                              label: p.unit,
                              value: p.unit,
                            })) || []
                          }
                          value={item.unit}
                          onChange={(val) =>
                            handleUnitChange(index, val as string)
                          }
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
                        />

                        <ErrorMessage
                          name={`items[${index}].quantity`}
                          className="text-xs text-red-500"
                          component="div"
                        />
                      </td>
                      <td className="px-2 py-4">
                        ৳ {getUnitPrice(item).toFixed(2)}
                      </td>
                      <td className="px-2 py-4">
                        ৳ {(getUnitPrice(item) * item.quantity).toFixed(2)}
                      </td>
                      <td className="px-2 py-4 pr-4">
                        <div className="flex gap-1.5">
                          <Button
                            type="button"
                            className="h-8 w-8 p-1"
                            variant="secondary"
                            onClick={() =>
                              push({
                                menu: null,
                                menuId: "",
                                unit: "",
                                quantity: 1,
                                unitPrice: 0,
                                inventoryImpact: 0,
                              })
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </Button>

                          <Button
                            disabled={values.items.length === 1}
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
                  ))}
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
                    {...formik.getFieldProps("discount")}
                  />
                </div>
                <div className="flex-1">
                  <label className="mb-1 block text-sm text-gray-600">
                    Tax(%)
                  </label>
                  <Input
                    type="number"
                    min="0"
                    {...formik.getFieldProps("tax")}
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
          <Divider />
          <div className="flex justify-end px-4">
            <Button type="submit">
              <Check size={18} /> Confirm Order
            </Button>
          </div>
        </div>
      </form>
    </FormikProvider>
  );
}
