"use client";

import { useState } from "react";
import NavigationBar from "./NavigationBar";

export default function ReviewAndConfirmPage() {
  const handleNavigate = (url: string) => {
    window.location.href = url; // Navigate to the specified URL
  };

  const [fields, setFields] = useState({
    shipmentType: "FCL",
    fclSelection: "5",
    lclSelection: "",
    weight: "1000",
    height: "2",
    length: "4",
    width: "3",
    isFragile: true,
    fragileCategory: "Electronic",
    fragileSubCategory: "Laptop",
    extraProtection: true,
    deliveryOption: "deliver",
    deliveryDate: "2023-12-01",
  });

  const [editableField, setEditableField] = useState<string | null>(null);

  const handleFieldChange = (field: string, value: string) => {
    setFields((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex flex-col items-center w-full max-w-6xl mt-4 px-8 pt-12">
      <NavigationBar onNavigate={handleNavigate} />
      <h1 className="text-4xl font-extrabold mb-8 text-center">Review & Confirm</h1>
      <div className="grid grid-cols-2 gap-x-6 gap-y-8 w-full justify-center">
        {/* Shipment Type */}
        <div className="bg-white p-6 shadow-lg rounded-lg flex justify-between items-center">
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
            ✏️
          </button>
        </div>

        {/* FCL or LCL Selection */}
        {fields.shipmentType === "FCL" && (
          <div className="bg-white p-6 shadow-lg rounded-lg flex justify-between items-center">
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
              ✏️
            </button>
          </div>
        )}
        {fields.shipmentType === "LCL" && (
          <div className="bg-white p-6 shadow-lg rounded-lg flex justify-between items-center">
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
              ✏️
            </button>
          </div>
        )}

        {/* Size & Weight Details */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-lg font-bold mb-4">Size & Weight Details</h2>
          <div className="grid grid-cols-2 gap-4">
            {["weight", "height", "length", "width"].map((field) => (
              <div key={field} className="flex justify-between items-center">
                <div>
                  <h3 className="text-md font-medium capitalize">{field}</h3>
                  {editableField === field ? (
                    <input
                      type="text"
                      value={fields[field as keyof typeof fields]?.toString() || ""}
                      onChange={(e) => handleFieldChange(field, e.target.value)}
                      className="border rounded p-3 w-full"
                    />
                  ) : (
                    <p className="text-gray-700">{fields[field as keyof typeof fields]}</p>
                  )}
                </div>
                <button
                  className="text-black hover:text-white bg-transparent hover:bg-black rounded-full p-2 cursor-pointer transition-all"
                  onClick={() => setEditableField(field)}
                >
                  ✏️
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Fragile Item */}
        {fields.isFragile && (
          <div className="bg-white p-6 shadow-lg rounded-lg">
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
                  ✏️
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
                  ✏️
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delivery Option */}
        <div className="bg-white p-6 shadow-lg rounded-lg flex justify-between items-center">
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
            ✏️
          </button>
        </div>

        {/* Delivery Date */}
        <div className="bg-white p-6 shadow-lg rounded-lg flex justify-between items-center">
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
            ✏️
          </button>
        </div>
      </div>
    </div>
  );
}
