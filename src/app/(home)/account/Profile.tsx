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
import { genders } from "@/constants/data";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/stores/authStore";
import { Textarea } from "@/components/ui/Textarea";
import { SelectInput } from "@/components/ui/SelectInput";
import { ErrorMessage, FormikProvider, useFormik } from "formik";

const settingsSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().optional(),
  email: Yup.string().email("Email is invalid").required("Email is required"),
  gender: Yup.string().required("Gender is required"),
  role: Yup.string().required("Role is required"),
  phone: Yup.string().required("Phone is required"),
  address: Yup.string().required("Address is required"),
});

function Profile() {
  const [isUpdating, setIsUpdating] = useState(false);
  const { user, hasHydrated, setUser } = useAuthStore();
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    role: "",
    phone: "",
    address: "",
  };

  const formik = useFormik({
    initialValues: hasHydrated
      ? {
          firstName: user?.firstName || "",
          lastName: user?.lastName || "",
          email: user?.email || "",
          gender: user?.gender || "",
          role: user?.role || "",
          phone: user?.phone || "",
          address: user?.address || "",
        }
      : initialValues,
    validationSchema: settingsSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        setIsUpdating(true);
        const { data } = await api.put(
          `${endpoints.users}/${user?._id}`,
          values
        );
        setUser(data);
        toast.success("Profile updated successfully");
      } catch (error: any) {
        toast.error(error?.response?.data?.message || error.message);
      } finally {
        setIsUpdating(false);
      }
    },
  });

  return (
    <Card className="col-span-12 lg:col-span-8">
      <CardHeader>
        <CardTitle>Profile Details</CardTitle>
        <CardDescription>Make sure to update your profile.</CardDescription>
      </CardHeader>
      <CardContent className="border-t">
        <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
          <FormikProvider value={formik}>
            <div className="grid grid-cols-2 gap-x-3 gap-y-2">
              <div className="space-y-1">
                <Label required htmlFor="firstName">
                  First name
                </Label>

                <div className="space-y-0.5">
                  <Input
                    placeholder="First name"
                    hasError={
                      formik.touched.firstName &&
                      formik.errors.firstName !== undefined
                    }
                    {...formik.getFieldProps("firstName")}
                  />
                  <ErrorMessage
                    className="font-light text-xs text-rose-600"
                    name="firstName"
                    component="p"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="lastName">Last name</Label>

                <div className="space-y-0.5">
                  <Input
                    placeholder="Last name"
                    hasError={
                      formik.touched.lastName &&
                      formik.errors.lastName !== undefined
                    }
                    {...formik.getFieldProps("lastName")}
                  />
                  <ErrorMessage
                    className="font-light text-xs text-rose-600"
                    name="lastName"
                    component="p"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label required htmlFor="gender">
                  Gender
                </Label>

                <div className="space-y-0.5">
                  <SelectInput
                    options={genders}
                    placeholder="Select gender"
                    hasError={
                      formik.touched.gender &&
                      formik.errors.gender !== undefined
                    }
                    {...formik.getFieldProps("gender")}
                  />
                  <ErrorMessage
                    className="font-light text-xs text-rose-600"
                    name="gender"
                    component="p"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label required htmlFor="email">
                  Email
                </Label>

                <div className="space-y-0.5">
                  <Input
                    disabled={true}
                    placeholder="Email address"
                    hasError={
                      formik.touched.email && formik.errors.email !== undefined
                    }
                    {...formik.getFieldProps("email")}
                  />
                  <ErrorMessage
                    className="font-light text-xs text-rose-600"
                    name="email"
                    component="p"
                  />
                </div>
              </div>

              <div className="space-y-1 col-span-2">
                <Label required htmlFor="phone">
                  Phone
                </Label>

                <div className="space-y-0.5">
                  <Input
                    placeholder="Phone number"
                    hasError={
                      formik.touched.phone && formik.errors.phone !== undefined
                    }
                    {...formik.getFieldProps("phone")}
                  />
                  <ErrorMessage
                    className="font-light text-xs text-rose-600"
                    name="phone"
                    component="p"
                  />
                </div>
              </div>

              <div className="space-y-1 col-span-2">
                <Label required htmlFor="address">
                  Address
                </Label>

                <div className="space-y-0.5">
                  <Textarea
                    placeholder="Address"
                    hasError={
                      formik.touched.address &&
                      formik.errors.address !== undefined
                    }
                    {...formik.getFieldProps("address")}
                  />
                  <ErrorMessage
                    className="font-light text-xs text-rose-600"
                    name="address"
                    component="p"
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              isLoading={isUpdating}
              loadingText="Updating.."
              className="w-fit self-end px-4"
            >
              <Save size={14} />
              Update Profile
            </Button>
          </FormikProvider>
        </form>
      </CardContent>
    </Card>
  );
}

export default Profile;
