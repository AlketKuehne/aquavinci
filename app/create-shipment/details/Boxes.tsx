"use client";

import { useState } from "react";

export default function Boxes({ shipmentType }: { shipmentType: string | null }) {
  const [fclSelection, setFclSelection] = useState<string | null>(null);
  const [lclSelection, setLclSelection] = useState<string | null>(null);
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [length, setLength] = useState<string>("");
  const [width, setWidth] = useState<string>("");

  return (
    <div className="flex flex-col items-start w-full max-w-6xl mt-4 px-8">
      <h1 className="text-4xl font-extrabold mb-8 self-start">Details</h1>
      <div className="flex justify-between w-full gap-x-4">
        <div className={`bg-white p-6 shadow-lg rounded-lg w-1/2 ${shipmentType === "LCL" ? "opacity-50 pointer-events-none" : ""}`}>
          <h2 className="text-lg font-bold mb-4">Full Container Load</h2>
          <input
            type="text"
            placeholder="Enter number of containers"
            value={fclSelection || ""}
            onChange={(e) => setFclSelection(e.target.value)}
            className="w-full p-3 border rounded bg-gray-100"
          />
        </div>
        <div className={`bg-white p-6 shadow-lg rounded-lg w-1/2 ${shipmentType === "FCL" ? "opacity-50 pointer-events-none" : ""}`}>
          <h2 className="text-lg font-bold mb-4">Less Container Load</h2>
          <input
            type="text"
            placeholder="Enter number of packages"
            value={lclSelection || ""}
            onChange={(e) => setLclSelection(e.target.value)}
            className="w-full p-3 border rounded bg-gray-100"
          />
        </div>
      </div>
      <div className="flex justify-between w-full mt-4 gap-x-4">
        <div className="bg-white p-6 shadow-lg rounded-lg w-1/2">
          <h2 className="text-lg font-bold mb-4">Size & Weight Details</h2>
          <input
            type="number"
            placeholder="Weight (in kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-3 border rounded mb-4 bg-gray-100"
          />
          <input
            type="number"
            placeholder="Height (in m)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full p-3 border rounded mb-3 bg-gray-100"
          />
          <input
            type="number"
            placeholder="Length (in m)"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full p-3 border rounded mb-3 bg-gray-100"
          />
          <input
            type="number"
            placeholder="Width (in m)"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="w-full p-3 border rounded bg-gray-100"
          />
        </div>
      </div>
    </div>
  );
}
