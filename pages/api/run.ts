import type { NextApiRequest, NextApiResponse } from "next";

const baseUrl = process.env.BASE_API_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log(`${baseUrl}/${req.query.route}`);
  const response = await fetch(`${baseUrl}/${req.query.route}`, {
    method: req.query.method as string ?? "POST",
    headers: {
      Authorization: req.headers.authorization as string,
    },
    body: req.query.method ? undefined : req.body,
  });
  const json = await response.json();
  return res.status(200).json(json);
}
