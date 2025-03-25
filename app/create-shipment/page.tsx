"use client"; // Wichtig für useState

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
// Entfernen Sie den Import des Icons
// import { FaArrowRight } from "react-icons/fa";

export default function ShipmentPage() {
  const [shipmentType, setShipmentType] = useState("");
  const [fclSelection, setFclSelection] = useState(""); // Speichert die FCL-Auswahl
  const [lclSelection, setLclSelection] = useState(""); // Speichert die LCL-Auswahl
  const [description, setDescription] = useState(""); // Speichert die Beschreibung der Waren
  const [fullName, setFullName] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [originCity, setOriginCity] = useState("");
  const [street, setStreet] = useState("");
  const [destinationCountry, setDestinationCountry] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [destinationStreet, setDestinationStreet] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const [consignorFullName, setConsignorFullName] = useState("");
  const [consigneeFullName, setConsigneeFullName] = useState("");
  const [consignorFullAddress, setConsignorFullAddress] = useState("");
  const [consigneeFullAddress, setConsigneeFullAddress] = useState("");

  useEffect(() => {
    const isFormValid = Boolean(
      consignorFullName &&
      consignorFullAddress &&
      city &&
      country &&
      originCity &&
      street &&
      destinationCountry &&
      destinationCity &&
      destinationStreet &&
      shipmentType &&
      description &&
      ((shipmentType === "FCL" && fclSelection) || (shipmentType === "LCL" && lclSelection)) &&
      consigneeFullName &&
      consigneeFullAddress
    );
    setIsButtonEnabled(isFormValid);
  }, [
    consignorFullName,
    consignorFullAddress,
    city,
    country,
    originCity,
    street,
    destinationCountry,
    destinationCity,
    destinationStreet,
    shipmentType,
    description,
    fclSelection,
    lclSelection,
    consigneeFullName,
    consigneeFullAddress,
  ]);

  // Handler zum Ändern des Versandtyps (setzt die Dropdowns und die Beschreibung zurück)
  const handleShipmentChange = (type: string) => {
    setShipmentType(type);
    setFclSelection("");
    setLclSelection("");
    setDescription("");
  };

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
            href="/create-shipment"
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
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-2 border rounded mb-3 bg-gray-100"
              value={consignorFullName}
              onChange={(e) => setConsignorFullName(e.target.value)}
            />
            <input type="email" placeholder="Email Address" className="w-full p-2 border rounded mb-3 bg-gray-100" />
            <input type="tel" placeholder="Phone Number" className="w-full p-2 border rounded mb-3 bg-gray-100" />
            <input
              type="text"
              placeholder="Full Address"
              className="w-full p-2 border rounded mb-3 bg-gray-100"
              value={consignorFullAddress}
              onChange={(e) => setConsignorFullAddress(e.target.value)}
            />
            <input
              type="text"
              placeholder="City"
              className="w-full p-2 border rounded bg-gray-100"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          {/* Recipient Box */}
          <div className="bg-white p-6 shadow-lg rounded-lg w-1/2">
            <h2 className="text-lg font-bold mb-4">Consignee (Recipient)</h2>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-2 border rounded mb-3 bg-gray-100"
              value={consigneeFullName}
              onChange={(e) => setConsigneeFullName(e.target.value)}
            />
            <input type="email" placeholder="Email Address" className="w-full p-2 border rounded mb-3 bg-gray-100" />
            <input type="tel" placeholder="Phone Number" className="w-full p-2 border rounded mb-3 bg-gray-100" />
            <input
              type="text"
              placeholder="Full Address"
              className="w-full p-2 border rounded mb-3 bg-gray-100"
              value={consigneeFullAddress}
              onChange={(e) => setConsigneeFullAddress(e.target.value)}
            />
            <input
              type="text"
              placeholder="City"
              className="w-full p-2 border rounded bg-gray-100"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
        </div>

        {/* Second Form Section (From - To) */}
        <div className="flex justify-between w-full mt-8 gap-x-4">
          {/* From Box */}
          <div className="bg-white p-6 shadow-lg rounded-lg w-1/2">
            <h2 className="text-lg font-bold mb-4">Origin (From)</h2>
            <input
              type="text"
              placeholder="Country"
              className="w-full p-2 border rounded mb-3 bg-gray-100"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <input
              type="text"
              placeholder="City"
              className="w-full p-2 border rounded mb-3 bg-gray-100"
              value={originCity}
              onChange={(e) => setOriginCity(e.target.value)}
            />
            <input
              type="text"
              placeholder="Street & House Number"
              className="w-full p-2 border rounded bg-gray-100"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>

          {/* To Box */}
          <div className="bg-white p-6 shadow-lg rounded-lg w-1/2">
            <h2 className="text-lg font-bold mb-4">Destination (To)</h2>
            <input
              type="text"
              placeholder="Country"
              className="w-full p-2 border rounded mb-3 bg-gray-100"
              value={destinationCountry}
              onChange={(e) => setDestinationCountry(e.target.value)}
            />
            <input
              type="text"
              placeholder="City"
              className="w-full p-2 border rounded mb-3 bg-gray-100"
              value={destinationCity}
              onChange={(e) => setDestinationCity(e.target.value)}
            />
            <input
              type="text"
              placeholder="Street & House Number"
              className="w-full p-2 border rounded bg-gray-100"
              value={destinationStreet}
              onChange={(e) => setDestinationStreet(e.target.value)}
            />
          </div>
        </div>

        {/* FCL und LCL Boxen */}
        <div className="flex justify-between w-full mt-8 gap-x-4">
          {/* FCL Box */}
          <div className="bg-white p-6 shadow-lg rounded-lg w-1/2">
            <h2 className="text-lg font-bold mb-4">Full Container Load</h2>
            <label className="flex items-center space-x-2 mb-4">
              <input
                type="radio"
                name="shipmentType"
                value="FCL"
                onChange={() => handleShipmentChange("FCL")}
                className="w-5 h-5"
              />
              <span className="text-lg font-medium">FCL (Full Container Load)</span>
            </label>
            <select
              disabled={shipmentType !== "FCL"}
              value={fclSelection}
              onChange={(e) => setFclSelection(e.target.value)}
              className="w-full p-3 border rounded bg-gray-100 disabled:bg-gray-300 disabled:cursor-not-allowed mb-3"
            >
              <option value="">Select Container Type</option>
              <option value="20ft">20ft Container</option>
              <option value="40ft">40ft Container</option>
            </select>
            <label className="block text-lg font-medium mb-2">Description of Goods</label>
            <textarea
              rows={2}
              placeholder="Enter description of goods"
              className={`w-full p-3 border rounded ${shipmentType !== "FCL" ? "bg-[#D1D5DC] cursor-not-allowed" : "bg-gray-100"}`}
              disabled={shipmentType !== "FCL"}
              value={shipmentType === "FCL" ? description : ""}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          {/* LCL Box */}
          <div className="bg-white p-6 shadow-lg rounded-lg w-1/2">
            <h2 className="text-lg font-bold mb-4">Less Container Load</h2>
            <label className="flex items-center space-x-2 mb-4">
              <input
                type="radio"
                name="shipmentType"
                value="LCL"
                onChange={() => handleShipmentChange("LCL")}
                className="w-5 h-5"
              />
              <span className="text-lg font-medium">LCL (Less Container Load)</span>
            </label>
            <select
              disabled={shipmentType !== "LCL"}
              value={lclSelection}
              onChange={(e) => setLclSelection(e.target.value)}
              className="w-full p-3 border rounded bg-gray-100 disabled:bg-gray-300 disabled:cursor-not-allowed mb-3"
            >
              <option value="">Select Package Type</option>
              <option value="palette">Palette</option>
              <option value="barrel">Barrel</option>
            </select>
            <label className="block text-lg font-medium mb-2">Description of Goods</label>
            <textarea
              rows={2}
              placeholder="Enter description of goods"
              className={`w-full p-3 border rounded ${shipmentType !== "LCL" ? "bg-[#D1D5DC] cursor-not-allowed" : "bg-gray-100"}`}
              disabled={shipmentType !== "LCL"}
              value={shipmentType === "LCL" ? description : ""}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>

        {/* Continue Button */}
        <div className="flex justify-end w-full mt-16 mb-16">
          {isButtonEnabled ? (
            <Link href="/shipment/nextPage">
              <button
                className="flex items-center px-6 py-3 bg-black text-white text-lg font-medium rounded-full transition-all duration-[1250ms] hover:bg-[#E5E5E5] hover:text-black"
              >
                Continue
              </button>
            </Link>
          ) : (
            <button
              className="flex items-center px-6 py-3 bg-gray-300 text-gray-500 text-lg font-medium rounded-full cursor-not-allowed"
              disabled
            >
              Continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
}