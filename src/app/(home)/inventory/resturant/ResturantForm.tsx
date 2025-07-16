import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import * as yup from "yup";
import { IStock } from "@/types";
import { Save } from "lucide-react";
import toast from "react-hot-toast";
import api, { endpoints } from "@/lib/api";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { SelectInput } from "@/components/ui/SelectInput";
import { ErrorMessage, FormikProvider, useFormik } from "formik";

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
  const [isFetching, setIsFetching] = useState(true);
  const [stocks, setStocks] = useState<IStock[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get(endpoints.stocks);
        setStocks(data);
        setIsFetching(false);
      } catch (error: any) {
        toast.error(error?.response?.data?.message || error.message);
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, []);

  const validationSchema = yup.object().shape({
    itemName: yup.string().required("Item Name is required"),
    newStock: yup
      .number()
      .min(1, "Incomming stocks must be greater than 0")
      .typeError("Incomming ew stocks must be a number")
      .required("Incomming stocks is required")
      .test("max-stock", "New stock exceeds available stock", function (value) {
        if (initialValues) return true;
        const { itemName } = this.parent;
        const stock = stocks.find((s) => s.itemName === itemName);
        return !stock || (value ?? 0) <= stock.current;
      }),
    cooked: yup
      .number()
      .typeError("Cooked must be a number")
      .required("Cooked is required")
      .min(0)
      .test(
        "cooked-less-than-stock",
        "Cooked must not exceed incomming stocks",
        function (value) {
          const { newStock } = this.parent;
          return value !== undefined && value <= newStock;
        }
      ),
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
                  <SelectInput
                    isLoading={isFetching}
                    options={stocks.map((stock) => ({
                      label: stock.itemName,
                      value: stock.itemName,
                    }))}
                    onChange={(val) => {
                      const selected = stocks.find(
                        (stock) => stock.itemName === val
                      );
                      if (selected) {
                        formik.setFieldValue("itemName", val);
                        formik.setFieldValue("unit", selected.unit);
                        formik.setFieldValue("newStock", selected.current);
                      }
                    }}
                    value={formik.values.itemName}
                  />

                  <ErrorMessage
                    className="text-xs text-rose-600"
                    name="itemName"
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
                    readOnly
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

              <div className="space-y-1">
                <Label required htmlFor="newStock">
                  Incomming stocks
                </Label>
                <div className="space-y-0.5">
                  <Input
                    disabled={isFetching || formik.values.itemName === ""}
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
                  In restaurant stocks
                </Label>
                <div className="space-y-0.5">
                  <Input
                    readOnly
                    type="number"
                    placeholder="In stocks"
                    hasError={
                      formik.touched.inStock &&
                      formik.errors.inStock !== undefined
                    }
                    {...formik.getFieldProps("inStock")}
                    value={formik.values.newStock - formik.values.cooked}
                  />
                  <ErrorMessage
                    className="text-xs text-rose-600"
                    name="inStock"
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
