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

        {/* First Form Section */}
        <div className="flex justify-between w-full gap-x-4">
          {/* Sender Box */}
          <div className="bg-white p-6 shadow-lg rounded-lg w-1/2">
            <h2 className="text-lg font-bold mb-4">Consignor (Sender)</h2>
            <input type="text" placeholder="Full Name" className="w-full p-2 border rounded mb-3 bg-gray-100" />
            <input type="email" placeholder="Email Address" className="w-full p-2 border rounded mb-3 bg-gray-100" />
            <input type="tel" placeholder="Phone Number" className="w-full p-2 border rounded mb-3 bg-gray-100" />
            <input type="text" placeholder="Full Address" className="w-full p-2 border rounded mb-3 bg-gray-100" />
            <input type="text" placeholder="City" className="w-full p-2 border rounded bg-gray-100" />
          </div>

          {/* Recipient Box */}
          <div className="bg-white p-6 shadow-lg rounded-lg w-1/2">
            <h2 className="text-lg font-bold mb-4">Consignee (Recipient)</h2>
            <input type="text" placeholder="Full Name" className="w-full p-2 border rounded mb-3 bg-gray-100" />
            <input type="email" placeholder="Email Address" className="w-full p-2 border rounded mb-3 bg-gray-100" />
            <input type="tel" placeholder="Phone Number" className="w-full p-2 border rounded mb-3 bg-gray-100" />
            <input type="text" placeholder="Full Address" className="w-full p-2 border rounded mb-3 bg-gray-100" />
            <input type="text" placeholder="City" className="w-full p-2 border rounded bg-gray-100" />
          </div>
        </div>

        {/* Second Form Section (From - To) */}
        <div className="flex justify-between w-full mt-8 gap-x-4">
          {/* From Box */}
          <div className="bg-white p-6 shadow-lg rounded-lg w-1/2">
            <h2 className="text-lg font-bold mb-4">Origin (From)</h2>
            <input type="text" placeholder="Country" className="w-full p-2 border rounded mb-3 bg-gray-100" />
            <input type="text" placeholder="City" className="w-full p-2 border rounded mb-3 bg-gray-100" />
            <input type="text" placeholder="Street & House Number" className="w-full p-2 border rounded bg-gray-100" />
          </div>

          {/* To Box */}
          <div className="bg-white p-6 shadow-lg rounded-lg w-1/2">
            <h2 className="text-lg font-bold mb-4">Destination (To)</h2>
            <input type="text" placeholder="Country" className="w-full p-2 border rounded mb-3 bg-gray-100" />
            <input type="text" placeholder="City" className="w-full p-2 border rounded mb-3 bg-gray-100" />
            <input type="text" placeholder="Street & House Number" className="w-full p-2 border rounded bg-gray-100" />
          </div>
        </div>

        {/* Shipment Type Box */}
        <div className="w-full mt-8">
          <div className="bg-white p-6 shadow-lg rounded-lg w-full">
            <h2 className="text-lg font-bold mb-4 text-center">Select Shipment Type</h2>
            <div className="flex justify-center space-x-8">
              {/* FCL Option */}
              <label className="flex items-center space-x-2">
                <input type="radio" name="shipmentType" value="FCL" className="w-5 h-5" 
                  onChange={() => {
                    setShipmentType("FCL");
                    setPackageType(""); // Reset LCL selection
                  }} 
                />
                <span className="text-lg font-medium">FCL (Full Container Load)</span>
              </label>

              {/* LCL Option */}
              <label className="flex items-center space-x-2">
                <input type="radio" name="shipmentType" value="LCL" className="w-5 h-5" 
                  onChange={() => {
                    setShipmentType("LCL");
                    setContainerType(""); // Reset FCL selection
                  }} 
                />
                <span className="text-lg font-medium">LCL (Less Container Load)</span>
              </label>
            </div>

            {/* Auswahl Dropdown je nach Auswahl */}
            <div className="mt-4">
              {shipmentType === "FCL" && (
                <select className="w-full p-2 border rounded bg-gray-100" 
                  value={containerType} 
                  onChange={(e) => setContainerType(e.target.value)}
                >
                  <option value="">Select Container Type</option>
                  <option value="20ft">20ft Container</option>
                  <option value="40ft">40ft Container</option>
                </select>
              )}

              {shipmentType === "LCL" && (
                <select className="w-full p-2 border rounded bg-gray-100" 
                  value={packageType} 
                  onChange={(e) => setPackageType(e.target.value)}
                >
                  <option value="">Select Package Type</option>
                  <option value="Pallet">Pallet</option>
                  <option value="Barrel">Barrel</option>
                </select>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}