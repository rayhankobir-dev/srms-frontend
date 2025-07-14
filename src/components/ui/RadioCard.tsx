"use client";

import React from "react";
import {
  RadioCardGroup,
  RadioCardIndicator,
  RadioCardItem,
} from "@/components/RadioCardGroup";

type RadioCardOption = {
  value: string;
  title: string;
  description: string;
};

type RadioCardsProps = {
  options: RadioCardOption[];
  defaultValue?: string;
  onChange?: (value: string) => void;
};

export const RadioCards: React.FC<RadioCardsProps> = ({
  options,
  defaultValue,
  onChange,
}) => {
  return (
    <div className="mx-auto max-w-xs">
      <RadioCardGroup defaultValue={defaultValue} onValueChange={onChange}>
        {options.map((option) => (
          <RadioCardItem key={option.value} value={option.value}>
            <div className="flex items-start gap-3">
              <RadioCardIndicator className="mt-1" />
              <div>
                <span className="sm:text-sm">{option.title}</span>
                <p className="mt-1 text-xs text-gray-500">
                  {option.description}
                </p>
              </div>
            </div>
          </RadioCardItem>
        ))}
      </RadioCardGroup>
    </div>
  );
};
