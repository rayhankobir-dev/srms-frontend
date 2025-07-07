"use client";

import * as Yup from "yup";
import { Save } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { ErrorMessage, FormikProvider, useFormik } from "formik";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

export interface StoreFormValues {
  itemName: string;
  storeIn: number;
  storeOut: number;
  carried: number;
  current: number;
  unit: string;
}

interface Props {
  initialValues: StoreFormValues;
  onSubmit: (values: StoreFormValues, helpers: any) => void;
  setDialogOpen: (open: boolean) => void;
  title?: string;
  description?: string;
  buttonText?: string;
  isLoading?: boolean;
  loadingText?: string;
}

const validationSchema = Yup.object({
  itemName: Yup.string().required("Item name is required"),
  storeIn: Yup.number().required("Incomming stock is required").min(0),
  storeOut: Yup.number().required("Outgoing stock is required").min(0),
  carried: Yup.number().required("Previous stock is required").min(0),
  current: Yup.number().required("Current stock is required").min(0),
  unit: Yup.string().required("Unit is required"),
});

export default function StoreForm({
  initialValues,
  onSubmit,
  title = "Restaurant Item",
  description = "Add or update a restaurant item",
  buttonText = "Add Stocks",
  isLoading = false,
  loadingText = "Creating",
  setDialogOpen,
}: Props) {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  console.log(formik.errors);
  return (
    <form onSubmit={formik.handleSubmit}>
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="border-t">
          <FormikProvider value={formik}>
            <div className="grid gap-2">
              <div className="space-y-1">
                <Label required htmlFor="itemName">
                  Item name
                </Label>
                <div className="space-y-0.5">
                  <Input
                    type="text"
                    placeholder="Chicken Curry"
                    hasError={
                      formik.touched.itemName &&
                      formik.errors.itemName !== undefined
                    }
                    {...formik.getFieldProps("itemName")}
                  />
                  <ErrorMessage
                    className="text-xs text-rose-600"
                    name="itemName"
                    component="p"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label required htmlFor="storeIn">
                  Store in
                </Label>
                <div className="space-y-0.5">
                  <Input
                    type="number"
                    placeholder="Incomming stocks"
                    hasError={
                      formik.touched.storeIn &&
                      formik.errors.storeIn !== undefined
                    }
                    {...formik.getFieldProps("storeIn")}
                  />
                  <ErrorMessage
                    className="text-xs text-rose-600"
                    name="storeIn"
                    component="p"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label required htmlFor="storeOut">
                  Outgoing stocks
                </Label>
                <div className="space-y-0.5">
                  <Input
                    type="number"
                    placeholder="Outgoing stocks"
                    hasError={
                      formik.touched.storeOut &&
                      formik.errors.storeOut !== undefined
                    }
                    {...formik.getFieldProps("storeOut")}
                  />
                  <ErrorMessage
                    className="text-xs text-rose-600"
                    name="storeOut"
                    component="p"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label required htmlFor="carried">
                  Previous stocks
                </Label>
                <div className="space-y-0.5">
                  <Input
                    type="number"
                    placeholder="Previous stocks"
                    hasError={
                      formik.touched.carried &&
                      formik.errors.carried !== undefined
                    }
                    {...formik.getFieldProps("carried")}
                  />
                  <ErrorMessage
                    className="text-xs text-rose-600"
                    name="carried"
                    component="p"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label required htmlFor="current">
                  Current stocks
                </Label>
                <div className="space-y-0.5">
                  <Input
                    type="number"
                    placeholder="Current stocks"
                    hasError={
                      formik.touched.current &&
                      formik.errors.current !== undefined
                    }
                    {...formik.getFieldProps("current")}
                  />
                  <ErrorMessage
                    className="text-xs text-rose-600"
                    name="current"
                    component="p"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label required htmlFor="unit">
                  Unit
                </Label>
                <div className="space-y-0.5">
                  <Input
                    type="text"
                    placeholder="Unit"
                    hasError={
                      formik.touched.unit && formik.errors.unit !== undefined
                    }
                    {...formik.getFieldProps("unit")}
                  />
                  <ErrorMessage
                    className="text-xs text-rose-600"
                    name="unit"
                    component="p"
                  />
                </div>
              </div>
            </div>
          </FormikProvider>
        </CardContent>
        <CardFooter className="grid grid-cols-3 gap-3 border-t pt-4 bg-gray-100">
          <Button
            onClick={() => setDialogOpen(false)}
            type="button"
            className="col-span-1"
            variant="secondary"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="col-span-2"
            isLoading={isLoading}
            loadingText={loadingText}
          >
            <Save size={16} />
            {buttonText}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
