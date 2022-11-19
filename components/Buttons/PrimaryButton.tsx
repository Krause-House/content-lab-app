"use client";
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
      className={`${className} font-medium text-white bg-primary-200 hover:bg-primary-300 `}
      onClick={onClick}
    >
      {children}
    </BaseButton>
  );
}
