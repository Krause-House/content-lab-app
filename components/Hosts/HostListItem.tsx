import { useCallback, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import HostData from "~/types/HostData";
import DiscordTag from "~/components/SocialTags/DiscordTag";
import setVote, { VOTE } from "~/lib/setVote";
import { useRouter } from "next/navigation";

const act = async (
  host: HostData,
  userId: string,
  vote: VOTE,
  refresh: () => void
) => {
  const { data, error } = await setVote(host, userId, vote);
  refresh();
  return { data };
};

export default function HostListItem({
  host,
  userId,
}: {
  host: HostData;
  userId: string | null;
}) {
  const [localHostData, setLocalHostData] = useState(host);
  const [isWaiting, setIsWaiting] = useState(false);

  const vote = useCallback(
    async (vote: VOTE) => {
      setIsWaiting(true);
      try {
        if (userId) {
          if (vote === VOTE.FOR && host.for.includes(userId)) {
            throw new Error("User has already voted for this host");
          }
          if (vote === VOTE.AGAINST && host.against.includes(userId)) {
            throw new Error("User has already voted against this host");
          }
          const { data } = await act(host, userId, vote, router.refresh);
          setLocalHostData(data);
        } else throw new Error("User is not logged in");
      } catch (e) {
        console.log(e);
      } finally {
        setIsWaiting(false);
      }
    },
    [host, userId]
  );

  const router = useRouter();
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
            <DiscordTag handle={host.discordName} />
          </div>
        </div>
        <div className="flex flex-col items-center flex-shrink-0 mx-2 text-sm font-medium text-gray-400">
          {isWaiting ? (
            "Loading..."
          ) : (
            <>
              {userId && (
                <ChevronUpIcon
                  onClick={() =>
                    !localHostData.for.includes(userId) && vote(VOTE.FOR)
                  }
                  className={`w-5 h-5 hover:text-gray-600 ${
                    !localHostData.for.includes(userId)
                      ? "cursor-pointer"
                      : "text-gray-600"
                  }`}
                />
              )}
              <p className="text-gray-600">
                {localHostData.for.length - localHostData.against.length}
              </p>
              {userId && (
                <ChevronDownIcon
                  onClick={() =>
                    !localHostData.against.includes(userId) &&
                    vote(VOTE.AGAINST)
                  }
                  className={`w-5 h-5 hover:text-gray-600 ${
                    !localHostData.against.includes(userId)
                      ? "cursor-pointer"
                      : "text-gray-600"
                  }`}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
