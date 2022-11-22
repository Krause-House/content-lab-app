// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import addHost from "~/lib/addHost";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    addHost();
    res.status(200).json({ name: "John Doe" });
  } else {
    res.status(400);
  }
}
