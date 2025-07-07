import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/AlertDialog";
import { X } from "lucide-react";
import { ReactNode } from "react";

type FormDialogProps = {
  className?: string;
  children: ReactNode;
  title?: string;
  form: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function FormDialog({
  className,
  children,
  form,
  open,
  onOpenChange,
}: FormDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className={className}>
        <AlertDialogTitle className="hidden" />
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100"
        >
          <X size={18} />
        </button>
        {form}
      </AlertDialogContent>
    </AlertDialog>
  );
}
