import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import * as Yup from "yup";
import { UserPlus } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { genders, roles } from "@/constants/data";
import { Textarea } from "@/components/ui/Textarea";
import { SelectInput } from "@/components/ui/SelectInput";
import { ErrorMessage, FormikProvider, useFormik } from "formik";

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
  setDialogOpen: (open: boolean) => void;
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
  setDialogOpen,
  title = "Onboard new user",
  description = "Please make sure to fill in all the required fields",
  buttonText = "Onboard",
  isLoading = false,
  loadingText = "Onboarding",
}: Props) {
  const formik = useFormik({
    initialValues,
    validationSchema: getUserSchema(initialValues),
    onSubmit,
    enableReinitialize: true,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent className="border-t">
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
                      placeholder="Doe"
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
                      placeholder="******"
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
                      placeholder="Re-type password"
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
                    placeholder="demo@example.com"
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
                        formik.touched.gender &&
                        formik.errors.gender !== undefined
                      }
                      {...formik.getFieldProps("gender")}
                      onChange={(value) =>
                        formik.setFieldValue("gender", value)
                      }
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
                        formik.touched.phone &&
                        formik.errors.phone !== undefined
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
                      value={formik.values.role}
                      onChange={(value) => formik.setFieldValue("role", value)}
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
              <UserPlus size={16} />
              {buttonText}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
}
