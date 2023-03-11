import React from "react";

export default function ActionBanner({ text }: { text: string }) {
  return (
    <div className="w-full px-4 py-2 text-sm text-center text-black accent bg-[#e8c56d]">
      {text}
    </div>
  );
}
