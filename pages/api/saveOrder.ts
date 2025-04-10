import { NextApiRequest, NextApiResponse } from "next";
import { addOrder } from "utils/orderDatabank"; // Use alias from tsconfig.json

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const order = req.body;
    addOrder(order);
    res.status(200).json({ message: "Order saved successfully!" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
