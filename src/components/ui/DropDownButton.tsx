"use client";

import { useState } from "react";

interface DropDownButtonProps<T extends string> {
  options: readonly T[];
  selectedOption: T;
  onOptionChange: (option: T) => void;
}

export default function DropDownButton<T extends string>({
  options,
  selectedOption,
  onOptionChange,
}: DropDownButtonProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: T) => {
    onOptionChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center gap-2"
      >
        {selectedOption}
        <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="absolute mt-1 bg-gray-800 border border-gray-700 rounded shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleOptionClick(option)}
              className={`block w-full px-4 py-2 text-left hover:bg-gray-700 text-white ${
                selectedOption === option ? "bg-blue-600" : ""
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
