import React from "react";
import BaseButton from "./BaseButton";

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
    <BaseButton
      className={`text-white bg-primary-200 hover:bg-primary-300 ${className}`}
      onClick={onClick}
    >
      {children}
    </BaseButton>
  );
}
