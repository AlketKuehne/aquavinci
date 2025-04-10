import { NextApiRequest, NextApiResponse } from "next";
import { addOrder } from "utils/orderDatabank"; // Use alias from tsconfig.json

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("API called with method:", req.method); // Log the HTTP method

  if (req.method === "POST") {
    const order = req.body;
    console.log("Received order:", order); // Log the received order

    try {
      addOrder(order); // Save the order to `confirmedOrders.json`
      console.log("Order saved successfully!"); // Log success
      res.status(200).json({ message: "Order saved successfully!" });
    } catch (error) {
      console.error("Error saving order:", error); // Log any errors

      if (error instanceof Error) {
        res.status(500).json({ message: "Failed to save order", error: error.message });
      } else {
        res.status(500).json({ message: "Failed to save order", error: "Unknown error occurred" });
      }
    }
  } else {
    console.log("Invalid method:", req.method); // Log invalid methods
    res.status(405).json({ message: "Method not allowed" });
  }
}
