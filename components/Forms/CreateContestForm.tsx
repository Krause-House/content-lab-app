"use client";
import React, { useState } from "react";
import Creator from "~/types/Creator";
import Input from "~/components/Input";
import TextArea from "~/components/TextArea";
import { PrimaryButton } from "~/components/Buttons";
import supabase from "~/util/supabase-browser";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CreateContestForm({ creator }: { creator: Creator }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
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
          .insert({ name, description, created_by: creator.id })
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
