import React from "react";
import { TvIcon, ShareIcon } from "@heroicons/react/20/solid";
import { PrimaryButton, SecondaryButton } from "~/components/Buttons";

export default function PageHeader() {
  return (
    <div className="my-10 md:flex md:items-start md:justify-between">
      <div className="flex-1 min-w-0">
        <h1 className="text-primary sm:truncate">Krause House Gameday</h1>
        <p className="max-w-4xl mt-2 text-sm text-gray-500">
          Welcome to a better way to watch your favorite NBA teams. We&apos;ve
          partnered with Playback to provide you with live streamed NBA action,
          great commentary from hosts picked by you, and a rowdy community of
          hoops fanatics.
        </p>
      </div>
      <div className="flex gap-3 mt-3 md:mt-0 md:ml-4">
        <a
          href="http://twitter.com/intent/tweet?text=Come%20watch%the%20NBA%20live%20on%20Krause%20House%20Gameday&url=https%3A%2F%2Fplayback.tv/krausehouse%2F"
          target="_blank"
          rel="noreferrer noopener"
        >
          <SecondaryButton>
            <ShareIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            Share
          </SecondaryButton>
        </a>
        <a
          href="https://playback.tv/krausehouse"
          rel="noopener noreferrer"
          target="_blank"
        >
          <PrimaryButton>
            <TvIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            Watch
          </PrimaryButton>
        </a>
      </div>
    </div>
  );
}
