import Spinner from "@/components/shared/Spinner"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"
import { Textarea } from "@/components/ui/Textarea"
import { useFormik } from "formik"
import * as yup from "yup"

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string(),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  address: yup.string().required("Address is required"),
  role: yup.string().required("Role is required"),
})

export type UserFormValues = {
  firstName: string
  lastName?: string
  email: string
  role: string
  phone: string
  address: string
}

type Props = {
  initialValues: UserFormValues
  onSubmit: (values: UserFormValues, { resetForm }: any) => void
  title?: string
  description?: string
  buttonText?: string
  isLoading?: boolean
  loadingText?: string
}

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
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  })

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm">{description}</p>
      </div>

      <form onSubmit={formik.handleSubmit} className="w-full space-y-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            type="text"
            placeholder="Jhon Doe"
            {...formik.getFieldProps("firstName")}
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <div className="text-sm text-red-500">
              {formik.errors.firstName}
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input type="text" {...formik.getFieldProps("lastName")} />
          {formik.touched.lastName && formik.errors.lastName && (
            <div className="text-sm text-red-500">{formik.errors.lastName}</div>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input type="email" {...formik.getFieldProps("email")} />
          {formik.touched.email && formik.errors.email && (
            <div className="text-sm text-red-500">{formik.errors.email}</div>
          )}
        </div>

        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input type="tel" {...formik.getFieldProps("phone")} />
          {formik.touched.phone && formik.errors.phone && (
            <div className="text-sm text-red-500">{formik.errors.phone}</div>
          )}
        </div>

        <div>
          <Label htmlFor="role">Role</Label>
          <Select
            onValueChange={(value) => formik.setFieldValue("role", value)}
            {...formik.getFieldProps("role")}
          >
            <SelectTrigger className="w-full py-2.5">
              <SelectValue placeholder="Select a user role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ADMIN">Admin</SelectItem>
              <SelectItem value="MANAGER">Manager</SelectItem>
              <SelectItem value="STUFF">Stuff</SelectItem>
            </SelectContent>
          </Select>
          {formik.touched.role && formik.errors.role && (
            <div className="text-sm text-red-500">{formik.errors.role}</div>
          )}
        </div>

        <div>
          <Label htmlFor="address">Address</Label>
          <Textarea {...formik.getFieldProps("address")} />
          {formik.touched.address && formik.errors.address && (
            <div className="text-sm text-red-500">{formik.errors.address}</div>
          )}
        </div>

        <Button disabled={isLoading} type="submit" className="w-full">
          {isLoading ? <Spinner loadingText={loadingText} /> : buttonText}
        </Button>
      </form>
    </div>
  )
}
