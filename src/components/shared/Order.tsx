"use client";
import * as React from "react";
import { Divider } from "../ui/Divider";
import { Input } from "@/components/ui/Input";
import { SelectInput } from "../ui/SelectInput";
import { Button } from "@/components/ui/Button";
import { Check, Trash2, Plus } from "lucide-react";
import { useInventoryStore } from "@/stores/inventoryStore";

interface InvoiceItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
}

export default function InvoiceForm() {
  const [items, setItems] = React.useState<InvoiceItem[]>([]);
  const [discount, setDiscount] = React.useState(1);
  const { inventory } = useInventoryStore();
  const [tax, setTax] = React.useState(0);

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      name: "",
      description: "",
      quantity: 1,
      price: 1.0,
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

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
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
              <th className="w-24 px-2 py-3 text-left text-sm font-medium">
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
            {items.map((item, index) => (
              <tr key={item.id} className="border-b">
                <td className="px-2 py-4 pl-4">{index + 1}</td>
                <td className="px-2 py-4">
                  <SelectInput
                    placeholder="Select item"
                    options={inventory.map((item) => ({
                      label: item.itemName,
                      value: item.itemName,
                    }))}
                    value={item.name}
                    onChange={(value) => updateItem(item.id, "name", value)}
                  />
                </td>
                <td className="px-2 py-4">
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateItem(
                        item.id,
                        "quantity",
                        Number.parseInt(e.target.value) || 1
                      )
                    }
                  />
                </td>
                <td className="px-2 py-4">
                  <div className="flex items-center">
                    <span className="mr-1">৳</span>
                    <span>{item.price.toFixed(2)}</span>
                  </div>
                </td>
                <td className="px-2 py-4">
                  <div className="flex items-center">
                    <span className="mr-1">৳</span>
                    <span>{(item.quantity * item.price).toFixed(2)}</span>
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
                  step="0.01"
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
                  step="0.01"
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
          <Button className="gap-1">
            <Check size={18} /> Confirm Order
          </Button>
        </div>
      </div>
    </div>
  );
}
