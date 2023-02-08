"use client";
import Card from "~/components/Card";
import React from "react";
import setVote, { VOTE } from "~/lib/setVote";
import Candidate from "~/types/Candidate";
import Media from "~/types/Media";
import DisplayMedia from "~/components/DisplayMedia";

const update = async (
  candidate: Candidate,
  userEmail: string,
  vote: VOTE,
  votingPower?: number
) => {
  return await setVote(candidate, userEmail, vote, votingPower);
};
export default function MediaItem({
  media,
  winners,
}: {
  media: Media;
  winners: Candidate[];
}) {
  return (
    <>
      <Card className="w-full my-4 bg-tan">
        <div className="px-4 py-5 border-b border-gray-300 md:flex md:items-center md:gap-2 md:justify-between sm:px-6">
          <div className="w-full">
            <h2 className="text-gray-800">{media.name}</h2>
            {/* <p className="mt-1 text-sm text-gray-500">{media.description}</p> */}
          </div>
          <div className="flex items-end justify-end w-full gap-2 mt-3 md:mt-0"></div>
        </div>
        <ul role="list" className="divide-y divide-gray-300">
          {winners.map((winner: Candidate) => (
            <li key={winner.id}>
              <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="flex items-center justify-start flex-1 min-w-0 gap-3">
                  {winner.media_url && (
                    <div className="relative min-w-[50px] min-h-[50px] overflow-hidden rounded-full min-w-lg bg-tan-500 ring-2 ring-tan-400 z-0">
                      <DisplayMedia
                        mediaUrl={winner.media_url}
                        alt={winner.name}
                        imageOnly
                      />
                    </div>
                  )}
                  <div className="">
                    <h4 className="flex items-center gap-1">
                      <span className="truncate">{winner.name}</span>
                    </h4>
                    <p className="text-sm text-gray-500">
                      {winner.supporting_text}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}
