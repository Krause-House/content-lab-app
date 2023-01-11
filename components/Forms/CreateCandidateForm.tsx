"use client";
import React, { useState } from "react";
import Input from "~/components/Input";
import TextArea from "~/components/TextArea";
import { PrimaryButton } from "~/components/Buttons";
import { NewCandidate } from "~/types/Candidate";
import Card from "~/components/Card";

// This is technically not a form, since it doesn't submit anything, so it can be used within other forms. BUT it should be used carefully because of that.
export default function CreateCandidateForm({
  onComplete,
}: {
  onComplete: (candidate: NewCandidate) => void;
}) {
  const [name, setName] = useState("");
  const [supportingText, setSupportingText] = useState("");

  const handleComplete = async () => {
    onComplete({
      name,
      supporting_text: supportingText,
      for: [],
      against: [],
    });
  };

  return (
    <Card className="max-w-md p-6 overflow-hidden text-left align-middle transition-all transform w-72 sm:w-96 bg-tan">
      <h2 className="mb-4">New Voting Option</h2>
      <div className="flex flex-col gap-2">
        <Input
          value={name}
          type="text"
          placeholder="Name"
          className="max-w-md"
          onChange={(e) => setName(e.target.value)}
        />
        <TextArea
          value={supportingText}
          type="text"
          placeholder="Supporting Text"
          className="max-w-md"
          onChange={(e) => setSupportingText(e.target.value)}
        />
        <div className="mt-4">
          <PrimaryButton disabled={!name} onClick={handleComplete}>
            Add
          </PrimaryButton>
        </div>
      </div>
    </Card>
  );
}
