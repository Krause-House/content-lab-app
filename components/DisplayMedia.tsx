import React from "react";
import Image from "next/image";
import AudioPlayer from "~/components/AudioPlayer";

export default function DisplayMedia({
  mediaUrl,
  alt,
  imageOnly,
}: {
  mediaUrl: string;
  alt?: string;
  imageOnly?: boolean;
}) {
  if (mediaUrl.toLowerCase().slice(-3) === "mp4") {
    if (imageOnly) return <div></div>;
    return (
      <video className="object-cover min-w-full min-h-full" controls>
        <source src={mediaUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  } else if (mediaUrl.toLowerCase().slice(-3) === "mov") {
    if (imageOnly) return <div></div>;
    return (
      <video className="object-cover min-w-full min-h-full" controls>
        <source src={mediaUrl} />
        Your browser does not support the video tag.
      </video>
    );
  } else if (mediaUrl.toLowerCase().slice(-3) === "mp3") {
    if (imageOnly) return <div></div>;
    return <AudioPlayer url={mediaUrl} />;
  } else {
    return (
      <Image
        fill
        sizes="100%"
        className="object-cover min-w-full min-h-full"
        src={mediaUrl}
        alt={alt ?? ""}
      />
    );
  }
  return <div></div>;
}
