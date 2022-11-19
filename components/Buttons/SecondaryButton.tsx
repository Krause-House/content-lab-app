import React from "react";
import BaseButton from "./BaseButton";

export default function SecondaryButton({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <BaseButton
      className={`text-gray-800 bg-tan-400 hover:bg-tan-500 ${className}`}
      onClick={onClick}
    >
      {children}
    </BaseButton>
  );
}
