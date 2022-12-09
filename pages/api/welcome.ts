import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  email?: string;
  message?: string;
};

type Tag = {
  id: number;
  name: string;
};
type Member = {
  email_address: string;
  tags: Tag[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (!req.body.email) {
    res.status(400).json({ message: "Email is required" });
    return;
  }
  const mailchimpClient = require("@mailchimp/mailchimp_marketing");
  mailchimpClient.setConfig({
    apiKey: process.env.MARKETING_KEY,
    server: process.env.MAILCHIMP_SERVER,
  });
  let user = null;
  try {
    user = await mailchimpClient.lists.getListMember(
      process.env.NEWSLETTER_AUDIENCE_ID,
      req.body.email
    );
  } catch (error: any) {
    // user not found, so keep it null
  }

  // has the user already signed up on this or another list?, if not create user
  if (!user) {
    try {
      user = await mailchimpClient.lists.addListMember(
        process.env.NEWSLETTER_AUDIENCE_ID,
        {
          email_address: req.body.email,
          status: "subscribed",
        }
      );
    } catch (error: any) {
      res.status(500).send({ message: error.response.body.detail });
      return;
    }
  }

  // has the user already signed up on this list?, if not add to this list
  if (!user?.tags.find((tag: Tag) => tag.name === "App")) {
    try {
      await mailchimpClient.lists.updateListMemberTags(
        process.env.NEWSLETTER_AUDIENCE_ID,
        user.id,
        {
          tags: [{ name: "App", status: "active" }],
        }
      );
    } catch (error: any) {
      res.status(500).send({ message: error.response.body.detail });
      return;
    }
  } else {
    res.status(400).json({ message: "Email already exists" });
    return;
  }

  res.status(200).json({ email: req.body.email });
  return;
}
