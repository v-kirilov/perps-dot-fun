"use client";

interface ButtonType {
  type: string;
  className: string;
}

const ButtonTypes: ButtonType[] = [
  {
    type: "small",
    className:
      "text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-small rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:from-gray-600 disabled:to-gray-600 disabled:hover:bg-gray-600",
  },
  {
    type: "normal",
    className:
      "text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:from-gray-600 disabled:to-gray-600 disabled:hover:bg-gray-600",
  },
  {
    type: "big",
    className:
      "text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-big rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:from-gray-600 disabled:to-gray-600 disabled:hover:bg-gray-600",
  },
  {
    type: "buy",
    className:
      "text-white bg-gradient-to-br from-green-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-2 my-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:from-gray-600 disabled:to-gray-600 disabled:hover:bg-gray-600 w-full",
  },
   {
    type: "sell",
    className:
      "text-white bg-gradient-to-br from-red-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-2 my-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:from-gray-600 disabled:to-gray-600 disabled:hover:bg-gray-600 w-full",
  },
];

export default function Button({
  onClick,
  type,
  disabled,
  children,
  className = "",
}: {
  onClick: () => void;
  disabled?: boolean;
  type: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${ButtonTypes.find((btn) => btn.type === type)?.className} ${className}`}
    >
      {children}
    </button>
  );
}
