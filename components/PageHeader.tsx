import React from "react";
import { ShareIcon } from "@heroicons/react/20/solid";
import { SecondaryButton } from "~/components/Buttons";
import { PencilIcon } from "@heroicons/react/24/outline";

export default function PageHeader({
  title,
  description,
  editLink,
  shareLink,
  primaryButton,
}: {
  title: string;
  description?: string;
  editLink?: string;
  shareLink?: string;
  primaryButton?: React.ReactNode;
}) {
  return (
    <div className="my-4 md:my-10 md:flex md:items-start md:justify-between">
      <div className="flex-1 min-w-0">
        <h1 className="flex items-center gap-2 text-primary sm:truncate">
          {title}
          {editLink && (
            <a href={editLink}>
              <PencilIcon className="w-4 h-4 text-gray-500 cursor-pointer hover:scale-110" />
            </a>
          )}
        </h1>
        {description && (
          <p className="max-w-4xl mt-2 text-gray-500">{description}</p>
        )}
      </div>
      <div className="flex gap-3 mt-3 md:mt-0 md:ml-4">
        {shareLink && (
          <a href={shareLink} target="_blank" rel="noreferrer noopener">
            <SecondaryButton>
              <ShareIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
              Share
            </SecondaryButton>
          </a>
        )}
        {primaryButton}
      </div>
    </div>
  );
}
