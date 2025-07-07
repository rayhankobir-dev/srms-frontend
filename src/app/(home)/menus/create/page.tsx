/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { ErrorMessage, FormikProvider, useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

const createMenuSchema = Yup.object().shape({
  itemName: Yup.string().required("Item name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.string().required("Price is required"),
});

function CreateMenuPage() {
  const formik = useFormik({
    initialValues: {
      itemName: "",
      description: "",
      price: "",
      image: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <section>
      <h1>Create Menu Page</h1>
      <p>This is the create menu page.</p>

      <form onSubmit={formik.handleSubmit}>
        <FormikProvider value={formik}>
          <div>
            <div className="grid gap-2">
              <Label htmlFor="itemName">Item name</Label>
              <div className="space-y-1">
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

            <div className="grid gap-2">
              <Label required htmlFor="price">
                Price
              </Label>
              <div className="space-y-1">
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
          </div>
        </FormikProvider>
      </form>
    </section>
  );
}

export default CreateMenuPage;
