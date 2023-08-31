import type { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method != "POST") {
    res.status(404).json("method isn/t accepted");
  }
  const cookies = new Cookies(req, res);
  cookies.set("access_token");
  res.status(200).json({ message: "logout successful" });
}
