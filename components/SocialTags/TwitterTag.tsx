import Link from "next/link";
import React from "react";
import { Twitter } from "react-feather";

export default function TwitterTag({ handle }: { handle: string }) {
  return (
    <Link
      className="flex items-center mt-0 text-sm text-gray-500"
      href={`https://twitter.com/${handle}`}
      target="_blank"
    >
      <Twitter className="h-4" />
      <p>{handle}</p>
    </Link>
  );
}
