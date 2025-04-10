import { NextApiRequest, NextApiResponse } from "next";
import { addOrder } from "utils/orderDatabank"; // Use alias from tsconfig.json

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const order = req.body;

    console.log("Received order:", order); // Log the received order

    try {
      addOrder(order);
      console.log("Order saved successfully!"); // Log success
      res.status(200).json({ message: "Order saved successfully!" });
    } catch (error) {
      console.error("Error saving order:", error); // Log any errors
      res.status(500).json({ message: "Failed to save order." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
