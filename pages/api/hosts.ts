// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import addHost from "~/lib/addHost";
import getHosts from "~/lib/getHosts";
import HostData from "~/types/HostData";

type Data = HostData[] | { message: string };

async function postHandler(req: NextApiRequest, res: NextApiResponse) {
  const { data, error } = await addHost();
  if (error) {
    res.status(500).send(error);
  }
  res.status(200).json(data);
}

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  const { data, error } = await getHosts();
  if (error) {
    res.status(500).send(error);
  }
  res.status(200).json(data);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    await postHandler(req, res);
  } else if (req.method === "GET") {
    await getHandler(req, res);
  } else {
    res.status(400).send({ message: "Invalid route" });
  }
}
