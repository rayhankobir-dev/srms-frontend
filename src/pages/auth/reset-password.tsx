import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import * as yup from "yup";
import { LockKeyhole } from "lucide-react";
import { Link } from "react-router-dom";
import Meta from "@/components/common/meta";
import { APP_LOGO, APP_NAME } from "@/config";
import { ErrorMessage, FormikProvider, useFormik } from "formik";

const passwordSchema = yup.object({
  password: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  confirmPassword: yup.string().required("Password is required"),
});

function ResetPasswordPage() {
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: passwordSchema,
    onSubmit: async (values) => {
      //TODO: Implement login logic
      console.log(values);
    },
  });

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <Meta title="Reset Password" />
      <div className="flex w-full max-w-md flex-col gap-6 transition duration-500">
        <Card>
          <CardHeader className="text-center">
            <div className="flex items-center gap-2 self-center mb-2 font-semibold">
              <img src={APP_LOGO} alt={APP_NAME} className="h-8 w-8" />
              {APP_NAME}
            </div>
            <CardTitle className="text-xl">Reset Your Password</CardTitle>
            <CardDescription>
              Plase use strong password more than 8 characters
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-4 md:mt-6">
            <form className="grid gap-6" onSubmit={formik.handleSubmit}>
              <FormikProvider value={formik}>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="space-y-1">
                      <Input
                        id="password"
                        type="password"
                        placeholder="*******"
                        isError={formik.errors.password !== undefined}
                        {...formik.getFieldProps("password")}
                      />
                      <ErrorMessage
                        className="text-xs text-rose-600"
                        name="password"
                        component="p"
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="space-y-1">
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="******"
                        isError={formik.errors.confirmPassword !== undefined}
                        {...formik.getFieldProps("confirmPassword")}
                      />
                      <ErrorMessage
                        className="text-sm text-rose-600"
                        name="confirmPassword"
                        component="p"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full group">
                    <>
                      Reset Password
                      <LockKeyhole
                        className="group-hover:translate-x-1.5 duration-300"
                        size={12}
                      />
                    </>
                  </Button>
                </div>
              </FormikProvider>
              <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
                Do you need help or support?{" "}
                <Link to="/support">Help & Support</Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

export default ResetPasswordPage;
