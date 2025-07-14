/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { meals } from "@/constants/data";
import api, { endpoints } from "@/lib/api";
import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useParams, useRouter } from "next/navigation";
import { SelectInput } from "@/components/ui/SelectInput";
import { ErrorMessage, FormikProvider, getIn, useFormik } from "formik";

const createMenuSchema = Yup.object().shape({
  itemName: Yup.string().required("Item name is required"),
  thumbnail: Yup.string().optional(),
  meal: Yup.string().required("Meal type is required"),
  linkedInventory: Yup.string().required("Inventory link missing"),
  pricing: Yup.array()
    .of(
      Yup.object().shape({
        unit: Yup.string().required("Unit is required"),
        unitPrice: Yup.number()
          .typeError("Price must be a number")
          .required("Unit price is required"),
        inventoryImpact: Yup.number()
          .typeError("Impact must be a number")
          .required("Inventory impact is required"),
      })
    )
    .min(1, "At least one pricing is required"),
});

function UpdateMenuPage() {
  const { menu } = useParams();
  const router = useRouter();

  const [inventory, setInventory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [menuData, setMenuData] = useState(null);
  const [inventoryFetching, setInventoryFetching] = useState(true);

  const fetchInventory = async () => {
    const { data } = await api.get(endpoints.inventory);
    setInventory(data);
    setInventoryFetching(false);
  };

  const fetchMenu = async () => {
    try {
      const { data } = await api.get(`${endpoints.menus}/${menu}`);
      setMenuData({ ...data, linkedInventory: data.linkedInventory._id });
    } catch {
      toast.error("Failed to load menu item");
    }
  };

  useEffect(() => {
    fetchInventory();
    fetchMenu();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: menuData || {
      itemName: "",
      thumbnail: "",
      meal: "",
      linkedInventory: "",
      pricing: [
        {
          unit: "",
          unitPrice: "",
          inventoryImpact: "",
        },
      ],
    },
    validationSchema: createMenuSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        await api.put(`${endpoints.menus}/${menu}`, values);
        toast.success("Menu updated successfully");
        router.push("/menus"); // Navigate to menus page (optional)
      } catch (error: any) {
        toast.error(error?.response?.data?.message || error.message);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <section className="px-4">
      <form onSubmit={formik.handleSubmit}>
        <FormikProvider value={formik}>
          <Card>
            <CardHeader>
              <CardTitle>Edit restaurant menu</CardTitle>
              <CardDescription className="max-w-lg">
                Update item info and pricing. Ensure data is synced with
                inventory.
              </CardDescription>
            </CardHeader>

            <CardContent className="border-t pt-4">
              <div className="grid grid-cols-4 gap-3">
                <div className="space-y-1">
                  <Label required htmlFor="itemName">
                    Item name
                  </Label>
                  <Input
                    type="text"
                    placeholder="Rice"
                    hasError={
                      !!(formik.touched.itemName && formik.errors.itemName)
                    }
                    {...formik.getFieldProps("itemName")}
                  />
                  <ErrorMessage
                    name="itemName"
                    component="p"
                    className="text-xs text-rose-600"
                  />
                </div>

                <div className="space-y-1">
                  <Label required htmlFor="meal">
                    Meal type
                  </Label>
                  <SelectInput
                    placeholder="Select meal type"
                    options={meals}
                    value={formik.values.meal}
                    hasError={!!(formik.touched.meal && formik.errors.meal)}
                    onChange={(val) => formik.setFieldValue("meal", val)}
                  />
                  <ErrorMessage
                    name="meal"
                    component="p"
                    className="text-xs text-rose-600"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="thumbnail">Thumbnail</Label>
                  <Input
                    type="link"
                    placeholder="Image link"
                    hasError={
                      !!(formik.touched.thumbnail && formik.errors.thumbnail)
                    }
                    {...formik.getFieldProps("thumbnail")}
                  />
                  <ErrorMessage
                    name="thumbnail"
                    component="p"
                    className="text-xs text-rose-600"
                  />
                </div>

                <div className="space-y-1">
                  <Label required htmlFor="linkedInventory">
                    Inventory link
                  </Label>
                  <SelectInput
                    isLoading={inventoryFetching}
                    options={inventory.map((item) => ({
                      label: item.itemName,
                      value: item._id,
                    }))}
                    placeholder="Select inventory"
                    value={formik.values.linkedInventory}
                    hasError={
                      !!(
                        formik.touched.linkedInventory &&
                        formik.errors.linkedInventory
                      )
                    }
                    onChange={(val) =>
                      formik.setFieldValue("linkedInventory", val)
                    }
                  />
                  <ErrorMessage
                    name="linkedInventory"
                    component="p"
                    className="text-xs text-rose-600"
                  />
                </div>
              </div>
            </CardContent>

            <CardContent className="border-t border-dashed pt-2">
              <CardTitle className="text-md mb-1">Pricing</CardTitle>
              {formik.values.pricing.map((_, index) => (
                <Card key={index} className="mt-4">
                  <CardContent className="relative">
                    <div className="absolute -top-4 right-4 flex gap-2">
                      <Button
                        type="button"
                        variant="destructive"
                        className="h-6 w-6 p-0.5 rounded-sm"
                        onClick={() => {
                          const updated = [...formik.values.pricing];
                          updated.splice(index, 1);
                          formik.setFieldValue("pricing", updated);
                        }}
                        disabled={formik.values.pricing.length === 1}
                      >
                        <Trash2 size={14} />
                      </Button>
                      <Button
                        type="button"
                        variant="primary"
                        className="h-6 w-6 p-0.5 rounded-sm"
                        onClick={() =>
                          formik.setFieldValue("pricing", [
                            ...formik.values.pricing,
                            { unit: "", unitPrice: "", inventoryImpact: "" },
                          ])
                        }
                      >
                        <Plus size={14} />
                      </Button>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mt-2">
                      <div>
                        <Label required>Unit</Label>
                        <Input
                          type="text"
                          placeholder="kg"
                          {...formik.getFieldProps(`pricing[${index}].unit`)}
                          hasError={
                            !!getIn(formik.errors, `pricing[${index}].unit`)
                          }
                        />
                        <ErrorMessage
                          name={`pricing[${index}].unit`}
                          component="p"
                          className="text-xs text-rose-600"
                        />
                      </div>

                      <div>
                        <Label required>Unit Price</Label>
                        <Input
                          type="number"
                          placeholder="100"
                          {...formik.getFieldProps(
                            `pricing[${index}].unitPrice`
                          )}
                          hasError={
                            !!getIn(
                              formik.errors,
                              `pricing[${index}].unitPrice`
                            )
                          }
                        />
                        <ErrorMessage
                          name={`pricing[${index}].unitPrice`}
                          component="p"
                          className="text-xs text-rose-600"
                        />
                      </div>

                      <div>
                        <Label required>Inventory Impact</Label>
                        <Input
                          type="number"
                          placeholder="1"
                          {...formik.getFieldProps(
                            `pricing[${index}].inventoryImpact`
                          )}
                          hasError={
                            !!getIn(
                              formik.errors,
                              `pricing[${index}].inventoryImpact`
                            )
                          }
                        />
                        <ErrorMessage
                          name={`pricing[${index}].inventoryImpact`}
                          component="p"
                          className="text-xs text-rose-600"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>

            <CardFooter className="flex justify-end">
              <Button
                isLoading={isLoading}
                type="submit"
                className="w-fit px-5"
              >
                <Plus size={14} /> Update
              </Button>
            </CardFooter>
          </Card>
        </FormikProvider>
      </form>
    </section>
  );
}

export default UpdateMenuPage;
