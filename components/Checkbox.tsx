import React from "react";

export default function Checkbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      checked={checked}
      onChange={onChange}
      type="checkbox"
      className="w-6 h-6 rounded-md input-border bg-tan focus:ring-0"
    />
  );
}
