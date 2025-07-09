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
import { Save } from "lucide-react";
import toast from "react-hot-toast";
import api, { endpoints } from "@/lib/api";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { useSettingStore } from "@/stores/settingStore";
import { ErrorMessage, FormikProvider, useFormik } from "formik";

const settingsSchema = Yup.object().shape({
  appName: Yup.string().required("Site name is required"),
  appLogo: Yup.string().url().required("Site logo is required"),
  description: Yup.string().required("Site description is required"),
  version: Yup.string().required("Version is required"),
});

function GeneralSettings() {
  const [isUpdating, setIsUpdating] = useState(false);
  const { setSettings } = useSettingStore();

  const formik = useFormik({
    initialValues: {
      appName: "",
      description: "",
      appLogo: "",
      version: "",
    },
    validationSchema: settingsSchema,
    onSubmit: async (values) => {
      try {
        setIsUpdating(true);
        const { data } = await api.put(endpoints.settings, values);
        setSettings(data);
      } catch (error: any) {
        toast.error(error.response.data.message || "Something went wrong");
      } finally {
        setIsUpdating(false);
      }
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
                <Label required htmlFor="appName">
                  Site name
                </Label>

                <div className="space-y-0.5">
                  <Input
                    placeholder="Site name"
                    hasError={
                      formik.touched.appName &&
                      formik.errors.appName !== undefined
                    }
                    {...formik.getFieldProps("appName")}
                  />
                  <ErrorMessage
                    className="font-light text-xs text-rose-600"
                    name="appName"
                    component="p"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label required htmlFor="appLogo">
                  Logo link
                </Label>

                <div className="space-y-0.5">
                  <Input
                    type="url"
                    placeholder="Site name"
                    hasError={
                      formik.touched.appLogo &&
                      formik.errors.appLogo !== undefined
                    }
                    {...formik.getFieldProps("appLogo")}
                  />
                  <ErrorMessage
                    className="font-light text-xs text-rose-600"
                    name="appLogo"
                    component="p"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label required htmlFor="version">
                  Current version
                </Label>

                <div className="space-y-0.5">
                  <Input
                    placeholder="1.0"
                    hasError={
                      formik.touched.version &&
                      formik.errors.version !== undefined
                    }
                    {...formik.getFieldProps("version")}
                  />
                  <ErrorMessage
                    className="font-light text-xs text-rose-600"
                    name="version"
                    component="p"
                  />
                </div>
              </div>

              <div className="space-y-1 col-span-3">
                <Label required htmlFor="description">
                  Description
                </Label>

                <div className="space-y-0.5">
                  <Textarea
                    placeholder="Site description"
                    hasError={
                      formik.touched.appName &&
                      formik.errors.appName !== undefined
                    }
                    {...formik.getFieldProps("description")}
                  />
                  <ErrorMessage
                    className="font-light text-xs text-rose-600"
                    name="description"
                    component="p"
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              isLoading={isUpdating}
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

export default GeneralSettings;
