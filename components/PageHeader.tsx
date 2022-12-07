import React from "react";
import { ShareIcon } from "@heroicons/react/20/solid";
import { SecondaryButton } from "~/components/Buttons";

export default function PageHeader({
  title,
  description,
  shareLink,
}: {
  title: string;
  description: string;
  shareLink?: string;
}) {
  return (
    <div className="px-0 my-4 md:px-4 md:my-10 md:flex md:items-start md:justify-between">
      <div className="flex-1 min-w-0">
        <h1 className="text-primary sm:truncate">{title}</h1>
        <p className="max-w-4xl mt-2 text-gray-500">{description}</p>
      </div>
      {shareLink && (
        <div className="flex gap-3 mt-3 md:mt-0 md:ml-4">
          <a href={shareLink} target="_blank" rel="noreferrer noopener">
            <SecondaryButton>
              <ShareIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
              Share
            </SecondaryButton>
          </a>
        </div>
      )}
    </div>
  );
}
