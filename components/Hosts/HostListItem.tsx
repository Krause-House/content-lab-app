import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import HostData from "~/types/HostData";
import DiscordTag from "~/components/SocialTags/DiscordTag";
import setVote, { VOTE } from "~/lib/setVote";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

const act = async (
  host: HostData,
  userId: string,
  vote: VOTE,
  refresh: () => void
) => {
  await setVote(host, userId, vote);
  refresh();
};

export default function HostListItem({
  host,
  userId,
}: {
  host: HostData;
  userId: string | null;
}) {
  const [score, setScore] = useState(host.for.length - host.against.length);
  const [currentVote, setCurrentVote] = useState<VOTE | null>(
    userId
      ? host.for.includes(userId)
        ? VOTE.FOR
        : host.against.includes(userId)
        ? VOTE.AGAINST
        : null
      : null
  );

  const vote = useCallback(
    async (vote: VOTE) => {
      const originalScore = score;
      const originalVote = currentVote;
      try {
        if (userId) {
          const baseChange = vote === VOTE.FOR ? 1 : -1;
          const change =
            baseChange *
            (host.against.includes(userId) || host.for.includes(userId)
              ? 2
              : 1);
          setScore(score + change);
          setCurrentVote(vote);
          await act(host, userId, vote, router.refresh);
        } else throw new Error("User is not logged in");
      } catch (e) {
        setScore(originalScore);
        setCurrentVote(originalVote);
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
          {userId && (
            <ChevronUpIcon
              onClick={() => currentVote != VOTE.FOR && vote(VOTE.FOR)}
              className={`w-5 h-5 hover:text-gray-600 ${
                currentVote != VOTE.FOR ? "cursor-pointer" : "text-gray-600"
              }`}
            />
          )}
          <p className="text-gray-600">{score}</p>
          {userId && (
            <ChevronDownIcon
              onClick={() => currentVote != VOTE.AGAINST && vote(VOTE.AGAINST)}
              className={`w-5 h-5 hover:text-gray-600 ${
                currentVote != VOTE.AGAINST ? "cursor-pointer" : "text-gray-600"
              }`}
            />
          )}
        </div>
      </div>
    </div>
  );
}
