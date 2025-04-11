import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "shipments.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const data = req.body;

      // Ensure the data directory exists
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Write data to the file
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
      return res.status(200).json({ message: "Data saved successfully" });
    } catch (error) {
      console.error("Error writing file:", error); // Log the exact error
      return res.status(500).json({ 
        error: "Failed to save data", 
        details: (error as Error).message // Cast error to Error type
      });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
