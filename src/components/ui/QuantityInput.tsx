import { cn } from "@/lib/utils";
import React from "react";

interface QuantityInputProps {
  className?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}

const QuantityInput: React.FC<QuantityInputProps> = ({
  className = "",
  value,
  onChange,
  min = 1,
  max = 100,
  disabled = false,
}) => {
  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val)) {
      const clamped = Math.max(min, Math.min(max, val));
      onChange(clamped);
    } else if (e.target.value === "") {
      onChange(0);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center border rounded-md w-max overflow-hidden",
        className
      )}
    >
      <button
        type="button"
        onClick={handleDecrease}
        className="px-3 py-1 rounded-r-none text-lg font-bold text-gray-700 hover:bg-gray-200 disabled:opacity-50"
        disabled={disabled || value <= min}
      >
        −
      </button>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        disabled={disabled}
        onChange={handleChange}
        className="w-14 text-center outline-none border-x px-1.5 py-1"
      />
      <button
        type="button"
        onClick={handleIncrease}
        className="px-3 py-1 rounded-l-none text-lg font-bold text-gray-700 hover:bg-gray-200 disabled:opacity-50"
        disabled={disabled || value >= max}
      >
        +
      </button>
    </div>
  );
};

export default QuantityInput;
