"use client";

import { useState, useRef, useEffect } from "react";

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
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleOptionClick = (option: T) => {
    onOptionChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2  disabled:bg-gray-500 disabled:cursor-not-allowed disabled:hover:bg-gray-500"
      >
        {selectedOption}
        <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-1 min-w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 font-medium rounded-lg text-sm px-2 py-2.5 shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleOptionClick(option)}
              className={`block w-full px-4 py-2 text-left hover:bg-gray-700 text-white rounded ${
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
