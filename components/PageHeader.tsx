import React from "react";
import { TvIcon, ShareIcon } from "@heroicons/react/20/solid";

export default function PageHeader() {
  return (
    <div className="sm:flex sm:items-start sm:justify-between my-10">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Krause House Gameday: Bucks vs Cavs
        </h2>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
      <div className="mt-3 flex sm:mt-0 sm:ml-4">
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:ring-offset-2"
        >
          <ShareIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
          Share
        </button>
        <button
          type="button"
          className="ml-3 inline-flex items-center rounded-md border border-transparent bg-primary-200 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:ring-offset-2"
        >
          <TvIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
          Watch Now
        </button>
      </div>
    </div>
  );
}
