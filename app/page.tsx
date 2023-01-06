import Image from "next/image";
import React from "react";
import Card from "~/components/Card";
import Creator from "~/types/Creator";
import createClient from "~/util/supabase-server";

async function getCreators(): Promise<Creator[]> {
  const supabase = createClient();
  const { data: creators } = await supabase
    .from("creators")
    .select()
    .filter("is_visible", "eq", true);
  if (!creators) {
    throw new Error("Failed to fetch creators");
  }
  return creators;
}

export default async function Home() {
  const creators = await getCreators();
  return (
    <main className="relative px-4 mx-auto max-w-7xl">
      <div className="flex flex-col items-center justify-center gap-12 p-12 md:flex-row">
        {creators.map((creator) => (
          <a href={creator.page_url ?? `/creator/${creator.id}`}>
            <Card className="w-[351px] h-[453px] relative card-shadow-hover overflow-hidden cursor-pointer transition-shadow">
              <div className="absolute inset-0 z-0 object-cover w-full h-full">
                {creator.homepage_image_url && (
                  <Image
                    className="object-cover w-full h-full"
                    src={creator.homepage_image_url}
                    alt=""
                    fill
                  />
                )}
                <div
                  className={`w-full h-full bg-primary-500 ${
                    creator.homepage_image_url && "opacity-40"
                  }`}
                />
              </div>
              <div className="absolute flex flex-col justify-between w-full h-full p-6">
                <h1 className="text-white mega">{creator.name}</h1>
                <p className="text-center text-white accent">Vote Now</p>
              </div>
            </Card>
          </a>
        ))}
      </div>
    </main>
  );
}
