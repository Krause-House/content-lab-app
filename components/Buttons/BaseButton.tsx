import React from "react";

export default function PrimaryButton({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      className={`inline-flex items-center px-4 py-2 text-sm rounded-lg focus:outline-none ${className}`}
    >
      {children}
    </button>
  );
}
