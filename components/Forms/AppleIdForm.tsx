"use client";
import React, { useState } from "react";
import Input from "~/components/Input";
import { PrimaryButton } from "~/components/Buttons";
import Card from "~/components/Card";
import { toast } from "react-hot-toast";
import submitAppleId from "~/lib/submitAppleId";

// This is technically not a form, since it doesn't submit anything, so it can be used within other forms. BUT it should be used carefully because of that.
export default function AppleIdForm({
  userEmail,
  onComplete,
}: {
  userEmail: string;
  onComplete: () => void;
}) {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!id) {
      toast.error("Name is required");
    } else {
      try {
        const contest = await submitAppleId(userEmail, id);
        toast.success("Apple ID submitted");
        onComplete();
      } catch (e) {
        console.error(e);
        toast.error("Something went wrong");
      }
    }
    setLoading(false);
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      <Card className="max-w-md p-6 overflow-hidden text-left align-middle transition-all transform w-72 sm:w-96 bg-tan">
        <h2 className="mb-4">Submit your Apple ID</h2>
        <p className="mb-2">
          Write a review, submit your apple ID, get bonus votes.
        </p>
        <div className="flex flex-col gap-2">
          <Input
            value={id}
            type="text"
            placeholder="Apple ID"
            className="max-w-md"
            onChange={(e) => setId(e.target.value)}
          />
          <div className="mt-4">
            <PrimaryButton
              disabled={!id}
              type="submit"
              isLoading={loading}
              loadingText="Submiting..."
            >
              Submit
            </PrimaryButton>
          </div>
        </div>
      </Card>
    </form>
  );
}
