"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface QuantitySelectorProps {
  quantity: number;
  onChange: (value: number) => void;
  max?: number;
}

export default function QuantitySelector({
  quantity,
  onChange,
  max = 10,
}: QuantitySelectorProps) {
  return (
    <div className="relative w-20">
      <select
        value={quantity}
        onChange={(e) => onChange(Number(e.target.value))}
        className="block w-full appearance-none rounded-md border border-gray-200 bg-white px-2.5 py-2 pr-8 text-sm text-gray-900 focus:border-gray-300 focus:outline-none focus:ring-0"
      >
        {Array.from({ length: max }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <ChevronDownIcon
        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500"
        aria-hidden="true"
      />
    </div>
  );
}
