import React from "react";

export default function Input({
  id,
  type,
  value,
  onChange,
  className,
  placeholder,
}: {
  id?: string;
  type: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
}) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      className={`block w-full text-base font-light text-gray-800 placeholder-gray-400 border rounded-lg appearance-none input-border bg-tan ${className}`}
      placeholder={placeholder}
    />
  );
}
