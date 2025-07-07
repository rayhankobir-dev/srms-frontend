"use client";

import * as Yup from "yup";
import { ListChecksIcon } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { ErrorMessage, FormikProvider, useFormik } from "formik";

export interface StoreFormValues {
  itemName: string;
  storeIn: number;
  storeOut: number;
  previous: number;
  current: number;
}

interface Props {
  initialValues: StoreFormValues;
  onSubmit: (values: StoreFormValues, helpers: any) => void;
  title?: string;
  description?: string;
  buttonText?: string;
  isLoading?: boolean;
  loadingText?: string;
}

const validationSchema = Yup.object({
  itemName: Yup.string().required("Item name is required"),
  storeIn: Yup.number().required("Quantity is required").min(0),
  storeOut: Yup.number().required("Received is required").min(0),
  previous: Yup.number().required("Remaining is required").min(0),
  current: Yup.number().required("Current is required").min(0),
});

export default function StoreForm({
  initialValues,
  onSubmit,
  title = "Restaurant Item",
  description = "Add or update a restaurant item",
  buttonText = "Add Stocks",
  isLoading = false,
  loadingText = "Creating",
}: Props) {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm">{description}</p>
      </div>

      <form onSubmit={formik.handleSubmit} className="w-full space-y-4">
        <FormikProvider value={formik}>
          <div>
            <Label required htmlFor="itemName">
              Item name
            </Label>
            <Input type="text" {...formik.getFieldProps("itemName")} />
            <ErrorMessage
              name="itemName"
              component="p"
              className="text-xs text-rose-500"
            />
          </div>

          <div>
            <Label required htmlFor="storeIn">
              Store In
            </Label>
            <Input type="number" {...formik.getFieldProps("storeIn")} />
            <ErrorMessage
              name="storeIn"
              component="p"
              className="text-xs text-rose-500"
            />
          </div>

          <div>
            <Label htmlFor="storeOut">Store Out</Label>
            <Input type="number" {...formik.getFieldProps("storeOut")} />
            <ErrorMessage
              name="storeOut"
              component="p"
              className="text-xs text-rose-500"
            />
          </div>

          <div>
            <Label htmlFor="carried">Previous stocks</Label>
            <Input type="number" {...formik.getFieldProps("carried")} />
            <ErrorMessage
              name="carried"
              component="p"
              className="text-xs text-rose-500"
            />
          </div>

          <div>
            <Label htmlFor="current">Current stocks</Label>
            <Input type="number" {...formik.getFieldProps("current")} />
            {formik.touched.current && formik.errors.current && (
              <div className="text-sm text-red-500">
                {formik.errors.current}
              </div>
            )}
          </div>

          <Button
            isLoading={isLoading}
            loadingText={loadingText}
            disabled={isLoading}
            type="submit"
            className="w-full"
          >
            <ListChecksIcon size={16} />
            {buttonText}
          </Button>
        </FormikProvider>
      </form>
    </div>
  );
}
