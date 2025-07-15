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

function CreateMenuPage() {
  const [inventoryFetching, setInventoryFetching] = useState(true);
  const [inventory, setInventory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchInventory = async () => {
    const { data } = await api.get(endpoints.inventory);
    setInventory(data);
    setInventoryFetching(false);
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const formik = useFormik({
    initialValues: {
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
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsLoading(true);
        const { data } = await api.post(endpoints.menus, values);
        console.log(data);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        resetForm();
        toast.success("Item added successfully");
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
              <CardTitle>Add new restaurant menu</CardTitle>
              <CardDescription className="max-w-lg">
                Please make sure pricing are given correctly and most
                importantly, the item is available in the inventory.
              </CardDescription>
            </CardHeader>
            <CardContent className="border-t pt-4">
              <div className="grid grid-cols-4 gap-3">
                <div className="space-y-1">
                  <Label required htmlFor="itemName">
                    Item name
                  </Label>
                  <div className="space-y-0.5">
                    <Input
                      type="text"
                      placeholder="Rice"
                      hasError={
                        (formik.touched.itemName && formik.errors.itemName) !==
                        undefined
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
                  <Label required htmlFor="meal">
                    Meal type
                  </Label>
                  <div className="space-y-0.5">
                    <SelectInput
                      placeholder="Select meal type"
                      options={meals}
                      hasError={
                        formik.touched.meal && formik.errors.meal !== undefined
                      }
                      {...formik.getFieldProps("meal")}
                      onChange={(value) => formik.setFieldValue("meal", value)}
                    />
                    <ErrorMessage
                      className="text-xs text-rose-600"
                      name="meal"
                      component="p"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="thumbnail">Thumbnail</Label>
                  <div className="space-y-0.5">
                    <Input
                      type="link"
                      placeholder="Image link"
                      hasError={
                        (formik.touched.thumbnail &&
                          formik.errors.thumbnail) !== undefined
                      }
                      {...formik.getFieldProps("thumbnail")}
                    />
                    <ErrorMessage
                      className="text-xs text-rose-600"
                      name="thumbnail"
                      component="p"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label required htmlFor="linkedInventory">
                    Inventory link
                  </Label>
                  <div className="space-y-0.5">
                    <SelectInput
                      isLoading={inventoryFetching}
                      options={inventory.map((item) => ({
                        label: item.itemName,
                        value: item._id,
                      }))}
                      placeholder="Select inventory"
                      hasError={
                        (formik.touched.linkedInventory &&
                          formik.errors.linkedInventory) !== undefined
                      }
                      {...formik.getFieldProps("linkedInventory")}
                      onChange={(value) =>
                        formik.setFieldValue("linkedInventory", value)
                      }
                    />
                    <ErrorMessage
                      className="text-xs text-rose-600"
                      name="linkedInventory"
                      component="p"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardContent className="border-t border-dashed pt-2">
              <div className="mb-5">
                <CardTitle className="text-md">Pricing</CardTitle>
                <CardDescription className="text-xs max-w-lg">
                  Please make sure pricing are given correctly and inventory
                  impact.
                </CardDescription>
              </div>

              <div className="grid gap-0">
                {formik.values.pricing.map((_, index) => (
                  <Card key={index} className="mt-5">
                    <CardContent className="relative">
                      <div className="absolute -top-4 right-4 flex gap-2 items-center backdrop-blur-sm">
                        <Button
                          className="h-6 w-6 p-0.5 rounded-sm"
                          type="button"
                          variant="destructive"
                          onClick={() => {
                            const newPricing = [...formik.values.pricing];
                            newPricing.splice(index, 1);
                            formik.setFieldValue("pricing", newPricing);
                          }}
                          disabled={formik.values.pricing.length === 1}
                        >
                          <Trash2 size={14} />
                        </Button>

                        <Button
                          className="h-6 w-6 p-0.5 rounded-sm"
                          type="button"
                          variant="primary"
                          onClick={() =>
                            formik.setFieldValue("pricing", [
                              ...formik.values.pricing,
                              {
                                unit: "",
                                unitPrice: "",
                                inventoryImpact: "",
                              },
                            ])
                          }
                        >
                          <Plus size={14} />
                        </Button>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <Label required htmlFor={`pricing[${index}].unit`}>
                            Unit
                          </Label>
                          <div className="space-y-0.5">
                            <Input
                              type="text"
                              placeholder="kg"
                              hasError={
                                formik.touched.pricing?.[index]?.unit &&
                                getIn(formik.errors, `pricing[${index}].unit`)
                                  ? true
                                  : false
                              }
                              {...formik.getFieldProps(
                                `pricing[${index}].unit`
                              )}
                            />
                            <ErrorMessage
                              className="text-xs text-rose-600"
                              name={`pricing[${index}].unit`}
                              component="p"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <Label
                            required
                            htmlFor={`pricing[${index}].unitPrice`}
                          >
                            Unit price
                          </Label>
                          <div className="space-y-0.5">
                            <Input
                              type="number"
                              placeholder="100"
                              {...formik.getFieldProps(
                                `pricing[${index}].unitPrice`
                              )}
                              hasError={
                                formik.touched.pricing?.[index]?.unitPrice &&
                                getIn(
                                  formik.errors,
                                  `pricing[${index}].unitPrice`
                                )
                                  ? true
                                  : false
                              }
                            />
                            <ErrorMessage
                              className="text-xs text-rose-600"
                              name={`pricing[${index}].unitPrice`}
                              component="p"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <Label
                            required
                            htmlFor={`pricing[${index}].inventoryImpact`}
                          >
                            Inventory impact
                          </Label>
                          <div className="space-y-0.5">
                            <Input
                              type="number"
                              placeholder="100"
                              {...formik.getFieldProps(
                                `pricing[${index}].inventoryImpact`
                              )}
                              hasError={
                                formik.touched.pricing?.[index]
                                  ?.inventoryImpact &&
                                getIn(
                                  formik.errors,
                                  `pricing[${index}].inventoryImpact`
                                )
                                  ? true
                                  : false
                              }
                            />
                            <ErrorMessage
                              className="text-xs text-rose-600"
                              name={`pricing[${index}].inventoryImpact`}
                              component="p"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                isLoading={isLoading}
                type="submit"
                className="w-fit px-5"
              >
                <Plus size={14} /> Create
              </Button>
            </CardFooter>
          </Card>
        </FormikProvider>
      </form>
    </section>
  );
}

export default CreateMenuPage;
