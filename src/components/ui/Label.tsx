// Tremor Label [v0.0.2]

import * as LabelPrimitives from "@radix-ui/react-label";
import React from "react";

import { cx } from "@/lib/utils";

interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitives.Root> {
  disabled?: boolean;
  required?: boolean;
  showRequiredHint?: boolean;
}

const Label = React.forwardRef<
  React.ComponentRef<typeof LabelPrimitives.Root>,
  LabelProps
>(
  (
    { className, disabled, required, showRequiredHint = true, ...props },
    forwardedRef
  ) => (
    <LabelPrimitives.Root
      ref={forwardedRef}
      className={cx(
        // base
        "inline-flex gap-1 text-sm leading-none font-medium",
        // text color
        "text-gray-900 dark:text-gray-50",
        // disabled
        {
          "text-gray-400 dark:text-gray-600": disabled,
        },
        className
      )}
      aria-disabled={disabled}
      tremor-id="tremor-raw"
      {...props}
    >
      {props.children}
      {required && <span className="text-red-500">*</span>}
      {!required && showRequiredHint && (
        <span className="text-gray-400">(Optional)</span>
      )}
    </LabelPrimitives.Root>
  )
);

Label.displayName = "Label";

export { Label };
