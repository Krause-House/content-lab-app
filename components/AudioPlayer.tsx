import { PauseCircleIcon, PlayCircleIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

export default function AudioPlayer({ url }: { url: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const play = () => {
    var audio = document.getElementById("audio") as any;
    audio?.play();
    setIsPlaying(true);
  };

  const pause = () => {
    var audio = document.getElementById("audio") as any;
    audio?.pause();
    setIsPlaying(false);
  };

  return (
    <div>
      <div
        onClick={() => (isPlaying ? pause() : play())}
        className="cursor-pointer"
      >
        {isPlaying ? (
          <PauseCircleIcon className="w-24" />
        ) : (
          <PlayCircleIcon className="w-24" />
        )}
      </div>
      <audio id="audio" src={url} />
    </div>
  );
}
