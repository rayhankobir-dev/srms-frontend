import * as Yup from "yup";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { genders, roles } from "@/constants/data";
import { Textarea } from "@/components/ui/Textarea";
import { SelectInput } from "@/components/ui/SelectInput";
import { ErrorMessage, FormikProvider, useFormik } from "formik";
import { User } from "lucide-react";

export type UserFormValues = {
  firstName: string;
  lastName?: string;
  gender: string;
  email: string;
  role: string;
  phone: string;
  address: string;
  password?: string;
  confirmPassword?: string;
};

type Props = {
  initialValues: UserFormValues;
  onSubmit: (values: UserFormValues, { resetForm }: any) => void;
  title?: string;
  description?: string;
  buttonText?: string;
  isLoading?: boolean;
  loadingText?: string;
};

export const getUserSchema = (initialValues?: any) => {
  const schemaFields: Record<string, any> = {
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string(),
    gender: Yup.string().required("Gender is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    address: Yup.string().required("Address is required"),
    role: Yup.string().required("Role is required"),
  };

  if (initialValues.password !== undefined) {
    schemaFields.password = Yup.string().required("Password is required");
    schemaFields.confirmPassword = Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required");
  }

  return Yup.object().shape(schemaFields);
};
export default function UserForm({
  initialValues,
  onSubmit,
  title = "Add User",
  description = "Please make sure to fill in all the required fields",
  buttonText = "Submit",
  isLoading = false,
  loadingText = "Adding",
}: Props) {
  const formik = useFormik({
    initialValues,
    validationSchema: getUserSchema(initialValues),
    onSubmit,
    enableReinitialize: true,
  });

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex flex-col pb-2 border-b">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm">{description}</p>
      </div>

      <form onSubmit={formik.handleSubmit} className="w-full space-y-4">
        <FormikProvider value={formik}>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label required htmlFor="firstName">
                First Name
              </Label>

              <div className="space-y-0.5">
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Jhon Doe"
                  hasError={
                    formik.touched.firstName &&
                    formik.errors.firstName !== undefined
                  }
                  {...formik.getFieldProps("firstName")}
                />
                <ErrorMessage
                  className="text-sm text-rose-500"
                  name="firstName"
                  component="p"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="lastName">Last Name</Label>

              <div className="space-y-0.5">
                <Input
                  id="lastName"
                  type="text"
                  hasError={
                    formik.touched.lastName &&
                    formik.errors.lastName !== undefined
                  }
                  {...formik.getFieldProps("lastName")}
                />
                <ErrorMessage
                  className="text-sm text-rose-500"
                  name="lastName"
                  component="p"
                />
              </div>
            </div>

            {initialValues.password !== undefined && (
              <div className="space-y-1">
                <Label required htmlFor="password">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  hasError={
                    formik.touched.password &&
                    formik.errors.password !== undefined
                  }
                  {...formik.getFieldProps("password")}
                />
                <ErrorMessage
                  className="text-sm text-rose-500"
                  name="password"
                  component="p"
                />
              </div>
            )}

            {initialValues.confirmPassword !== undefined && (
              <div className="space-y-1">
                <Label required htmlFor="confirmPassword">
                  Re-type password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  hasError={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword !== undefined
                  }
                  {...formik.getFieldProps("confirmPassword")}
                />
                <ErrorMessage
                  className="text-sm text-rose-500"
                  name="confirmPassword"
                  component="p"
                />
              </div>
            )}

            <div className="space-y-1">
              <Label required htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                hasError={
                  formik.touched.email && formik.errors.email !== undefined
                }
                {...formik.getFieldProps("email")}
              />
              <ErrorMessage
                className="text-sm text-rose-500"
                name="email"
                component="p"
              />
            </div>

            <div className="space-y-1">
              <Label required htmlFor="gender">
                Gender
              </Label>

              <div className="space-y-0.5">
                <SelectInput
                  options={genders}
                  placeholder="Select user gender"
                  hasError={
                    formik.touched.gender && formik.errors.gender !== undefined
                  }
                  {...formik.getFieldProps("gender")}
                  onChange={(value) => {
                    formik.setFieldValue("gender", value);
                  }}
                />

                <ErrorMessage
                  className="text-sm text-rose-500"
                  name="gender"
                  component="p"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label required htmlFor="phone">
                Phone
              </Label>

              <div className="space-y-0.5">
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Phone number"
                  hasError={
                    formik.touched.phone && formik.errors.phone !== undefined
                  }
                  {...formik.getFieldProps("phone")}
                />
                <ErrorMessage
                  className="text-sm text-rose-500"
                  name="phone"
                  component="p"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label required htmlFor="role">
                Role
              </Label>

              <div className="space-y-0.5">
                <SelectInput
                  options={roles}
                  placeholder="Select a user role"
                  hasError={
                    formik.touched.role && formik.errors.role !== undefined
                  }
                  {...formik.getFieldProps("role")}
                  onChange={(value) => {
                    formik.setFieldValue("role", value);
                  }}
                />

                <ErrorMessage
                  className="text-sm text-rose-500"
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
                  id="address"
                  placeholder="Address"
                  {...formik.getFieldProps("address")}
                />
                <ErrorMessage
                  className="text-sm text-rose-500"
                  name="address"
                  component="p"
                />
              </div>
            </div>
          </div>

          <Button
            isLoading={isLoading}
            loadingText={loadingText}
            disabled={isLoading}
            type="submit"
            className="w-full"
          >
            <User size={16} />
            {buttonText}
          </Button>
        </FormikProvider>
      </form>
    </div>
  );
}
