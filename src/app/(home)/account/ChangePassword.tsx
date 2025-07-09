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
import { ErrorMessage, FormikProvider, useFormik } from "formik";

const settingsSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .required("Re-type password")
    .oneOf([Yup.ref("newPassword")], "Passwords did'nt match"),
});

function ChangePassword() {
  const [isUpdating, setIsUpdating] = useState(false);

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: settingsSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsUpdating(true);
        const { data } = await api.post(endpoints.changePassword, values);
        toast.success(data.message);
        resetForm();
      } catch (error: any) {
        toast.error(error.response.data.message || "Something went wrong");
      } finally {
        setIsUpdating(false);
      }
    },
  });
  return (
    <Card className="col-span-12 lg:col-span-4 max-h-fit">
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>Make sure to update your profile.</CardDescription>
      </CardHeader>
      <CardContent className="border-t">
        <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
          <FormikProvider value={formik}>
            <div className="grid grid-colc-1 gap-x-3 gap-y-2">
              <div className="space-y-1">
                <Label required htmlFor="currentPassword">
                  Current password
                </Label>

                <div className="space-y-0.5">
                  <Input
                    id="currentPassword"
                    type="password"
                    placeholder="Current password"
                    hasError={
                      formik.touched.currentPassword &&
                      formik.errors.currentPassword !== undefined
                    }
                    {...formik.getFieldProps("currentPassword")}
                  />
                  <ErrorMessage
                    className="font-light text-xs text-rose-600"
                    name="currentPassword"
                    component="p"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label required htmlFor="newPassword">
                  Password
                </Label>

                <div className="space-y-0.5">
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="New password"
                    hasError={
                      formik.touched.newPassword &&
                      formik.errors.newPassword !== undefined
                    }
                    {...formik.getFieldProps("newPassword")}
                  />
                  <ErrorMessage
                    className="font-light text-xs text-rose-600"
                    name="newPassword"
                    component="p"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label required htmlFor="confirmPassword">
                  Re-type password
                </Label>

                <div className="space-y-0.5">
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    hasError={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword !== undefined
                    }
                    {...formik.getFieldProps("confirmPassword")}
                  />
                  <ErrorMessage
                    className="font-light text-xs text-rose-600"
                    name="confirmPassword"
                    component="p"
                  />
                </div>
              </div>
            </div>

            <Button
              isLoading={isUpdating}
              loadingText="Saving"
              className="w-fit self-end px-4"
            >
              <Save size={14} /> Update Password
            </Button>
          </FormikProvider>
        </form>
      </CardContent>
    </Card>
  );
}

export default ChangePassword;
