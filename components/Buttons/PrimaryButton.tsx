"use client";
import React from "react";
import BaseButton from "./BaseButton";

export default function PrimaryButton({
  children,
  className,
  onClick,
  disabled,
  isLoading,
  loadingText,
  type,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  type?: "button" | "submit" | "reset" | undefined;
}) {
  return (
    <BaseButton
      type={type}
      className={`font-medium text-white bg-primary-200 hover:bg-primary-300  ${className}`}
      disabled={disabled || isLoading}
      onClick={() => !isLoading && !disabled && onClick && onClick()}
    >
      <>
        {isLoading ? (
          <div className="flex items-center justify-center w-full">
            <div
              className={`${
                loadingText && "-ml-0.5 mr-2"
              } w-4 h-4 ease-linear border-[3px] border-t- border-transparent rounded-full loader`}
            ></div>
            {loadingText}
          </div>
        ) : (
          children
        )}
      </>
    </BaseButton>
  );
}
