"use client"; // Wichtig für useState

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function ShipmentPage() {
  const [shipmentType, setShipmentType] = useState("");

  return (
    <div className="flex flex-col items-center min-h-screen">
      
      {/* Navigation Bar */}
      <nav className="w-full h-12 bg-[#242424] flex items-center px-4">
        <Link href="/">
          <Image src="/logoname.png" alt="Logo" width={140} height={50} className="h-10 w-auto cursor-pointer" />
        </Link>

        <div className="flex h-full ml-4">
          <Link
            href="/"
            className="flex items-center justify-center px-6 text-lg text-white bg-[#242424] transition-all duration-1250 hover:bg-gray-200 hover:text-black h-full"
          >
            Homepage
          </Link>
          <Link
            href="/shipment"
            className="flex items-center justify-center px-6 text-lg text-white bg-[#242424] transition-all duration-1250 hover:bg-gray-200 hover:text-black h-full"
          >
            Create Shipment
          </Link>
        </div>
      </nav>

      {/* Page Content */}
      <div className="flex flex-col items-start w-full max-w-6xl mt-12 px-8">
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

        {/* Shipment Type Section */}
        <div className="w-full flex justify-center mt-16">
          <div className="bg-white p-6 shadow-lg rounded-lg w-[90%] max-w-[1100px]">
            <h2 className="text-lg font-bold mb-4 text-center">Select Shipment Type</h2>

            <div className="flex justify-around w-full">
              {/* FCL Option */}
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="shipmentType"
                  value="FCL"
                  onChange={() => setShipmentType("FCL")}
                  className="w-5 h-5"
                />
                <span className="text-lg font-medium">FCL (Full Container Load)</span>
              </label>

              {/* LCL Option */}
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="shipmentType"
                  value="LCL"
                  onChange={() => setShipmentType("LCL")}
                  className="w-5 h-5"
                />
                <span className="text-lg font-medium">LCL (Less Container Load)</span>
              </label>
            </div>

            {/* Dropdowns für FCL und LCL mit großem Abstand */}
            <div className="flex justify-between w-full mt-6 gap-x-20">
              {/* FCL Container Type */}
              <select
                disabled={shipmentType !== "FCL"}
                className="w-1/2 p-3 border rounded bg-gray-100 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <option>Select Container Type</option>
                <option>20ft Container</option>
                <option>40ft Container</option>
              </select>

              {/* LCL Package Type */}
              <select
                disabled={shipmentType !== "LCL"}
                className="w-1/2 p-3 border rounded bg-gray-100 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <option>Select Package Type</option>
                <option>Palette</option>
                <option>Barrel</option>
              </select>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
