import React from "react";
import createClient from "~/util/supabase-server";
import ResourceCard from "~/components/ResourceCard";
import Resource from "~/types/Resource";

export default async function Resources() {
  const supabase = createClient();
  const { data: resources } = await supabase.from("resources").select("*");
  return (
    <div className="flex flex-col justify-center px-6 py-20 mx-auto max-w-7xl">
      <div className="mb-6 text-center">
        <h1 className="">Gamedy Resources</h1>
        <p className="max-w-lg mx-auto text-gray-300">
          A collection of resource for the basketball lovers, haters, and
          dreamers. Get ready for gameday.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {resources?.map((resource: Resource) => (
          <ResourceCard resource={resource} key={resource.id} />
        ))}
      </div>
    </div>
  );
}
