"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function ShipmentPage() {
  const [shipmentType, setShipmentType] = useState(""); // "FCL" oder "LCL"
  const [containerType, setContainerType] = useState(""); // 20ft oder 40ft (für FCL)
  const [packageType, setPackageType] = useState(""); // Palette oder Barrel (für LCL)

  return (
    <div className="flex flex-col items-center min-h-screen">
      {/* Navigation Bar */}
      <nav className="w-full h-12 bg-[#242424] flex items-center px-4">
        <Link href="/">
          <Image src="/logoname.png" alt="Logo" width={140} height={50} className="h-10 w-auto cursor-pointer" />
        </Link>
        <div className="flex h-full ml-4">
          <Link href="/" className="flex items-center justify-center px-6 text-lg text-white hover:bg-gray-200 hover:text-black h-full">
            Homepage
          </Link>
          <Link href="/shipment" className="flex items-center justify-center px-6 text-lg text-white hover:bg-gray-200 hover:text-black h-full">
            Create Shipment
          </Link>
        </div>
      </nav>

      {/* Page Content */}
      <div className="flex flex-col items-start w-full max-w-5xl mt-12 px-8">
        <h1 className="text-4xl font-extrabold mb-8 self-start">Create Shipment</h1>

        {/* Shipment Type Selection */}
        <div className="w-full bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-lg font-bold mb-4 text-center">Select Shipment Type</h2>
          
          <div className="flex justify-between">
            {/* FCL Option */}
            <div className="w-1/2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="shipmentType"
                  value="FCL"
                  className="w-5 h-5"
                  onChange={() => {
                    setShipmentType("FCL");
                    setPackageType(""); // Reset LCL selection
                  }}
                />
                <span className="text-lg font-medium">FCL (Full Container Load)</span>
              </label>

              {/* FCL Dropdown (immer sichtbar, aber ggf. deaktiviert) */}
              <select
                className={`w-full p-2 border rounded mt-2 ${
                  shipmentType === "LCL" ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-gray-100"
                }`}
                value={containerType}
                onChange={(e) => setContainerType(e.target.value)}
                disabled={shipmentType === "LCL"} // Deaktiviert, wenn LCL aktiv ist
              >
                <option value="">Select Container Type</option>
                <option value="20ft">20ft Container</option>
                <option value="40ft">40ft Container</option>
              </select>
            </div>

            {/* LCL Option */}
            <div className="w-1/2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="shipmentType"
                  value="LCL"
                  className="w-5 h-5"
                  onChange={() => {
                    setShipmentType("LCL");
                    setContainerType(""); // Reset FCL selection
                  }}
                />
                <span className="text-lg font-medium">LCL (Less Container Load)</span>
              </label>

              {/* LCL Dropdown (immer sichtbar, aber ggf. deaktiviert) */}
              <select
                className={`w-full p-2 border rounded mt-2 ${
                  shipmentType === "FCL" ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-gray-100"
                }`}
                value={packageType}
                onChange={(e) => setPackageType(e.target.value)}
                disabled={shipmentType === "FCL"} // Deaktiviert, wenn FCL aktiv ist
              >
                <option value="">Select Package Type</option>
                <option value="Pallet">Pallet</option>
                <option value="Barrel">Barrel</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
