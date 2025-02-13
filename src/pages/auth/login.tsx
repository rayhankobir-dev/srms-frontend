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
import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import Meta from "@/components/common/meta";
import { APP_LOGO, APP_NAME } from "@/config";
import { ErrorMessage, FormikProvider, useFormik } from "formik";

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

function LoginPage() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      //TODO: Implement login logic
      console.log(values);
    },
  });
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <Meta title="Login" />
      <div className="flex w-full max-w-sm flex-col gap-6 transition duration-500">
        <Card>
          <CardHeader className="text-center">
            <div className="flex items-center gap-2 self-center mb-2 font-semibold">
              <img src={APP_LOGO} alt={APP_NAME} className="h-8 w-8" />
              {APP_NAME}
            </div>
            <CardTitle className="text-xl">
              Welcome back, Please login
            </CardTitle>
            <CardDescription>
              Login with your account by providing credentials
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-4 md:mt-6">
            <form className="grid gap-6" onSubmit={formik.handleSubmit}>
              <FormikProvider value={formik}>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      {...formik.getFieldProps("email")}
                    />
                    <ErrorMessage
                      className="text-sm text-rose-600"
                      name="email"
                      component="p"
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        to="/auth/forgot-password"
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="******"
                      {...formik.getFieldProps("password")}
                    />
                    <ErrorMessage
                      className="text-sm text-rose-600"
                      name="password"
                      component="p"
                    />
                  </div>
                  <Button type="submit" className="w-full group">
                    <>
                      Login
                      <LogIn
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

export default LoginPage;
