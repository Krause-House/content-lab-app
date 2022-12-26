import Image from "next/image";
import React from "react";
import Card from "~/components/Card";

export default async function Home() {
  return (
    <main className="relative px-4 mx-auto max-w-7xl">
      <div className="flex flex-col items-center justify-center gap-12 p-12 md:flex-row">
        <a href="/dreamerz">
          <Card className="w-[351px] h-[453px] relative card-shadow-hover overflow-hidden cursor-pointer transition-shadow">
            <div className="absolute inset-0 z-0 object-cover w-full h-full">
              <Image
                className="object-cover w-full h-full"
                src="https://images.overtime.tv/articles/86a49485-f308-4c76-a635-dec629ba90db/eec93530-be32-44f4-b1d9-6b45597ea8cc.jpeg?format=webp"
                alt=""
                fill
              />
              <div className="w-full h-full opacity-40 bg-primary-500" />
            </div>
            <div className="absolute flex flex-col justify-between w-full h-full p-6">
              <h1 className="text-white mega">YNG Dreamerz Watch Party</h1>
              <p className="text-center text-white accent">Vote Now</p>
            </div>
          </Card>
        </a>
        <a href="/weekly">
          <Card className="w-[351px] h-[453px] relative card-shadow-hover cursor-pointer transition-shadow">
            <div className="absolute inset-0 z-0 object-cover w-full h-full">
              <Image
                className="object-cover w-full h-full"
                src="https://images.unsplash.com/photo-1648999600048-5410bc413bd9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=40"
                alt=""
                fill
              />
              <div className="w-full h-full opacity-40 bg-primary-500" />
            </div>
            <div className="absolute flex flex-col justify-between w-full h-full p-6">
              <h1 className="text-white mega">Around the Association Weekly</h1>
              <p className="text-center text-white accent">Vote Now</p>
            </div>
          </Card>
        </a>
      </div>
    </main>
  );
}
