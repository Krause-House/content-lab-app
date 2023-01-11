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
import { contest_types } from "~/types/Contest";

export default function CreateContestForm({ creator }: { creator: Creator }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<typeof contest_types[number]>("poll");
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
          .eq("id", creator.id);
        if (error) {
          throw error;
        } else {
          toast.success("Contest created");
          router.push(`/creator/${creator.id}`);
        }
      } catch (e) {
        console.error(e);
        toast.error("Something went wrong");
      }
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-col items-start gap-2" onSubmit={handleSubmit}>
      <Input
        value={name}
        type="text"
        placeholder="Name"
        className="max-w-md"
        onChange={(e) => setName(e.target.value)}
      />
      <TextArea
        value={description}
        type="text"
        placeholder="Description"
        className="max-w-md"
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
      <PrimaryButton
        type="submit"
        isLoading={isLoading}
        loadingText="Saving..."
      >
        Save
      </PrimaryButton>
    </form>
  );
}
