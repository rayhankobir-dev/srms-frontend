"use client"

import Spinner from "@/components/shared/Spinner"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { useFormik } from "formik"
import * as Yup from "yup"

export interface StoreFormValues {
  itemName: string
  storeIn: number
  storeOut: number
  previous: number
  current: number
}

interface Props {
  initialValues: StoreFormValues
  onSubmit: (values: StoreFormValues, helpers: any) => void
  title?: string
  description?: string
  buttonText?: string
  isLoading?: boolean
  loadingText?: string
}

const validationSchema = Yup.object({
  itemName: Yup.string().required("Item name is required"),
  storeIn: Yup.number().required("Quantity is required").min(0),
  storeOut: Yup.number().required("Received is required").min(0),
  previous: Yup.number().required("Remaining is required").min(0),
  current: Yup.number().required("Current is required").min(0),
})

export default function StoreForm({
  initialValues,
  onSubmit,
  title = "Restaurant Item",
  description = "Add or update a restaurant item",
  buttonText = "Submit",
  isLoading = false,
  loadingText = "Creating",
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
          <Label htmlFor="itemName">Item Name</Label>
          <Input type="text" {...formik.getFieldProps("itemName")} />
          {formik.touched.itemName && formik.errors.itemName && (
            <div className="text-sm text-red-500">{formik.errors.itemName}</div>
          )}
        </div>

        <div>
          <Label htmlFor="storeIn">Store In</Label>
          <Input type="number" {...formik.getFieldProps("storeIn")} />
          {formik.touched.storeIn && formik.errors.storeIn && (
            <div className="text-sm text-red-500">{formik.errors.storeIn}</div>
          )}
        </div>

        <div>
          <Label htmlFor="storeOut">Store Out</Label>
          <Input type="number" {...formik.getFieldProps("storeOut")} />
          {formik.touched.storeOut && formik.errors.storeOut && (
            <div className="text-sm text-red-500">{formik.errors.storeOut}</div>
          )}
        </div>

        <div>
          <Label htmlFor="previous">Remain</Label>
          <Input type="number" {...formik.getFieldProps("previous")} />
          {formik.touched.previous && formik.errors.previous && (
            <div className="text-sm text-red-500">{formik.errors.previous}</div>
          )}
        </div>

        <div>
          <Label htmlFor="current">Current</Label>
          <Input type="number" {...formik.getFieldProps("current")} />
          {formik.touched.current && formik.errors.current && (
            <div className="text-sm text-red-500">{formik.errors.current}</div>
          )}
        </div>

        <Button disabled={isLoading} type="submit" className="w-full">
          {isLoading ? <Spinner loadingText={loadingText} /> : buttonText}
        </Button>
      </form>
    </div>
  )
}
