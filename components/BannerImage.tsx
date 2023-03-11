import Image from "next/image";
import React from "react";

export default function BannerImage({
  imageUrl,
  isLive,
}: {
  imageUrl: string;
  isLive?: boolean;
}) {
  return (
    <div className="relative h-[100px] sm:h-[150px] lg:h-[250px] overflow-hidden w-full">
      <Image
        priority
        fill
        className="absolute block object-cover w-full h-full"
        src={imageUrl}
        alt=""
      />
      {isLive && (
        <a
          href="https://playback.tv/krausehouse"
          rel="noopener noreferrer"
          target="_blank"
        >
          <button className="absolute top-2 left-2 inline-flex items-center rounded-md bg-red-600 px-2.5 py-0.5 text-sm font-medium text-black">
            <svg
              className="-ml-0.5 mr-1.5 h-2 w-2"
              fill="currentColor"
              viewBox="0 0 8 8"
            >
              <circle cx={4} cy={4} r={3} />
            </svg>
            Live Now
          </button>
        </a>
      )}
    </div>
  );
}
