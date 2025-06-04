import { useFormik } from "formik"
import Link from "next/link"
import React, { useState } from "react"
import * as yup from "yup"
import { Button } from "@/components/ui/Button"
import { ErrorMessage, FormikProvider } from "formik"
import api from "@/lib/api"
import toast from "react-hot-toast"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { LockKeyhole } from "lucide-react"
import Spinner from "@/components/shared/Spinner"
import { useRouter, useSearchParams } from "next/navigation"

const passwordSchema = yup.object({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
})

function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const params = useSearchParams()
  const token = params.get("token")

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: passwordSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsLoading(true)
        const { data } = await api.post("/users/reset-password", {
          ...values,
          token,
        })
        await new Promise((resolve) => setTimeout(resolve, 1000))
        resetForm()
        toast.success(data.message)
        router.replace("/auth/login")
      } catch (error: any) {
        toast.error(error.response.message || error.message)
      } finally {
        setIsLoading(false)
      }
    },
  })
  return (
    <form className="grid gap-6" onSubmit={formik.handleSubmit}>
      <FormikProvider value={formik}>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Password</Label>
            <div className="space-y-1">
              <Input
                type="password"
                placeholder="********"
                hasError={formik.errors.password !== undefined}
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
            <Label htmlFor="email">Confirm Password</Label>
            <div className="space-y-1">
              <Input
                type="password"
                placeholder="********"
                hasError={formik.errors.confirmPassword !== undefined}
                {...formik.getFieldProps("confirmPassword")}
              />
              <ErrorMessage
                className="text-xs text-rose-600"
                name="confirmPassword"
                component="p"
              />
            </div>
          </div>

          <Button
            disabled={isLoading}
            type="submit"
            className="group w-full gap-2"
          >
            {isLoading ? (
              <Spinner loadingText="Resetting" />
            ) : (
              <>
                Reset Password
                <LockKeyhole
                  className="duration-300 group-hover:translate-x-1.5"
                  size={14}
                />
              </>
            )}
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

export default ResetPasswordForm
