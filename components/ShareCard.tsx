import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Card from "~/components/Card";

export default function ShareCard({
  shareLink,
  description,
}: {
  shareLink: string;
  description: string;
}) {
  return (
    <Card className="my-4 transition cursor-pointer bg-primary-200 card-shadow-hover">
      <a
        href={shareLink}
        target="_blank"
        rel="noreferrer noopener"
        className="block"
      >
        <div className="flex items-center gap-8 px-4 py-4 sm:px-6">
          <div className="flex-1 min-w-0 sm:flex sm:items-center sm:justify-between">
            <div>
              <label className="flex text-xs text-gray-300 accent">
                Earn Votes
              </label>

              <h3 className="text-gray-50">Get more votes by sharing</h3>

              <div className="mt-3 text-sm text-gray-300">{description}</div>
            </div>
          </div>
          <div className="flex items-center flex-shrink-0 gap-1 ml-5 font-medium text-gray-50">
            <p className="hidden sm:block">Share now</p>
            <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
          </div>
        </div>
      </a>
    </Card>
  );
}
