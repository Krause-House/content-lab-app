// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import addHost from "~/lib/addHost";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("AAA");
  if (req.method === "POST") {
    const { data, error } = await addHost();
    if (error) {
      res.status(500).send(error);
    }
    res.status(200).json(data ?? {});
  } else {
    res.status(400).send({ message: "Invalid route" });
  }
  res.status(200);
}
