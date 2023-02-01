"use client";
import React, { useState } from "react";
import Creator from "~/types/Creator";
import Input from "~/components/Input";
import TextArea from "~/components/TextArea";
import { PrimaryButton } from "~/components/Buttons";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Checkbox from "~/components/Checkbox";
import { CONTEST_DISPLAY, CONTEST_TYPE } from "~/types/Contest";
import { NewCandidate } from "~/types/Candidate";
import NewCandidateButton from "~/components/Buttons/NewCandidateButton";
import addCandidates from "~/lib/addCandidates";
import addContest from "~/lib/addContest";
import DisplayMedia from "../DisplayMedia";

export default function CreateContestForm({ creator }: { creator: Creator }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<CONTEST_TYPE>(CONTEST_TYPE.POLL);
  const [display, setDisplay] = useState<CONTEST_DISPLAY>(CONTEST_DISPLAY.LIST);
  const [allowSubmissions, setAllowSubmissions] = useState(false);
  const [candidates, setCandidates] = useState<NewCandidate[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (!name) {
      toast.error("Name is required");
    } else if (type === CONTEST_TYPE.POLL && candidates.length < 1) {
      toast.error("Add at least one voting option");
    } else {
      try {
        const contest = await addContest({
          name,
          description,
          type,
          display: display,
          created_by: creator.id,
          is_active: true,
          is_visible: true,
          allow_submissions: allowSubmissions,
        });
        if (type === CONTEST_TYPE.POLL) {
          addCandidates(contest.id, candidates);
        }
        toast.success("Contest created");
        router.push(`/creator/${creator.id}`);
      } catch (e) {
        console.error(e);
        toast.error("Something went wrong");
      }
    }
    setIsLoading(false);
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center justify-center gap-12 lg:items-start lg:flex-row">
        <div className="flex flex-col w-full max-w-md gap-3">
          <h3 className="text-xl">Contest Configuration</h3>
          <Input
            value={name}
            type="text"
            placeholder="Name"
            className=""
            onChange={(e) => setName(e.target.value)}
          />
          <TextArea
            value={description}
            type="text"
            placeholder="Description"
            className=""
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex items-center gap-6">
            <p>Contest type:</p>
            <p>
              <Checkbox
                checked={type === CONTEST_TYPE.POLL}
                onChange={() =>
                  type !== CONTEST_TYPE.POLL && setType(CONTEST_TYPE.POLL)
                }
              />
              <label className="ml-2">Poll</label>
            </p>
            <p>
              <Checkbox
                checked={type === CONTEST_TYPE.REFERRALS}
                onChange={() =>
                  type !== CONTEST_TYPE.REFERRALS &&
                  setType(CONTEST_TYPE.REFERRALS)
                }
              />
              <label className="ml-2">Referrals</label>
            </p>
          </div>
          <div className="flex items-center gap-6">
            <p>Display as:</p>
            <p>
              <Checkbox
                checked={display === CONTEST_DISPLAY.LIST}
                onChange={() =>
                  display !== CONTEST_DISPLAY.LIST &&
                  setDisplay(CONTEST_DISPLAY.LIST)
                }
              />
              <label className="ml-2">List</label>
            </p>
            <p>
              <Checkbox
                checked={display === CONTEST_DISPLAY.GRID}
                onChange={() =>
                  display !== CONTEST_DISPLAY.GRID &&
                  setDisplay(CONTEST_DISPLAY.GRID)
                }
              />
              <label className="ml-2">Grid</label>
            </p>
          </div>
        </div>
        {type === "poll" && (
          <div className="flex flex-col w-full max-w-md gap-3">
            <h3 className="text-xl">Voting Options</h3>
            <div className="flex">
              <Checkbox
                checked={allowSubmissions}
                onChange={() => setAllowSubmissions(!allowSubmissions)}
              />
              <label className="ml-2">Allow user-submitted options</label>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                {candidates.map((candidate, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center justify-start gap-2 overflow-hidden rounded-lg input-border bg-tan"
                  >
                    {candidate.media_url && (
                      <div className="relative min-w-full min-h-[200px] overflow-hidden min-w-lg bg-tan-500 z-0">
                        <DisplayMedia
                          mediaUrl={candidate.media_url}
                          alt={candidate.name}
                        />
                      </div>
                    )}
                    <div className="p-2 px-4 truncate">
                      <h4 className="flex items-center gap-1">
                        <span className="truncate">{candidate.name}</span>
                      </h4>
                      <p className="text-sm text-gray-500">
                        {candidate.supporting_text}
                      </p>
                    </div>
                  </div>
                ))}
                <NewCandidateButton
                  style="creator"
                  onComplete={(candidate: NewCandidate) =>
                    setCandidates([...candidates, candidate])
                  }
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center my-8">
        <PrimaryButton
          type="submit"
          className=""
          isLoading={isLoading}
          loadingText="Saving..."
        >
          Create Contest
        </PrimaryButton>
      </div>
    </form>
  );
}
