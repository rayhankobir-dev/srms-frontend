"use client"

import * as yup from "yup"
import Link from "next/link"
import toast from "react-hot-toast"
import { LogIn } from "lucide-react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Button } from "@/components/ui/Button"
import { useAuthStore } from "@/stores/authStore"
import { ErrorMessage, FormikProvider, useFormik } from "formik"
import api from "@/lib/api"
import { useState } from "react"
import Spinner from "@/components/shared/Spinner"

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
})

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuthStore()

  const handleFormSubmit = async (values: any, { resetForm }: any) => {
  try {
    setIsLoading(true)
    const { data } = await api.post("/users/login", values)
    login(data.user, data.token)
    resetForm()
    await new Promise((resolve) => setTimeout(resolve, 3000))

    if (data.user.role === "STUFF") {
      router.replace("/dining")
    } else {
      router.replace("/")
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message || error.message)
  } finally {
    setIsLoading(false)
  }
}

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: handleFormSubmit,
  })

  return (
    <form className="grid gap-6" onSubmit={formik.handleSubmit}>
      <FormikProvider value={formik}>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <div className="space-y-1">
              <Input
                type="email"
                placeholder="m@example.com"
                hasError={(formik.touched.email && formik.errors.email) !== undefined}
                {...formik.getFieldProps("email")}
              />
              <ErrorMessage
                className="text-xs text-rose-600"
                name="email"
                component="p"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/auth/forgot-password"
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
            <div className="space-y-1">
              <Input
                type="password"
                placeholder="******"
                hasError={(formik.touched.password && formik.errors.password) !== undefined}
                {...formik.getFieldProps("password")}
              />
              <ErrorMessage
                className="text-xs text-rose-600"
                name="password"
                component="p"
              />
            </div>
          </div>
          <Button disabled={isLoading} type="submit" className="group w-full gap-2">
            {isLoading ? <Spinner loadingText="Authenticating"/> : <>
            Login
            <LogIn
              className="duration-300 group-hover:translate-x-1.5"
              size={14}
            />
            </>}
          </Button>
        </div>
      </FormikProvider>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        Do you need help or support?{" "}
        <Link href="/support" className="font-medium">
          Help & Support
        </Link>
      </div>
    </form>
  )
}

export default LoginForm
