"use client";
import React, { useState } from "react";
import Creator from "~/types/Creator";
import Input from "~/components/Input";
import TextArea from "~/components/TextArea";
import { PrimaryButton } from "~/components/Buttons";
import supabase from "~/util/supabase-browser";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Checkbox from "~/components/Checkbox";
import Contest, { contest_types } from "~/types/Contest";
import { NewCandidate } from "~/types/Candidate";
import NewCandidateButton from "~/components/Buttons/NewCandidateButton";

export default function CreateContestForm({ creator }: { creator: Creator }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<typeof contest_types[number]>("poll");
  const [candidates, setCandidates] = useState<NewCandidate[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (!name) {
      toast.error("Name is required");
    } else {
      try {
        const { data, error } = await supabase
          .from("contests")
          .insert({
            name,
            description,
            type,
            created_by: creator.id,
            is_active: true,
            is_visible: true,
          })
          .select();
        console.log(data, error);
        if (!error && data && type === "poll") {
          const { data: candidatesData, error: candidatesError } =
            await supabase.from("candidates").insert(
              candidates.map((candidate) => ({
                ...candidate,
                contest_id: (data as unknown as Contest[])[0].id,
              }))
            );
          if (candidatesError) {
            throw candidatesError ?? "Something went wrong";
          }
        }
        if (error || !data) {
          throw error ?? "Something went wrong";
        } else {
          toast.success("Contest created");
          router.push(`/creator/${creator.id}`);
        }
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
          <div className="flex gap-6">
            <p>Contest type:</p>
            <p>
              <label className="mr-1">Poll</label>
              <Checkbox
                checked={type === "poll"}
                onChange={() => type !== "poll" && setType("poll")}
              />
            </p>
            <p>
              <label className="mr-1">Referrals</label>
              <Checkbox
                checked={type === "referrals"}
                onChange={() => type !== "referrals" && setType("referrals")}
              />
            </p>
          </div>
        </div>
        {type === "poll" && (
          <div className="flex flex-col w-full max-w-md gap-6">
            <div className="flex flex-col gap-3">
              <h3 className="text-xl">Voting Options</h3>
              {candidates.map((candidate, idx) => (
                <div
                  key={idx}
                  className="p-2 px-4 rounded-lg input-border bg-tan"
                >
                  <div className="truncate">
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
                onComplete={(candidate: NewCandidate) =>
                  setCandidates([...candidates, candidate])
                }
              />
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
