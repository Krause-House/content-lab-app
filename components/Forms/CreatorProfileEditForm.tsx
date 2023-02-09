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
  const [links, setLinks] = useState({
    watch: creator.watch_url ?? "",
    read: creator.read_url ?? "",
    listen: creator.listen_url ?? "",
  });
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
          .update({
            name,
            bio,
            watch_url: links.watch,
            read_url: links.read,
            listen_url: links.listen,
          })
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
    <form
      className="grid items-start grid-cols-1 gap-2 md:grid-cols-2"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-start gap-2">
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
      </div>
      <div className="flex flex-col items-start gap-2">
        <Input
          value={links.read}
          type="text"
          placeholder="Read Link"
          className="max-w-md"
          onChange={(e) => setLinks({ ...links, read: e.target.value })}
        />
        <Input
          value={links.listen}
          type="text"
          placeholder="Listen Link"
          className="max-w-md"
          onChange={(e) => setLinks({ ...links, listen: e.target.value })}
        />
        <Input
          value={links.watch}
          type="text"
          placeholder="Watch Link"
          className="max-w-md"
          onChange={(e) => setLinks({ ...links, watch: e.target.value })}
        />
      </div>
      <div className="flex justify-start">
        <PrimaryButton
          type="submit"
          isLoading={isLoading}
          loadingText="Saving..."
        >
          Save
        </PrimaryButton>
      </div>
    </form>
  );
}
