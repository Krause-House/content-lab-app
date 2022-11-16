import Image from "next/image";
import React from "react";

export default function BannerImage({ isLive }: { isLive?: boolean }) {
  return (
    <div className="relative">
      <Image
        width={1512}
        height={200}
        className="w-full block"
        src="/assets/banner.png"
        alt="Krause House"
      />
      {isLive && (
        <span className="absolute top-2 right-2 inline-flex items-center rounded-md bg-red-600 px-2.5 py-0.5 text-sm font-medium text-white">
          <svg
            className="-ml-0.5 mr-1.5 h-2 w-2"
            fill="currentColor"
            viewBox="0 0 8 8"
          >
            <circle cx={4} cy={4} r={3} />
          </svg>
          Live Now
        </span>
      )}
    </div>
  );
}
