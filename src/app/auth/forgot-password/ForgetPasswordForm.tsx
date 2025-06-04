"use client"

import * as yup from "yup"
import Link from "next/link"
import { Mail } from "lucide-react"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Button } from "@/components/ui/Button"
import { ErrorMessage, FormikProvider, useFormik } from "formik"
import api from "@/lib/api"
import toast from "react-hot-toast"
import { useState } from "react"
import Spinner from "@/components/shared/Spinner"

const emailSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
})

function ForgetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: emailSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsLoading(true)
        const { data } = await api.post("/users/forget-password", values)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        toast.success(data.message)
        resetForm()
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
            <Label htmlFor="email">Email</Label>
            <div className="space-y-1">
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                hasError={formik.errors.email !== undefined}
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
              Don&apos;t forget to check your spam folder.
            </p>
            <Button
              disabled={isLoading}
              type="submit"
              className="group w-full gap-2"
            >
              {isLoading ? (
                <Spinner loadingText="Sending" />
              ) : (
                <>
                  Send Password Reset Email
                  <Mail
                    className="duration-300 group-hover:translate-x-1.5"
                    size={14}
                  />
                </>
              )}
            </Button>
          </div>
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

export default ForgetPasswordForm
