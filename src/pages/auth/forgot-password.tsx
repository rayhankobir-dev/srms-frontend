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
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Meta from "@/components/common/meta";
import { APP_LOGO, APP_NAME } from "@/config";
import { ErrorMessage, FormikProvider, useFormik } from "formik";

const emailSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});

function ForgotPassword() {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: emailSchema,
    onSubmit: async (values) => {
      //TODO: Implement login logic
      console.log(values);
    },
  });
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <Meta title="Forgot Password" />
      <div className="flex w-full max-w-md flex-col gap-6 transition duration-500">
        <Card>
          <CardHeader className="text-center">
            <div className="flex items-center gap-2 self-center mb-2 font-semibold">
              <img src={APP_LOGO} alt={APP_NAME} className="h-8 w-8" />
              {APP_NAME}
            </div>
            <CardTitle className="text-xl">Forgot Your Password?</CardTitle>
            <CardDescription>
              Please enter your email address and we will send you a link to
              reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-4 md:mt-6">
            <form className="grid gap-6" onSubmit={formik.handleSubmit}>
              <FormikProvider value={formik}>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="space-y-1">
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        isError={formik.errors.email !== undefined}
                        {...formik.getFieldProps("email")}
                      />
                      <ErrorMessage
                        className="text-xs text-rose-600"
                        name="email"
                        component="p"
                      />
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <p className="text-xs font-light">
                      Don't forget to check your spam folder.
                    </p>
                    <Button type="submit" className="w-full group">
                      <>
                        Send Password Reset Email
                        <Mail
                          className="group-hover:translate-x-1.5 duration-300"
                          size={12}
                        />
                      </>
                    </Button>
                  </div>
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

export default ForgotPassword;
