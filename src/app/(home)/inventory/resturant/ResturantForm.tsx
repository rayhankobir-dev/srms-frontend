import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import * as yup from "yup";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { ErrorMessage, FormikProvider, useFormik } from "formik";
import { Save } from "lucide-react";

const validationSchema = yup.object().shape({
  itemName: yup.string().required("Item Name is required"),
  newStock: yup
    .number()
    .typeError("New Stock must be a number")
    .required("New Stock is required"),
  cooked: yup
    .number()
    .typeError("Cooked must be a number")
    .required("Cooked is required"),
  sold: yup
    .number()
    .typeError("Sales must be a number")
    .required("Sales is required"),
  inStock: yup
    .number()
    .typeError("In Stock must be a number")
    .required("In Stock is required"),
  unit: yup.string().required("Unit is required"),
});

export type RestaurantFormValues = {
  itemName: string;
  newStock: number;
  cooked: number;
  sold: number;
  inStock: number;
  unit: string;
};

type Props = {
  initialValues: RestaurantFormValues;
  onSubmit: (values: RestaurantFormValues, { resetForm }: any) => void;
  setDialogOpen: (open: boolean) => void;
  title?: string;
  description?: string;
  buttonText?: string;
  isLoading?: boolean;
  loadingText?: string;
};

export default function RestaurantForm({
  initialValues,
  onSubmit,
  title = "Restaurant Item",
  description = "Add or update a restaurant item",
  buttonText = "Submit",
  isLoading = false,
  loadingText = "",
  setDialogOpen,
}: Props) {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

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
                <Label required htmlFor="newStock">
                  New stocks
                </Label>
                <div className="space-y-0.5">
                  <Input
                    type="number"
                    placeholder="Incomming stocks"
                    hasError={
                      formik.touched.newStock &&
                      formik.errors.newStock !== undefined
                    }
                    {...formik.getFieldProps("newStock")}
                  />
                  <ErrorMessage
                    className="text-xs text-rose-600"
                    name="newStock"
                    component="p"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label required htmlFor="cooked">
                  Cooked items
                </Label>
                <div className="space-y-0.5">
                  <Input
                    type="number"
                    placeholder="Cooked items"
                    hasError={
                      formik.touched.cooked &&
                      formik.errors.cooked !== undefined
                    }
                    {...formik.getFieldProps("cooked")}
                  />
                  <ErrorMessage
                    className="text-xs text-rose-600"
                    name="cooked"
                    component="p"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label required htmlFor="inStock">
                  In stocks
                </Label>
                <div className="space-y-0.5">
                  <Input
                    type="number"
                    placeholder="In stocks"
                    hasError={
                      formik.touched.inStock &&
                      formik.errors.inStock !== undefined
                    }
                    {...formik.getFieldProps("inStock")}
                  />
                  <ErrorMessage
                    className="text-xs text-rose-600"
                    name="inStock"
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
