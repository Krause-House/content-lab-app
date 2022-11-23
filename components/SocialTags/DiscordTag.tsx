import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function DisordTag({ handle }: { handle: string }) {
  return (
    <Link
      className="flex items-center justify-center gap-1 py-1 text-sm text-gray-500"
      href={`https://twitter.com/${handle}`}
      target="_blank"
    >
      <Image src="/assets/discord.png" alt="Discord" width={16} height={16} />
      <p>{handle}</p>
    </Link>
  );
}
