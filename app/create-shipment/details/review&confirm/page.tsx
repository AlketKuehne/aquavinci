"use client";

import { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";

interface ShipmentData {
  consignorName: string;
  consignorEmail: string;
  consignorPhone: string;
  consignorAddress: string;
  consignorCountry: string;
  consignorCity: string;
  consigneeName: string;
  consigneeEmail: string;
  consigneePhone: string;
  consigneeAddress: string;
  consigneeCountry: string;
  consigneeCity: string;
  originCountry: string;
  originCity: string;
  originStreet: string;
  destinationCountry: string;
  destinationCity: string;
  destinationStreet: string;
  containerType: string;
  goodsDescription: string;
  packageType: string;
  numberOfPieces: string;
  dangerousGoods: string;
  shippingDate: string;
  deliveryDate: string;
  shipmentType: string;
  fclSelection: string;
  lclSelection: string;
  weight: string;
  height: string;
  length: string;
  width: string;
  isFragile: boolean;
  fragileCategory: string;
  fragileSubCategory: string;
  extraProtection: boolean;
  deliveryOption: string;
}

export default function ReviewAndConfirmPage() {
  const [fields, setFields] = useState<ShipmentData | null>(null);
  const [editableField, setEditableField] = useState<keyof ShipmentData | null>(null);

  // Simulate fetching data from a backend or context
  useEffect(() => {
    const fetchShipmentData = async () => {
      // Replace this with actual API or context fetching logic
      const response = await fetch("/api/shipment-data"); // Example API endpoint
      const data: ShipmentData = await response.json();
      setFields(data);
    };

    fetchShipmentData();
  }, []);

  const handleFieldChange = (field: keyof ShipmentData, value: string) => {
    if (fields) {
      setFields((prev) => ({ ...prev!, [field]: value }));
    }
  };

  if (!fields) {
    return <div>Loading...</div>; // Show a loading state while data is being fetched
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full px-8 pt-4">
      <NavigationBar onNavigate={(url) => (window.location.href = url)} />
      <div className="flex flex-col items-start w-full max-w-6xl mt-4">
        <h1 className="text-4xl font-extrabold mb-6 text-left">Review & Confirm</h1>
        <div className="grid grid-cols-2 gap-x-4 gap-y-7 w-full">
          {/* Consignor (Shipper) */}
          <div className="bg-white p-6 shadow-lg rounded-lg w-full">
            <h2 className="text-lg font-bold mb-4">Consignor (Shipper)</h2>
            <div className="grid grid-cols-2 gap-4">
              {["consignorName", "consignorEmail", "consignorPhone", "consignorAddress", "consignorCountry", "consignorCity"].map((field) => (
                <div key={field} className="flex justify-between items-center">
                  <div>
                    <h3 className="text-md font-medium capitalize">{field.replace("consignor", "").replace(/([A-Z])/g, " $1")}</h3>
                    {editableField === field ? (
                      <input
                        type="text"
                        value={fields[field as keyof ShipmentData]?.toString() || ""}
                        onChange={(e) => handleFieldChange(field as keyof ShipmentData, e.target.value)}
                        className="border rounded p-3 w-full"
                      />
                    ) : (
                      <p className="text-gray-700">{fields[field as keyof ShipmentData]}</p>
                    )}
                  </div>
                  <button
                    className="text-black hover:text-white bg-transparent hover:bg-black rounded-full p-2 cursor-pointer transition-all"
                    onClick={() => setEditableField(field as keyof ShipmentData)}
                  >
                    ✎
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Consignee (Recipient) */}
          <div className="bg-white p-6 shadow-lg rounded-lg w-full">
            <h2 className="text-lg font-bold mb-4">Consignee (Recipient)</h2>
            <div className="grid grid-cols-2 gap-4">
              {["consigneeName", "consigneeEmail", "consigneePhone", "consigneeAddress", "consigneeCountry", "consigneeCity"].map((field) => (
                <div key={field} className="flex justify-between items-center">
                  <div>
                    <h3 className="text-md font-medium capitalize">{field.replace("consignee", "").replace(/([A-Z])/g, " $1")}</h3>
                    {editableField === field ? (
                      <input
                        type="text"
                        value={fields[field as keyof ShipmentData]?.toString() || ""}
                        onChange={(e) => handleFieldChange(field as keyof ShipmentData, e.target.value)}
                        className="border rounded p-3 w-full"
                      />
                    ) : (
                      <p className="text-gray-700">{fields[field as keyof ShipmentData]}</p>
                    )}
                  </div>
                  <button
                    className="text-black hover:text-white bg-transparent hover:bg-black rounded-full p-2 cursor-pointer transition-all"
                    onClick={() => setEditableField(field as keyof ShipmentData)}
                  >
                    ✎
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Origin (From) */}
          <div className="bg-white p-6 shadow-lg rounded-lg w-full">
            <h2 className="text-lg font-bold mb-4">Origin (From)</h2>
            <div className="grid grid-cols-2 gap-4">
              {["originCountry", "originCity", "originStreet"].map((field) => (
                <div key={field} className="flex justify-between items-center">
                  <div>
                    <h3 className="text-md font-medium capitalize">{field.replace("origin", "").replace(/([A-Z])/g, " $1")}</h3>
                    {editableField === field ? (
                      <input
                        type="text"
                        value={fields[field as keyof ShipmentData]?.toString() || ""}
                        onChange={(e) => handleFieldChange(field as keyof ShipmentData, e.target.value)}
                        className="border rounded p-3 w-full"
                      />
                    ) : (
                      <p className="text-gray-700">{fields[field as keyof ShipmentData]}</p>
                    )}
                  </div>
                  <button
                    className="text-black hover:text-white bg-transparent hover:bg-black rounded-full p-2 cursor-pointer transition-all"
                    onClick={() => setEditableField(field as keyof ShipmentData)}
                  >
                    ✎
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Destination (To) */}
          <div className="bg-white p-6 shadow-lg rounded-lg w-full">
            <h2 className="text-lg font-bold mb-4">Destination (To)</h2>
            <div className="grid grid-cols-2 gap-4">
              {["destinationCountry", "destinationCity", "destinationStreet"].map((field) => (
                <div key={field} className="flex justify-between items-center">
                  <div>
                    <h3 className="text-md font-medium capitalize">{field.replace("destination", "").replace(/([A-Z])/g, " $1")}</h3>
                    {editableField === field ? (
                      <input
                        type="text"
                        value={fields[field as keyof ShipmentData]?.toString() || ""}
                        onChange={(e) => handleFieldChange(field as keyof ShipmentData, e.target.value)}
                        className="border rounded p-3 w-full"
                      />
                    ) : (
                      <p className="text-gray-700">{fields[field as keyof ShipmentData]}</p>
                    )}
                  </div>
                  <button
                    className="text-black hover:text-white bg-transparent hover:bg-black rounded-full p-2 cursor-pointer transition-all"
                    onClick={() => setEditableField(field as keyof ShipmentData)}
                  >
                    ✎
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-white p-6 shadow-lg rounded-lg w-full">
            <h2 className="text-lg font-bold mb-4">Additional Information</h2>
            <div className="grid grid-cols-2 gap-4">
              {["containerType", "goodsDescription", "packageType", "numberOfPieces", "dangerousGoods", "shippingDate", "deliveryDate"].map((field) => (
                <div key={field} className="flex justify-between items-center">
                  <div>
                    <h3 className="text-md font-medium capitalize">{field.replace(/([A-Z])/g, " $1")}</h3>
                    {editableField === field ? (
                      <input
                        type="text"
                        value={fields[field as keyof ShipmentData]?.toString() || ""}
                        onChange={(e) => handleFieldChange(field as keyof ShipmentData, e.target.value)}
                        className="border rounded p-3 w-full"
                      />
                    ) : (
                      <p className="text-gray-700">{fields[field as keyof ShipmentData]}</p>
                    )}
                  </div>
                  <button
                    className="text-black hover:text-white bg-transparent hover:bg-black rounded-full p-2 cursor-pointer transition-all"
                    onClick={() => setEditableField(field as keyof ShipmentData)}
                  >
                    ✎
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Shipment Type */}
          <div className="bg-white p-6 shadow-lg rounded-lg flex justify-between items-center w-full">
            <div>
              <h2 className="text-lg font-bold mb-2">Shipment Type</h2>
              <p className="text-gray-700">
                {fields.shipmentType === "FCL" ? "Full Container Load" : "Less Container Load"}
              </p>
            </div>
            <button
              className="text-black hover:text-white bg-transparent hover:bg-black rounded-full p-2 cursor-pointer transition-all"
              onClick={() => setEditableField("shipmentType")}
            >
              ✎
            </button>
          </div>

          {/* FCL or LCL Selection */}
          {fields.shipmentType === "FCL" && (
            <div className="bg-white p-6 shadow-lg rounded-lg flex justify-between items-center w-full">
              <div>
                <h2 className="text-lg font-bold mb-2">Number of Containers</h2>
                {editableField === "fclSelection" ? (
                  <input
                    type="text"
                    value={fields.fclSelection || ""}
                    onChange={(e) => handleFieldChange("fclSelection", e.target.value)}
                    className="border rounded p-3 w-full"
                  />
                ) : (
                  <p className="text-gray-700">{fields.fclSelection}</p>
                )}
              </div>
              <button
                className="text-black hover:text-white bg-transparent hover:bg-black rounded-full p-2 cursor-pointer transition-all"
                onClick={() => setEditableField("fclSelection")}
              >
                ✎
              </button>
            </div>
          )}
          {fields.shipmentType === "LCL" && (
            <div className="bg-white p-6 shadow-lg rounded-lg flex justify-between items-center w-full">
              <div>
                <h2 className="text-lg font-bold mb-2">Number of Packages</h2>
                {editableField === "lclSelection" ? (
                  <input
                    type="text"
                    value={fields.lclSelection || ""}
                    onChange={(e) => handleFieldChange("lclSelection", e.target.value)}
                    className="border rounded p-3 w-full"
                  />
                ) : (
                  <p className="text-gray-700">{fields.lclSelection}</p>
                )}
              </div>
              <button
                className="text-black hover:text-white bg-transparent hover:bg-black rounded-full p-2 cursor-pointer transition-all"
                onClick={() => setEditableField("lclSelection")}
              >
                ✎
              </button>
            </div>
          )}

          {/* Size & Weight Details */}
          <div className="bg-white p-6 shadow-lg rounded-lg w-full">
            <h2 className="text-lg font-bold mb-4">Size & Weight Details</h2>
            <div className="grid grid-cols-2 gap-4">
              {["weight", "height", "length", "width"].map((field) => (
                <div key={field} className="flex justify-between items-center">
                  <div>
                    <h3 className="text-md font-medium capitalize">{field}</h3>
                    {editableField === field ? (
                      <input
                        type="text"
                        value={fields[field as keyof ShipmentData]?.toString() || ""}
                        onChange={(e) => handleFieldChange(field as keyof ShipmentData, e.target.value)}
                        className="border rounded p-3 w-full"
                      />
                    ) : (
                      <p className="text-gray-700">{fields[field as keyof ShipmentData]}</p>
                    )}
                  </div>
                  <button
                    className="text-black hover:text-white bg-transparent hover:bg-black rounded-full p-2 cursor-pointer transition-all"
                    onClick={() => setEditableField(field as keyof ShipmentData)}
                  >
                    ✎
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Fragile Item */}
          {fields.isFragile && (
            <div className="bg-white p-6 shadow-lg rounded-lg w-full">
              <h2 className="text-lg font-bold mb-4">Fragile Item</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-md font-medium">Category</h3>
                    {editableField === "fragileCategory" ? (
                      <input
                        type="text"
                        value={fields.fragileCategory || ""}
                        onChange={(e) => handleFieldChange("fragileCategory", e.target.value)}
                        className="border rounded p-3 w-full"
                      />
                    ) : (
                      <p className="text-gray-700">{fields.fragileCategory}</p>
                    )}
                  </div>
                  <button
                    className="text-black hover:text-white bg-transparent hover:bg-black rounded-full p-2 cursor-pointer transition-all"
                    onClick={() => setEditableField("fragileCategory")}
                  >
                    ✎
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-md font-medium">Subcategory</h3>
                    {editableField === "fragileSubCategory" ? (
                      <input
                        type="text"
                        value={fields.fragileSubCategory || ""}
                        onChange={(e) => handleFieldChange("fragileSubCategory", e.target.value)}
                        className="border rounded p-3 w-full"
                      />
                    ) : (
                      <p className="text-gray-700">{fields.fragileSubCategory}</p>
                    )}
                  </div>
                  <button
                    className="text-black hover:text-white bg-transparent hover:bg-black rounded-full p-2 cursor-pointer transition-all"
                    onClick={() => setEditableField("fragileSubCategory")}
                  >
                    ✎
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Delivery Option */}
          <div className="bg-white p-6 shadow-lg rounded-lg flex justify-between items-center w-full">
            <div>
              <h2 className="text-lg font-bold mb-2">Delivery Option</h2>
              {editableField === "deliveryOption" ? (
                <select
                  value={fields.deliveryOption || ""}
                  onChange={(e) => handleFieldChange("deliveryOption", e.target.value)}
                  className="border rounded p-3 w-full"
                >
                  <option value="pickup">Pick Up</option>
                  <option value="deliver">Deliver</option>
                </select>
              ) : (
                <p className="text-gray-700">
                  {fields.deliveryOption === "pickup" ? "Pick Up" : "Deliver"}
                </p>
              )}
            </div>
            <button
              className="text-black hover:text-white bg-transparent hover:bg-black rounded-full p-2 cursor-pointer transition-all"
              onClick={() => setEditableField("deliveryOption")}
            >
              ✎
            </button>
          </div>

          {/* Delivery Date */}
          <div className="bg-white p-6 shadow-lg rounded-lg flex justify-between items-center w-full">
            <div>
              <h2 className="text-lg font-bold mb-2">Delivery Date</h2>
              {editableField === "deliveryDate" ? (
                <input
                  type="date"
                  value={fields.deliveryDate || ""}
                  onChange={(e) => handleFieldChange("deliveryDate", e.target.value)}
                  className="border rounded p-3 w-full"
                />
              ) : (
                <p className="text-gray-700">{fields.deliveryDate}</p>
              )}
            </div>
            <button
              className="text-black hover:text-white bg-transparent hover:bg-black rounded-full p-2 cursor-pointer transition-all"
              onClick={() => setEditableField("deliveryDate")}
            >
              ✎
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
