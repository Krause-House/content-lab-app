"use client";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Input from "~/components/Input";
import TextArea from "~/components/TextArea";
import { PrimaryButton } from "~/components/Buttons";
import { NewCandidate } from "~/types/Candidate";
import Card from "~/components/Card";
import FileUploader from "../FileUploader";
import uploadFile from "~/lib/uploadMedia";
import { toast } from "react-hot-toast";

// This is technically not a form, since it doesn't submit anything, so it can be used within other forms. BUT it should be used carefully because of that.
export default function CreateCandidateForm({
  onComplete,
}: {
  onComplete: (candidate: NewCandidate) => void;
}) {
  const [name, setName] = useState("");
  const [supportingText, setSupportingText] = useState("");
  const [media, setMedia] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleComplete = async () => {
    setLoading(true);
    try {
      const media_url = media
        ? await uploadFile(media, uuidv4() + media.name.slice(-4))
        : undefined;
      onComplete({
        name,
        media_url: media_url,
        supporting_text: supportingText,
        for: [],
        against: [],
      });
    } catch (e) {
      toast.error("Error adding candidate.");
    }
    setLoading(false);
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
        <FileUploader file={media} setFile={setMedia} />
        <div className="mt-4">
          <PrimaryButton
            disabled={!name}
            onClick={handleComplete}
            isLoading={loading}
            loadingText="Adding..."
          >
            Add
          </PrimaryButton>
        </div>
      </div>
    </Card>
  );
}
