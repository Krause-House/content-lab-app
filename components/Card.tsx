import React from "react";

export default function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`card rounded-xl overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
