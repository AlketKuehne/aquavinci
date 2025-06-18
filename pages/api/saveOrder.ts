import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("API called with method:", req.method);

  if (req.method === "POST") {
    const order = req.body;
    console.log("Received order:", order);
    res.status(200).json({ message: "Order received (not saved)" });
  } else {
    console.log("Invalid method:", req.method);
    res.status(405).json({ message: "Method not allowed" });
  }
}
