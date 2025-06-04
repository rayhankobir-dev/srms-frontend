import Spinner from "@/components/shared/Spinner"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { useFormik } from "formik"
import * as yup from "yup"

const validationSchema = yup.object().shape({
  itemName: yup.string().required("Item Name is required"),
  newStock: yup
    .number()
    .typeError("New Stock must be a number")
    .required("New Stock is required"),
  cooked: yup
    .number()
    .typeError("Cooked must be a number")
    .required("Cooked is required"),
  sales: yup
    .number()
    .typeError("Sales must be a number")
    .required("Sales is required"),
  inStock: yup
    .number()
    .typeError("In Stock must be a number")
    .required("In Stock is required"),
})

export type RestaurantFormValues = {
  itemName: string
  newStock: number
  cooked: number
  sales: number
  inStock: number
}

type Props = {
  initialValues: RestaurantFormValues
  onSubmit: (values: RestaurantFormValues, { resetForm }: any) => void
  title?: string
  description?: string
  buttonText?: string
  isLoading?: boolean
  loadingText?: string
}

export default function RestaurantForm({
  initialValues,
  onSubmit,
  title = "Restaurant Item",
  description = "Add or update a restaurant item",
  buttonText = "Submit",
  isLoading = false,
  loadingText = "",
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
          <Input
            type="text"
            placeholder="Chicken Curry"
            {...formik.getFieldProps("itemName")}
          />
          {formik.touched.itemName && formik.errors.itemName && (
            <div className="text-sm text-red-500">{formik.errors.itemName}</div>
          )}
        </div>

        <div>
          <Label htmlFor="newStock">New Stock</Label>
          <Input type="number" {...formik.getFieldProps("newStock")} />
          {formik.touched.newStock && formik.errors.newStock && (
            <div className="text-sm text-red-500">{formik.errors.newStock}</div>
          )}
        </div>

        <div>
          <Label htmlFor="cooked">Cooked</Label>
          <Input type="number" {...formik.getFieldProps("cooked")} />
          {formik.touched.cooked && formik.errors.cooked && (
            <div className="text-sm text-red-500">{formik.errors.cooked}</div>
          )}
        </div>

        <div>
          <Label htmlFor="sales">Sales</Label>
          <Input type="number" {...formik.getFieldProps("sales")} />
          {formik.touched.sales && formik.errors.sales && (
            <div className="text-sm text-red-500">{formik.errors.sales}</div>
          )}
        </div>

        <div>
          <Label htmlFor="inStock">In Stock</Label>
          <Input type="number" {...formik.getFieldProps("inStock")} />
          {formik.touched.inStock && formik.errors.inStock && (
            <div className="text-sm text-red-500">{formik.errors.inStock}</div>
          )}
        </div>

        <Button disabled={isLoading} type="submit" className="w-full">
          {isLoading ? <Spinner loadingText={loadingText} /> : buttonText}
        </Button>
      </form>
    </div>
  )
}
