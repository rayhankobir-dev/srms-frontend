"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import * as Yup from "yup";
import { useState } from "react";
import toast from "react-hot-toast";
import { Save } from "lucide-react";
import api, { endpoints } from "@/lib/api";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { currencies } from "@/constants/data";
import { useSettingStore } from "@/stores/settingStore";
import { SelectInput } from "@/components/ui/SelectInput";
import { ErrorMessage, FormikProvider, useFormik } from "formik";

const settingsSchema = Yup.object().shape({
  tableCount: Yup.number().required("Table count is required"),
  taxPercentage: Yup.number().required("Tax percentage is required"),
  currency: Yup.object({
    code: Yup.string().required("Currency code is required"),
    name: Yup.string().required("Currency name is required"),
    sign: Yup.string().required("Currency sign is required"),
  }).required("Currency is required"),
  inventoryInsufficencyAt: Yup.number().required("Inventory insufficiency at"),
});

function ConfigureSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const { settings, setSettings } = useSettingStore();

  const formik = useFormik({
    initialValues: {
      tableCount: settings?.tableCount || 0,
      taxPercentage: settings?.taxPercentage || 0,
      currency: {
        code: settings?.currency?.code || "BDT",
        name: settings?.currency?.name || "Bangladeshi Taka",
        sign: settings?.currency?.sign || "৳",
      },
      inventoryInsufficencyAt: settings?.inventoryInsufficencyAt || 10,
    },
    validationSchema: settingsSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const { data } = await api.put(endpoints.settings, values);
        setSettings(data);
        toast.success("Settings updated successfully");
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configure Settings</CardTitle>
        <CardDescription>Make sure to configure your settings.</CardDescription>
      </CardHeader>
      <CardContent className="border-t">
        <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
          <FormikProvider value={formik}>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label required htmlFor="tableCount">
                  No. of tables
                </Label>

                <div className="space-y-0.5">
                  <Input
                    placeholder="No. of tables"
                    hasError={
                      formik.touched.tableCount &&
                      formik.errors.tableCount !== undefined
                    }
                    {...formik.getFieldProps("tableCount")}
                  />
                  <ErrorMessage
                    className="font-light text-xs text-rose-600"
                    name="tableCount"
                    component="p"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label required htmlFor="taxPercentage">
                  Tax (%)
                </Label>

                <div className="space-y-0.5">
                  <Input
                    placeholder="Tax in percentage"
                    hasError={
                      formik.touched.taxPercentage &&
                      formik.errors.taxPercentage !== undefined
                    }
                    {...formik.getFieldProps("taxPercentage")}
                  />
                  <ErrorMessage
                    className="font-light text-xs text-rose-600"
                    name="taxPercentage"
                    component="p"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label required htmlFor="currency">
                  Currency
                </Label>

                <div className="space-y-0.5">
                  <SelectInput
                    isLoading={false}
                    placeholder="Select currency"
                    options={currencies.map((c) => ({
                      label: `${c.code} (${c.name})`,
                      value: c,
                    }))}
                    hasError={
                      formik.touched.currency &&
                      formik.errors.currency !== undefined
                    }
                    {...formik.getFieldProps("currency")}
                    onChange={(value) =>
                      formik.setFieldValue("currency", value)
                    }
                  />
                  <ErrorMessage
                    className="font-light text-xs text-rose-600"
                    name="currency"
                    component="p"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label required htmlFor="inventoryInsufficencyAt">
                  Inventory alert limit
                </Label>

                <div className="space-y-0.5">
                  <Input
                    placeholder="Inventory alert limit"
                    hasError={
                      formik.touched.inventoryInsufficencyAt &&
                      formik.errors.inventoryInsufficencyAt !== undefined
                    }
                    {...formik.getFieldProps("inventoryInsufficencyAt")}
                  />
                  <ErrorMessage
                    className="font-light text-xs text-rose-600"
                    name="inventoryInsufficencyAt"
                    component="p"
                  />
                </div>
              </div>
            </div>

            <Button
              disabled={isLoading}
              loadingText="Saving"
              className="w-fit self-end px-4"
            >
              <Save size={14} /> Save
            </Button>
          </FormikProvider>
        </form>
      </CardContent>
    </Card>
  );
}

export default ConfigureSettings;
