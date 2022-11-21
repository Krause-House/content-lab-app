"use client";
import React from "react";

export default function BaseButton({
  children,
  className,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center px-4 py-2 text-sm rounded-lg focus:outline-none ${className} ${
        disabled && "opacity-50 shadow-none"
      }`}
    >
      {children}
    </button>
  );
}
