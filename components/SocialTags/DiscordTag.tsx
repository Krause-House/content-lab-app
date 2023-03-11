import Image from "next/image";
import React from "react";

export default function DisordTag({ handle }: { handle: string }) {
  return (
    <div className="flex items-center justify-center gap-1 py-1 text-sm text-gray-300">
      <Image src="/assets/discord.png" alt="Discord" width={16} height={16} />
      <p>{handle}</p>
    </div>
  );
}
