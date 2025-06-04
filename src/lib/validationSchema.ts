import * as yup from "yup"

export const userSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  role: yup.string().required("Role is required"),
})

export type UserSchema = yup.InferType<typeof userSchema>
