"use client";
import * as React from "react";
import { IMenuItem } from "@/types";
import { Divider } from "../ui/Divider";
import { Input } from "@/components/ui/Input";
import { SelectInput } from "../ui/SelectInput";
import QuantityInput from "../ui/QuantityInput";
import { Button } from "@/components/ui/Button";
import { Check, Trash2, Plus } from "lucide-react";
import { useSettingStore } from "@/stores/settingStore";

interface InvoiceItem {
  id: string;
  menu: IMenuItem | undefined;
  menuId: string;
  itemName: string;
  unit: string | undefined;
  quantity: number;
  unitPrice: number;
  inventoryImpact: number;
}

export default function InvoiceForm({ menus }: { menus: IMenuItem[] }) {
  const [items, setItems] = React.useState<InvoiceItem[]>([]);
  const { settings } = useSettingStore();
  const [tax, setTax] = React.useState(settings.taxPercentage);
  const [discount, setDiscount] = React.useState(0);
  console.log(menus);

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      menuId: "",
      menu: undefined,
      itemName: "",
      unit: undefined,
      quantity: 1,
      unitPrice: 0,
      inventoryImpact: 0,
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItem = (
    id: string,
    field: keyof InvoiceItem,
    value: string | number
  ) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleMenuChange = (id: string, menu: IMenuItem | undefined) => {
    if (!menu) return;
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              menuId: menu._id,
              menu,
              itemName: menu.itemName,
              unit: "",
              unitPrice: 0,
              inventoryImpact: 0,
            }
          : item
      )
    );
  };

  const handleUnitChange = (id: string, unit: string | undefined) => {
    if (!unit) return;
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id || !item.menu) return item;

        const pricing = item.menu.pricing.find((p) => p.unit === unit);
        if (!pricing) return item;

        return {
          ...item,
          unit,
          unitPrice: pricing.unitPrice,
          inventoryImpact: pricing.inventoryImpact,
        };
      })
    );
  };

  const handleOrderConfirm = async () => {
    alert(items);
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );
  const discountAmount = (subtotal * discount) / 100;
  const taxAmount = ((subtotal - discountAmount) * tax) / 100;
  const grandTotal = subtotal - discountAmount + taxAmount;

  return (
    <div className="relative">
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
              <th className="w-12 px-2 py-3 pr-4 text-left text-sm font-medium">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item: InvoiceItem, index: number) => (
              <tr key={item.id} className="border-b">
                <td className="px-2 py-4 pl-4">{index + 1}</td>
                <td className="px-2 py-4 pr-4">
                  <SelectInput
                    placeholder="Select item"
                    options={menus.map((menu) => ({
                      label: menu.itemName,
                      value: menu,
                    }))}
                    value={item.menu}
                    onChange={(value) => handleMenuChange(item.id, value)}
                  />
                </td>
                <td className="px-2 py-4 pr-4">
                  <SelectInput
                    placeholder="Select unit"
                    options={
                      item.menu
                        ? item.menu?.pricing?.map((p) => ({
                            label: p.unit,
                            value: p.unit,
                          }))
                        : []
                    }
                    value={item.unit}
                    onChange={(value) => handleUnitChange(item.id, value)}
                  />
                </td>
                <td className="px-2 py-4">
                  <QuantityInput
                    min={1}
                    max={100}
                    value={item.quantity}
                    onChange={(value) => updateItem(item.id, "quantity", value)}
                  />
                </td>
                <td className="px-2 py-4">
                  <div className="flex items-center">
                    <span className="mr-1">৳</span>
                    <span>{item.unitPrice.toFixed(2)}</span>
                  </div>
                </td>
                <td className="px-2 py-4">
                  <div className="flex items-center">
                    <span className="mr-1">৳</span>
                    <span>{(item.quantity * item.unitPrice).toFixed(2)}</span>
                  </div>
                </td>
                <td className="px-2 py-4 pr-4">
                  <Button
                    className="text-red-500 hover:text-red-700"
                    variant="ghost"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 flex items-start justify-between gap-10 px-4">
          <Button
            variant="secondary"
            onClick={addItem}
            className="border-dashed border-blue-300 text-blue-600 hover:bg-blue-50"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Item
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
                  value={discount}
                  onChange={(e) =>
                    setDiscount(Number.parseFloat(e.target.value) || 0)
                  }
                />
              </div>
              <div className="flex-1">
                <label className="mb-1 block text-sm text-gray-600">
                  Tax(%)
                </label>
                <Input
                  type="number"
                  min="0"
                  value={tax}
                  onChange={(e) =>
                    setTax(Number.parseFloat(e.target.value) || 0)
                  }
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
          <Button onClick={handleOrderConfirm}>
            <Check size={18} /> Confirm Order
          </Button>
        </div>
      </div>
    </div>
  );
}
