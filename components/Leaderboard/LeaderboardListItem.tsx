import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { VOTE } from "~/lib/setVote";
import Candidate from "~/types/Candidate";
import DisplayMedia from "~/components/DisplayMedia";

export default function LeaderboardListItem({
  candidate,
  userEmail,
  canVote,
  vote,
  badges,
  hasVoting = true,
  className,
}: {
  candidate: Candidate;
  userEmail: string | null;
  canVote: boolean;
  vote: (vote: VOTE) => void;
  badges?: string[];
  hasVoting?: boolean;
  className?: string;
}) {
  return (
    <div className={`block ${className}`}>
      <div className="flex items-center px-4 py-4 sm:px-6">
        <div className="flex items-center justify-start flex-1 min-w-0 gap-3">
          {candidate.media_url && (
            <div className="relative min-w-[50px] min-h-[50px] overflow-hidden rounded-full min-w-lg bg-tan-500 ring-2 ring-tan-400 z-0">
              <DisplayMedia
                mediaUrl={candidate.media_url}
                alt={candidate.name}
                imageOnly
              />
            </div>
          )}
          <div className="">
            <h4 className="flex items-center gap-1">
              <span className="truncate">{candidate.name}</span>
              {badges?.map((b, idx) => (
                <span
                  key={idx}
                  className="px-2 text-xs text-white rounded-md bg-primary-200 border-primary border-2 py-0.5"
                >
                  {b}
                </span>
              ))}
            </h4>
            <p className="text-sm text-gray-500">{candidate.supporting_text}</p>
          </div>
        </div>
        {hasVoting && (
          <div className="flex flex-col items-center flex-shrink-0 mx-2 text-sm font-medium text-gray-400">
            {userEmail && canVote && (
              <ChevronUpIcon
                onClick={() =>
                  !candidate.for.includes(userEmail) && vote(VOTE.FOR)
                }
                className={`w-5 h-5 hover:text-gray-800 transition ${
                  !candidate.for.includes(userEmail)
                    ? "cursor-pointer hover:scale-125"
                    : "text-gray-800"
                }`}
              />
            )}
            <p className="text-base text-primary">
              {candidate.for.length - candidate.against.length}
            </p>
            {userEmail && canVote && (
              <ChevronDownIcon
                onClick={() =>
                  !candidate.against.includes(userEmail) && vote(VOTE.AGAINST)
                }
                className={`w-5 h-5 hover:text-gray-800 transition ${
                  !candidate.against.includes(userEmail)
                    ? "cursor-pointer hover:scale-125"
                    : "text-gray-800"
                }`}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
