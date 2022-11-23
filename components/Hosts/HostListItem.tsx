import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import TwitterTag from "~/components/TwitterTag";
import HostData from "~/types/HostData";

export default function HostListItem({ host }: { host: HostData }) {
  return (
    <div className="block">
      <div className="flex items-center px-4 py-4 sm:px-6">
        <div className="flex items-center justify-start flex-1 min-w-0 gap-3">
          <Image
            width={48}
            height={48}
            key={host.id}
            className="inline-block w-12 h-12 rounded-full ring-2 ring-gray-50"
            src={host.avatarUrl}
            alt={host.displayName}
          />
          <div className="">
            <h4 className="text-gray-800 truncate">{host.displayName}</h4>
            <TwitterTag handle={host.handle} />
          </div>
        </div>
        <div className="flex flex-col items-center flex-shrink-0 mx-2 text-sm font-medium text-gray-400">
          {/* <ChevronUpIcon
            className={`w-5 h-5 hover:text-gray-600 ${
              host.score > 0 ? "cursor-pointer" : "text-gray-600"
            }`}
          /> */}
          {/* <p className="text-gray-600">{host.score ?? 0}</p> */}
          {/* <ChevronDownIcon
            className={`w-5 h-5 hover:text-gray-600 ${
              host.score < 0 ? "cursor-pointer" : "text-gray-600"
            }`}
          /> */}
        </div>
      </div>
    </div>
  );
}
