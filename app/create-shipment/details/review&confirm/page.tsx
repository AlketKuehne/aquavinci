"use client"; // This component is a client component

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavigationBar from "./NavigationBar";
import databank from "../../../../utils/databank"; // Simplified import path
import countryCityData from "../../../../utils/countryCityData"; // Import country-city mapping
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
  selectedProtections: string[]; // Added missing property
  numberOfPackages?: string; // Added missing property
}

export default function ReviewAndConfirmPage() {
  const router = useRouter();
  const [fields, setFields] = useState<Partial<ShipmentData>>({});
  const [isEditing, setIsEditing] = useState<Record<keyof ShipmentData, boolean>>(
    {} as Record<keyof ShipmentData, boolean>
  ); // Correctly initialize with type assertion

  useEffect(() => {
    const data = databank.getData(); // Fetch data from databank
    if (data && data.length > 0) {
      setFields(data[data.length - 1]); // Use the latest entry
    } else {
      setFields({}); // Ensure fields is initialized even if no data exists
    }
  }, []);

  const handleEditClick = (field: keyof ShipmentData) => {
    // Reset all other fields to non-editing state
    setIsEditing(() =>
      Object.keys(fields).reduce((acc, key) => {
        acc[key as keyof ShipmentData] = key === field;
        return acc;
      }, {} as Record<keyof ShipmentData, boolean>)
    );
  };

  const handleInputChange = (field: keyof ShipmentData, value: string) => {
    // Restrict input to letters for consignorName and consigneeName
    if (field === "consignorName" || field === "consigneeName") {
      if (/^[a-zA-Z\s]*$/.test(value)) {
        setFields((prev) => ({ ...prev, [field]: value }));
      }
    } 
    // Restrict input to numbers for numberOfPieces
    else if (field === "numberOfPieces") {
      if (/^\d*$/.test(value)) {
        setFields((prev) => ({ ...prev, [field]: value }));
      }
    } 
    else {
      setFields((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSave = (field: keyof ShipmentData) => {
    setIsEditing((prev) => ({ ...prev, [field]: false }));
    databank.updateData({ [field]: fields[field] }); // Save updated field to databank
  };

  if (!fields || Object.keys(fields).length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-bold text-gray-700">No data available to display.</p>
      </div>
    );
  }

  const renderField = (label: string, field: keyof ShipmentData, editable: boolean = true) => (
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-md font-bold">{label}:</h3>
        {editable && isEditing[field] ? (
          <input
            type="text"
            value={fields[field] as string || ""}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          />
        ) : (
          <p className="text-gray-700">{fields[field] || "N/A"}</p>
        )}
      </div>
      {editable && !isEditing[field] && (
        <div
          className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black cursor-pointer transition-all duration-[1250ms] hover:bg-black hover:text-white"
          onClick={() => handleEditClick(field)}
        >
          <FaEdit />
        </div>
      )}
      {editable && isEditing[field] && (
        <button
          className="ml-2 text-sm text-white bg-black px-2 py-1 rounded cursor-pointer transition-all duration-[1250ms] hover:bg-white hover:text-black"
          onClick={() => handleSave(field)}
        >
          Save
        </button>
      )}
    </div>
  );

  const renderFieldWithDropdown = (
    label: string,
    field: keyof ShipmentData,
    countryField: keyof ShipmentData,
    editable: boolean = true
  ) => {
    const country = fields[countryField] as string; // Get the selected country
    const cities = countryCityData[country] || []; // Get cities for the selected country

    return (
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-md font-bold">{label}:</h3>
          {editable && isEditing[field] ? (
            <select
              value={fields[field] as string || ""}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="border border-gray-300 rounded px-2 py-1"
            >
              <option value="" disabled>
                Select a city
              </option>
              {cities.map((city: string) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          ) : (
            <p className="text-gray-700">{fields[field] || "N/A"}</p>
          )}
        </div>
        {editable && !isEditing[field] && (
          <div
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black cursor-pointer transition-all duration-[1250ms] hover:bg-black hover:text-white"
            onClick={() => handleEditClick(field)}
          >
            <FaEdit />
          </div>
        )}
        {editable && isEditing[field] && (
          <button
            className="ml-2 text-sm text-white bg-black px-2 py-1 rounded cursor-pointer transition-all duration-[1250ms] hover:bg-white hover:text-black"
            onClick={() => handleSave(field)}
          >
          Save
          </button>
        )}
      </div>
    );
  };

  const renderShipmentType = () => {
    const shipmentType = fields.shipmentType === "FCL" ? "Full Container Load" : "Less Container Load";
    const piecesLabel =
      fields.shipmentType === "FCL"
        ? "Number of Pieces (per container)"
        : "Number of Pieces (per package)";
    const packagesLabel =
      fields.shipmentType === "FCL"
        ? "Number of Containers"
        : "Number of Packages";

    return (
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-lg font-bold mb-4">Shipment Type & Details</h2>
        <p className="text-gray-700 font-medium mb-4">{shipmentType}</p> {/* Display shipment type */}
        {renderField("Container or Package Type", "containerType")}
        <div className="mb-4">
          <h3 className="text-md font-bold">{packagesLabel}:</h3> {/* Sub-header in bold */}
          <p className="text-gray-700">{fields.numberOfPackages || "N/A"}</p> {/* Value not bold */}
        </div>
        {renderField(piecesLabel, "numberOfPieces")} {/* Corrected field */}
        {renderField("Description of Goods", "goodsDescription")}
      </div>
    );
  };

  const renderSizeAndWeightDetails = () => {
    return (
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-lg font-bold mb-4">Size & Weight Details</h2>
        {renderField("Weight (in kg)", "weight")} {/* Ensure value is read */}
        {renderField("Height (in m)", "height")} {/* Ensure value is read */}
        {renderField("Length (in m)", "length")} {/* Ensure value is read */}
        {renderField("Width (in m)", "width")} {/* Ensure value is read */}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full px-8 pt-4">
      <NavigationBar onNavigate={(url) => router.push(url)} />
      <div className="flex flex-col items-start w-full max-w-6xl mt-12 px-8">
        <h1 className="text-4xl font-extrabold mb-6 self-start">Review & Confirm</h1>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 w-full mt-4">
          {/* Consignor (Shipper) */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-lg font-bold mb-4">Consignor (Shipper)</h2>
            {renderField("Full Name", "consignorName")}
            {renderField("Email", "consignorEmail")}
            {renderField("Phone", "consignorPhone")}
            {renderField("Address", "consignorAddress")}
            {renderField("Country", "consignorCountry", false)} {/* Non-editable */}
            {renderFieldWithDropdown("City", "consignorCity", "consignorCountry")} {/* Dropdown */}
          </div>

          {/* Consignee (Recipient) */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-lg font-bold mb-4">Consignee (Recipient)</h2>
            {renderField("Full Name", "consigneeName")}
            {renderField("Email", "consigneeEmail")}
            {renderField("Phone", "consigneePhone")}
            {renderField("Address", "consigneeAddress")}
            {renderField("Country", "consigneeCountry", false)} {/* Non-editable */}
            {renderFieldWithDropdown("City", "consigneeCity", "consigneeCountry")} {/* Dropdown */}
          </div>

          {/* Origin (From) */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-lg font-bold mb-4">Origin (From)</h2>
            {renderField("Country", "originCountry", false)} {/* Non-editable */}
            {renderFieldWithDropdown("City", "originCity", "originCountry")} {/* Dropdown */}
            {renderField("Street", "originStreet")} {/* Editable */}
          </div>

          {/* Destination (To) */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-lg font-bold mb-4">Destination (To)</h2>
            {renderField("Country", "destinationCountry", false)} {/* Non-editable */}
            {renderFieldWithDropdown("City", "destinationCity", "destinationCountry")} {/* Dropdown */}
            {renderField("Street", "destinationStreet")} {/* Editable */}
          </div>

          {/* Shipment Type & Details */}
          {renderShipmentType()}

          {/* Size & Weight Details */}
          {renderSizeAndWeightDetails()}

          {/* Fragile Item */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-lg font-bold mb-4">Fragile Item</h2>
            {renderField("Is this a fragile item?", "isFragile", false)} {/* Non-editable */}
            {fields.isFragile && (
              <>
                {renderField("Category", "fragileCategory")}
                {renderField("Subcategory", "fragileSubCategory")}
                {renderField("Do you require insurance for this shipment?", "extraProtection", false)} {/* Non-editable */}
              </>
            )}
          </div>

          {/* Delivery Option */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-lg font-bold mb-4">Delivery Option</h2>
            {renderField("Pick Up or Deliver", "deliveryOption", false)} {/* Non-editable */}
            {renderField("Date (TT.mm.jjjj)", "shippingDate", false)} {/* Non-editable */}
          </div>

          {/* Additional Protection */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-lg font-bold mb-4">Additional Protection</h2>
            {renderField("Request Additional Protection", "extraProtection", false)} {/* Non-editable */}
            {fields.extraProtection && (
              <>
                {renderField("Protection Options", "fragileCategory")} {/* Example field */}
              </>
            )}
          </div>

          {/* Additional Information */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-lg font-bold mb-4">Additional Information</h2>
            {renderField("Dangerous Goods", "dangerousGoods")}
            {renderField("Shipping Date", "shippingDate")}
            {renderField("Delivery Date", "deliveryDate")}
          </div>

          {/* Data from /details/Boxes */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-lg font-bold mb-4">Full Container Load</h2>
            <p className="text-gray-700">Number of Containers: {fields.fclSelection || "N/A"}</p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-lg font-bold mb-4">Less Container Load</h2>
            <p className="text-gray-700">Number of Packages: {fields.lclSelection || "N/A"}</p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-lg font-bold mb-4">Size & Weight Details</h2>
            <p className="text-gray-700">Weight: {fields.weight || "N/A"}</p>
            <p className="text-gray-700">Height: {fields.height || "N/A"}</p>
            <p className="text-gray-700">Length: {fields.length || "N/A"}</p>
            <p className="text-gray-700">Width: {fields.width || "N/A"}</p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-lg font-bold mb-4">Fragile Item</h2>
            <p className="text-gray-700">Is Fragile: {fields.isFragile ? "Yes" : "No"}</p>
            <p className="text-gray-700">Category: {fields.fragileCategory || "N/A"}</p>
            <p className="text-gray-700">Subcategory: {fields.fragileSubCategory || "N/A"}</p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-lg font-bold mb-4">Delivery Option</h2>
            <p className="text-gray-700">Option: {fields.deliveryOption || "N/A"}</p>
            <p className="text-gray-700">Date: {fields.deliveryDate || "N/A"}</p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-lg font-bold mb-4">Additional Protection</h2>
            <p className="text-gray-700">Requested: {fields.extraProtection ? "Yes" : "No"}</p>
            <p className="text-gray-700">
              Selected Protections: {fields.selectedProtections?.join(", ") || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
