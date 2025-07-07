"use client";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { ErrorMessage, FormikProvider, useFormik } from "formik";
import { Save } from "lucide-react";
import * as Yup from "yup";

const settingsSchema = Yup.object().shape({
  siteName: Yup.string().required("Site name is required"),
});

function GeneralSettings() {
  const formik = useFormik({
    initialValues: {
      siteName: "",
    },
    validationSchema: settingsSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
        <CardDescription>Manage your general settings here.</CardDescription>
      </CardHeader>
      <CardContent className="border-t">
        <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
          <FormikProvider value={formik}>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <Label required htmlFor="siteName">
                  Site name
                </Label>

                <div className="space-y-0.5">
                  <Input
                    placeholder="Site name"
                    hasError={
                      formik.touched.siteName &&
                      formik.errors.siteName !== undefined
                    }
                    {...formik.getFieldProps("siteName")}
                  />
                  <ErrorMessage
                    className="font-light text-xs text-rose-600"
                    name="siteName"
                    component="p"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label required htmlFor="siteName">
                  Site name
                </Label>

                <div className="space-y-0.5">
                  <Input
                    placeholder="Site name"
                    hasError={
                      formik.touched.siteName &&
                      formik.errors.siteName !== undefined
                    }
                    {...formik.getFieldProps("siteName")}
                  />
                  <ErrorMessage
                    className="font-light text-xs text-rose-600"
                    name="siteName"
                    component="p"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label required htmlFor="siteName">
                  Site name
                </Label>

                <div className="space-y-0.5">
                  <Input
                    placeholder="Site name"
                    hasError={
                      formik.touched.siteName &&
                      formik.errors.siteName !== undefined
                    }
                    {...formik.getFieldProps("siteName")}
                  />
                  <ErrorMessage
                    className="font-light text-xs text-rose-600"
                    name="siteName"
                    component="p"
                  />
                </div>
              </div>

              <div className="space-y-1 col-span-3">
                <Label required htmlFor="siteName">
                  Site name
                </Label>

                <div className="space-y-0.5">
                  <Input
                    placeholder="Site name"
                    hasError={
                      formik.touched.siteName &&
                      formik.errors.siteName !== undefined
                    }
                    {...formik.getFieldProps("siteName")}
                  />
                  <ErrorMessage
                    className="font-light text-xs text-rose-600"
                    name="siteName"
                    component="p"
                  />
                </div>
              </div>
            </div>

            <Button loadingText="Saving" className="w-fit self-end px-4">
              <Save size={14} /> Save
            </Button>
          </FormikProvider>
        </form>
      </CardContent>
    </Card>
  );
}

export default GeneralSettings;
