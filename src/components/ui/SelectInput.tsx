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
import Spinner from "../shared/Spinner";
import { cx, hasErrorInput } from "@/lib/utils";

interface Option<T = unknown> {
  value: T;
  label: string | React.ReactNode;
}

interface SelectInputProps<T = unknown> {
  value: T | undefined;
  onChange: (value: T | undefined) => void;
  options: Option<T>[];
  placeholder?: string;
  isLoading?: boolean;
  loadingText?: string;
  hasError?: boolean;
  disabled?: boolean;
  getOptionValue?: (value: T) => string;
  filterOption?: (option: Option<T>, inputValue: string) => boolean;
}

export const SelectInput = <T,>({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  isLoading = false,
  loadingText = "Loading...",
  hasError = false,
  disabled,
  getOptionValue = (val) => JSON.stringify(val),
  filterOption = (option, inputValue) =>
    option.label
      ? option.label.toString().toLowerCase().includes(inputValue.toLowerCase())
      : false,
}: SelectInputProps<T>) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const serializedValue =
    value !== undefined ? getOptionValue(value) : undefined;

  const filteredOptions = options.filter((opt) =>
    filterOption(opt, inputValue)
  );

  const handleSelectItem = (val: string) => {
    const selected = options.find((opt) => getOptionValue(opt.value) === val);
    if (selected) {
      onChange(selected.value);
      // setIsOpen(false);
    }
  };

  return (
    <Select
      disabled={disabled}
      value={serializedValue}
      onValueChange={handleSelectItem}
      onOpenChange={setIsOpen}
    >
      <SelectTrigger
        className={cx(
          "w-full min-h-11 flex items-center justify-between px-3",
          hasError && hasErrorInput
        )}
      >
        <SelectValue placeholder={isLoading ? <Spinner /> : placeholder}>
          {!isLoading && !value && (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          {value && !options.find((opt) => getOptionValue(opt.value)) && (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          {
            options.find((opt) => getOptionValue(opt.value) === serializedValue)
              ?.label
          }
        </SelectValue>
      </SelectTrigger>

      {isOpen && (
        <SelectContent>
          <SelectGroup>
            <input
              type="text"
              className="w-full border-b px-3 py-2 focus:outline-none"
              placeholder="Type to filter..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </SelectGroup>
          <SelectGroup className="pt-2">
            {isLoading ? (
              <SelectItem value="disabled" disabled>
                {loadingText}
              </SelectItem>
            ) : filteredOptions.length === 0 ? (
              <SelectItem value="disabled" disabled>
                No options found
              </SelectItem>
            ) : (
              filteredOptions.map((option) => (
                <SelectItem
                  key={getOptionValue(option.value)}
                  value={getOptionValue(option.value)}
                  className="cursor-pointer select-none"
                >
                  {option.label}
                </SelectItem>
              ))
            )}
          </SelectGroup>
        </SelectContent>
      )}
    </Select>
  );
};
