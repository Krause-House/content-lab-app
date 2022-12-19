import React from "react";

const getCreator = (creator: string) => {};

export default function CreatorProfile({
  params,
}: {
  params: { creator: string };
}) {
  console.log(params);
  return <div className="">{params.creator}</div>;
}
