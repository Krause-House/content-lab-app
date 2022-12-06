import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import HostData from "~/types/HostData";
import DiscordTag from "~/components/SocialTags/DiscordTag";
import setVote, { VOTE } from "~/lib/setVote";
import { useRouter } from "next/navigation";

export default function HostListItem({
  host,
  userId,
  vote,
}: {
  host: HostData;
  userId: string | null;
  vote: (vote: VOTE) => void;
}) {
  return (
    <div className="block">
      <div className="flex items-center px-4 py-4 sm:px-6">
        <div className="flex items-center justify-start flex-1 min-w-0 gap-3">
          <Image
            width={48}
            height={48}
            key={host.id}
            className="inline-block w-12 h-12 rounded-full ring-2 ring-tan-400"
            src={host.avatarUrl}
            alt={host.displayName}
          />
          <div className="">
            <h4 className="text-gray-800 truncate">{host.displayName}</h4>
            <DiscordTag handle={host.discordName} />
          </div>
        </div>
        <div className="flex flex-col items-center flex-shrink-0 mx-2 text-sm font-medium text-gray-400">
          {userId && (
            <ChevronUpIcon
              onClick={() => !host.for.includes(userId) && vote(VOTE.FOR)}
              className={`w-5 h-5 hover:text-gray-600 ${
                !host.for.includes(userId) ? "cursor-pointer" : "text-gray-600"
              }`}
            />
          )}
          <p className="text-gray-600">
            {host.for.length - host.against.length}
          </p>
          {userId && (
            <ChevronDownIcon
              onClick={() =>
                !host.against.includes(userId) && vote(VOTE.AGAINST)
              }
              className={`w-5 h-5 hover:text-gray-600 ${
                !host.against.includes(userId)
                  ? "cursor-pointer"
                  : "text-gray-600"
              }`}
            />
          )}
        </div>
      </div>
    </div>
  );
}
