import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/AlertDialog"
import { Button, ButtonProps } from "@/components/ui/Button"
import { ReactNode, useState } from "react"
import Spinner from "./Spinner"
import { Trash2 } from "lucide-react"

interface ConfirmationProps {
  children: ReactNode
  title?: string
  description?: string
  confirmText?: string | ReactNode,
  confirmBtnVariant?: ButtonProps["variant"]
  onConfirm?: () => void
  onCancel?: () => void
  isLoading?: boolean
}

export default function DeleteConfirmation({
  children,
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
  confirmText = <>
    <Trash2 size={14}/>
    Delete
  </>,
  confirmBtnVariant = "destructive",
  onConfirm,
  onCancel,
  isLoading = false,
}: ConfirmationProps) {
  const [open, setOpen] = useState(false)

  const handleConfirm = async () => {
    if (onConfirm) {
      await onConfirm()
      setOpen(false)
    }
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isLoading}
            onClick={() => {
              onCancel?.()
              setOpen(false)
            }}
          >
            Cancel
          </AlertDialogCancel>
          <Button
            disabled={isLoading}
            variant={confirmBtnVariant}
            onClick={handleConfirm}
          >
            {isLoading ? <Spinner loadingText="Deleting" /> : confirmText}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
