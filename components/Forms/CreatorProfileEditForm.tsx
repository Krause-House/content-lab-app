"use client";
import React, { useState } from "react";
import Creator from "~/types/Creator";
import Input from "~/components/Input";
import TextArea from "~/components/TextArea";
import { PrimaryButton } from "~/components/Buttons";
import supabase from "~/util/supabase-browser";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CreatorProfileEditForm({
  creator,
}: {
  creator: Creator;
}) {
  const router = useRouter();
  const [name, setName] = useState(creator.name);
  const [bio, setBio] = useState(creator.bio ?? "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (!name) {
      toast.error("Name is required");
    } else {
      try {
        const { error } = await supabase
          .from("creators")
          .update({ name, bio })
          .eq("id", creator.id);
        if (error) {
          throw error;
        } else {
          toast.success("Profile updated");
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
        value={bio}
        type="text"
        placeholder="Bio"
        className="max-w-md"
        onChange={(e) => setBio(e.target.value)}
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
