import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { Twitter } from "react-feather";
import Image from "next/image";

type HostData = {
  id: number;
  name: string;
  handle: string;
  avatarUrl: string;
  score: number;
  userScore: number;
};

export default function HostListItem({ host }: { host: HostData }) {
  return (
    <a href="#" className="block ">
      <div className="flex items-center px-4 py-4 sm:px-6">
        <div className="flex items-center justify-start flex-1 min-w-0 gap-3">
          <Image
            width={48}
            height={48}
            key={host.id}
            className="inline-block w-12 h-12 rounded-full ring-2 ring-gray-50"
            src={host.avatarUrl}
            alt={host.name}
          />
          <div className="">
            <h4 className="text-base font-medium text-gray-800 truncate">
              {host.name}
            </h4>
            <a
              className="flex items-center mt-0 text-sm text-gray-500"
              href={`https://twitter.com/${host.handle}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="h-4" />
              {host.handle}
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center flex-shrink-0 mx-2 text-sm font-medium text-gray-400">
          <ChevronUpIcon
            className={`w-5 h-5 hover:text-gray-600 ${
              host.userScore > 0 && "text-gray-600"
            }`}
          />
          <p className="text-gray-600">{host.score}</p>
          <ChevronDownIcon
            className={`w-5 h-5 hover:text-gray-600 ${
              host.userScore < 0 && "text-gray-600"
            }`}
          />
        </div>
      </div>
    </a>
  );
}
