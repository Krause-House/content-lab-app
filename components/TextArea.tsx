import React from "react";

export default function TextArea({
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
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  placeholder?: string;
}) {
  return (
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      className={`block w-full text-base font-light text-gray-100 placeholder-gray-200 border rounded-lg appearance-none input-border bg-tan ${className}`}
      placeholder={placeholder}
    />
  );
}
