import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "shipments.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      if (!fs.existsSync(filePath)) {
        return res.status(200).json([]); // Return an empty array if the file doesn't exist
      }
      const data = fs.readFileSync(filePath, "utf-8");
      return res.status(200).json(JSON.parse(data));
    } catch (error) {
      console.error("Error reading file:", error);
      return res.status(500).json({ error: "Failed to read data" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
