import { cn } from "@/lib/utils";
import React from "react";

export type PaymentMethod = "CASH" | "CARD" | "ONLINE";

interface Props {
  className?: string;
  value: PaymentMethod;
  onChange: (value: PaymentMethod) => void;
}

const paymentMethods = [
  {
    name: "Cash",
    value: "CASH" as PaymentMethod,
    icon: (
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        width="97"
        height="97"
        viewBox="0 0 97 97"
        fill="none"
      >
        <g clipPath="url(#clip0_1_121)">
          <path
            d="M84.2303 16.044H12.0327C7.60229 16.044 4.01074 19.6355 4.01074 24.0659V72.1976C4.01074 76.628 7.60229 80.2196 12.0327 80.2196H84.2303C88.6607 80.2196 92.2522 76.628 92.2522 72.1976V24.0659C92.2522 19.6355 88.6607 16.044 84.2303 16.044Z"
            fill="#3877FF"
            stroke="#133E5E"
            strokeWidth="8.29192"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.01074 36.4075H92.2522"
            stroke="#133E5E"
            strokeWidth="11.1073"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="15.7354"
            y="48.1317"
            width="27.7683"
            height="12.9585"
            rx="3.70244"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_1_121">
            <rect width="96.2634" height="96.2634" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    name: "Card",
    value: "CARD" as PaymentMethod,
    icon: (
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        width="66"
        height="66"
        viewBox="0 0 66 66"
        fill="none"
      >
        <g clipPath="url(#clip0_1_115)">
          <path
            d="M53.0397 9.57558H8.0397C5.27828 9.57558 3.0397 12.1639 3.0397 15.3568V50.0443C3.0397 53.2372 5.27828 55.8256 8.0397 55.8256H53.0397C55.8011 55.8256 58.0397 53.2372 58.0397 50.0443V15.3568C58.0397 12.1639 55.8011 9.57558 53.0397 9.57558Z"
            fill="#3877FF"
            stroke="#133E5D"
            strokeWidth="5.3802"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="41.692"
            y="21.9779"
            width="21.4454"
            height="17.6954"
            rx="4.80464"
            fill="white"
            stroke="#133E5D"
            strokeWidth="4.80464"
          />
          <circle cx="49.9147" cy="30.8256" r="1.875" fill="#133E5D" />
        </g>
        <defs>
          <clipPath id="clip0_1_115">
            <rect
              width="65"
              height="65"
              fill="white"
              transform="translate(0.539673 0.825607)"
            />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    name: "Online",
    value: "ONLINE" as PaymentMethod,
    icon: (
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        width="75"
        height="95"
        viewBox="0 0 75 95"
        fill="none"
      >
        <path
          d="M49.8041 9.27448C50.0268 8.50679 51.0731 8.40539 51.4388 9.11627L70.4447 46.0635C70.6274 46.4192 70.5493 46.8534 70.2533 47.1221L29.931 83.713C29.7215 83.903 29.5455 83.9512 29.4085 83.959C29.2478 83.9681 29.0541 83.9238 28.8695 83.8087C28.6849 83.6934 28.5599 83.5391 28.4974 83.3907C28.4442 83.2642 28.4098 83.0845 28.4886 82.8126L49.8041 9.27448Z"
          fill="white"
          stroke="#133E5D"
          strokeWidth="5.3035"
        />
        <path
          d="M27.335 9.27441C27.5577 8.50673 28.604 8.40533 28.9697 9.11621L47.9756 46.0635C48.1584 46.4191 48.0802 46.8533 47.7842 47.1221L7.46192 83.7129C7.25246 83.903 7.07639 83.9511 6.93946 83.959C6.77875 83.9681 6.58497 83.9237 6.40039 83.8086C6.2158 83.6934 6.09078 83.539 6.02832 83.3906C5.97512 83.2642 5.94071 83.0845 6.01954 82.8125L27.335 9.27441Z"
          fill="#3877FF"
          stroke="#133E5D"
          strokeWidth="5.3035"
        />
      </svg>
    ),
  },
];

function PaymentMethodInput({ className, value, onChange }: Props) {
  const handleChange = (method: PaymentMethod) => {
    onChange(method);
  };

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {paymentMethods.map((method) => {
        const isActive = value === method.value;
        return (
          <button
            key={method.value}
            type="button"
            className={cn(
              "flex items-center gap-2 rounded-md p-2 py-3 text-sm font-medium text-gray-700 hover:bg-gray-200 disabled:opacity-50",
              isActive && "bg-gray-200 text-gray-900 cursor-not-allowed"
            )}
            onClick={() => handleChange(method.value)}
          >
            <span className="w-6">{method.icon}</span>
            {method.name}
          </button>
        );
      })}
    </div>
  );
}

export default PaymentMethodInput;
