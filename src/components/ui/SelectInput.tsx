"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./Select";
import { Label } from "./Label";
import Spinner from "../shared/Spinner";
import { cx, hasErrorInput } from "@/lib/utils";

interface Option {
  value: string;
  label: string | React.ReactNode;
}

interface SelectInputProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  isLoading?: boolean;
  loadingText?: string;
  hasError?: boolean;
  label?: string;
  disabled?: boolean;
}

export const SelectInput: React.FC<SelectInputProps> = ({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  isLoading = false,
  loadingText = "Loading..",
  hasError = false,
  label,
  disabled,
}) => {
  return (
    <div className="w-full">
      {label && <Label className="mb-1 block text-sm">{label}</Label>}
      <Select disabled={disabled} value={value} onValueChange={onChange}>
        <SelectTrigger
          className={cx("w-full min-h-11", hasError && hasErrorInput)}
        >
          <SelectValue placeholder={isLoading ? <Spinner /> : placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {isLoading ? (
              <SelectItem value="disabled" disabled>
                {loadingText}
              </SelectItem>
            ) : options.length === 0 ? (
              <SelectItem value="disabled" disabled>
                No options available
              </SelectItem>
            ) : (
              options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
