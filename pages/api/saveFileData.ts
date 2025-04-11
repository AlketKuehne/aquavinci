import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "shipments.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const data = req.body;
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
      return res.status(200).json({ message: "Data saved successfully" });
    } catch (error) {
      console.error("Error writing file:", error);
      return res.status(500).json({ error: "Failed to save data" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
