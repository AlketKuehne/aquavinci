"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavigationBar from "./NavigationBar";
import databank from "../../../../utils/databank"; // Simplified import path
import { FaEdit } from "react-icons/fa"; // Import edit icon

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
  const router = useRouter();
  const [fields, setFields] = useState<Partial<ShipmentData>>({});
  const [isEditing, setIsEditing] = useState<Record<keyof ShipmentData, boolean>>(
    {} as Record<keyof ShipmentData, boolean>
  ); // Correctly initialize with type assertion

  useEffect(() => {
    const data = databank.getData(); // Fetch data from databank
    setFields(data[data.length - 1] || {}); // Use the latest entry
  }, []);

  const handleEditClick = (field: keyof ShipmentData) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
  };

  const handleInputChange = (field: keyof ShipmentData, value: string) => {
    setFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (field: keyof ShipmentData) => {
    setIsEditing((prev) => ({ ...prev, [field]: false }));
    databank.updateData({ [field]: fields[field] }); // Save updated field to databank
  };

  if (!fields || Object.keys(fields).length === 0) {
    return <div>Loading...</div>;
  }

  const renderField = (label: string, field: keyof ShipmentData) => (
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-md font-bold">{label}:</h3> {/* Add colon and bold styling */}
        {isEditing[field] ? (
          <input
            type="text"
            value={fields[field] as string || ""} // Ensure value is a string
            onChange={(e) => handleInputChange(field, e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          />
        ) : (
          <p className="text-gray-700">{fields[field] || "N/A"}</p>
        )}
      </div>
      {!isEditing[field] && (
        <div
          className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white cursor-pointer transition-all duration-[1250ms] hover:bg-white hover:text-black"
          onClick={() => handleEditClick(field)}
        >
          <FaEdit />
        </div>
      )}
      {isEditing[field] && (
        <button
          className="ml-2 text-sm text-white bg-blue-500 px-2 py-1 rounded"
          onClick={() => handleSave(field)}
        >
          Save
        </button>
      )}
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full px-8 pt-4">
      <NavigationBar onNavigate={(url) => router.push(url)} />
      <div className="flex flex-col items-start w-full max-w-6xl mt-4">
        <h1 className="text-4xl font-extrabold mb-6 text-left">Review & Confirm</h1>
        <div className="grid grid-cols-2 gap-x-4 gap-y-7 w-full">
          {/* Consignor (Shipper) */}
          <div className="bg-white p-6 shadow-lg rounded-lg w-full">
            <h2 className="text-lg font-bold mb-4">Consignor (Shipper)</h2>
            {renderField("Full Name", "consignorName")}
            {renderField("Email", "consignorEmail")}
            {renderField("Phone", "consignorPhone")}
            {renderField("Address", "consignorAddress")}
            {renderField("Country", "consignorCountry")}
            {renderField("City", "consignorCity")}
          </div>

          {/* Consignee (Recipient) */}
          <div className="bg-white p-6 shadow-lg rounded-lg w-full">
            <h2 className="text-lg font-bold mb-4">Consignee (Recipient)</h2>
            {renderField("Full Name", "consigneeName")}
            {renderField("Email", "consigneeEmail")}
            {renderField("Phone", "consigneePhone")}
            {renderField("Address", "consigneeAddress")}
            {renderField("Country", "consigneeCountry")}
            {renderField("City", "consigneeCity")}
          </div>

          {/* Origin (From) */}
          <div className="bg-white p-6 shadow-lg rounded-lg w-full">
            <h2 className="text-lg font-bold mb-4">Origin (From)</h2>
            {renderField("Country", "originCountry")}
            {renderField("City", "originCity")}
            {renderField("Street", "originStreet")}
          </div>

          {/* Destination (To) */}
          <div className="bg-white p-6 shadow-lg rounded-lg w-full">
            <h2 className="text-lg font-bold mb-4">Destination (To)</h2>
            {renderField("Country", "destinationCountry")}
            {renderField("City", "destinationCity")}
            {renderField("Street", "destinationStreet")}
          </div>

          {/* Additional Information */}
          <div className="bg-white p-6 shadow-lg rounded-lg w-full">
            <h2 className="text-lg font-bold mb-4">Additional Information</h2>
            {renderField("Container Type", "containerType")}
            {renderField("Goods Description", "goodsDescription")}
            {renderField("Package Type", "packageType")}
            {renderField("Number of Pieces", "numberOfPieces")}
            {renderField("Dangerous Goods", "dangerousGoods")}
            {renderField("Shipping Date", "shippingDate")}
            {renderField("Delivery Date", "deliveryDate")}
          </div>

          {/* Size & Weight Details */}
          <div className="bg-white p-6 shadow-lg rounded-lg w-full">
            <h2 className="text-lg font-bold mb-4">Size & Weight Details</h2>
            {renderField("Weight", "weight")}
            {renderField("Height", "height")}
            {renderField("Length", "length")}
            {renderField("Width", "width")}
          </div>

          {/* Fragile Item */}
          {fields.isFragile && (
            <div className="bg-white p-6 shadow-lg rounded-lg w-full">
              <h2 className="text-lg font-bold mb-4">Fragile Item</h2>
              {renderField("Category", "fragileCategory")}
              {renderField("Subcategory", "fragileSubCategory")}
            </div>
          )}

          {/* Delivery Option */}
          <div className="bg-white p-6 shadow-lg rounded-lg w-full">
            <h2 className="text-lg font-bold mb-4">Delivery Option</h2>
            {renderField("Option", "deliveryOption")}
          </div>
        </div>
      </div>
    </div>
  );
}
