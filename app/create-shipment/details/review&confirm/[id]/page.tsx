"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import NavigationBar from "../NavigationBar";
import countryCityData from "../../../../../utils/countryCityData";
import { FaEdit } from "react-icons/fa";
import { supabase } from "../../../../../utils/supabaseClient";

interface ShipmentData {
  id: string;
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
  selectedProtections: string[];
  numberOfPackages?: string;
}

export default function ReviewAndConfirmIdPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params as { id: string };
  const [fields, setFields] = useState<Partial<ShipmentData>>({});
  const [isEditing, setIsEditing] = useState<Record<keyof ShipmentData, boolean>>({} as Record<keyof ShipmentData, boolean>);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShipment = async () => {
      const { data, error } = await supabase.from("shipments").select("*").eq("id", id).single();
      if (error) setError(error.message);
      setFields(data || {});
      setLoading(false);
    };
    fetchShipment();
  }, [id]);

  const handleEditClick = (field: keyof ShipmentData) => {
    setIsEditing((prev) => {
      const updatedEditing = Object.keys(fields).reduce((acc, key) => {
        const typedKey = key as keyof ShipmentData;
        acc[typedKey] = typedKey === field;
        return acc;
      }, {} as Record<keyof ShipmentData, boolean>);
      return updatedEditing;
    });
  };

  const handleInputChange = (field: keyof ShipmentData, value: string | boolean | string[]) => {
    // Restrict input to letters for consignorName and consigneeName
    if (field === "consignorName" || field === "consigneeName") {
      if (typeof value === "string" && /^[a-zA-Z\s]*$/.test(value)) {
        setFields((prev) => ({ ...prev, [field]: value }));
      }
    } 
    // Restrict input to numbers for numeric fields and phone numbers
    else if (["numberOfPieces", "weight", "height", "length", "width", "consignorPhone", "consigneePhone"].includes(field)) {
      if (typeof value === "string" && /^\d*$/.test(value)) {
        setFields((prev) => ({ ...prev, [field]: value }));
      }
    } 
    // Restrict "Number of Packages" to numbers with max value of 100 and no leading zero
    else if (field === "numberOfPackages") {
      if (typeof value === "string" && /^\d*$/.test(value) && (value === "" || (parseInt(value) > 0 && parseInt(value) <= 100))) {
        setFields((prev) => ({ ...prev, [field]: value }));
      }
    } 
    else {
      setFields((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSave = (field: keyof ShipmentData) => {
    setIsEditing((prev) => ({ ...prev, [field]: false }));
  };

  const handleConfirm = async () => {
    try {
      const { error } = await supabase.from("shipments").update(fields).eq("id", id);
      if (error) throw error;
      router.push("/databank");
    } catch (error) {
      setError('Fehler beim Speichern in der Datenbank!');
    }
  };

  if (loading) return <div className="p-8">Lade Daten...</div>;
  if (error) return <div className="p-8 text-red-500">Fehler: {error}</div>;
  if (!fields || Object.keys(fields).length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-bold text-gray-700">No data available to display.</p>
      </div>
    );
  }

  const renderField = (label: string, field: keyof ShipmentData, isDropdown = true) => {
    const isEditingField = isEditing[field];
    const fieldValue = fields[field] as string;

    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        {isEditingField ? (
          <input
            type="text"
            value={fieldValue}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md"
          />
        ) : (
          <div className="flex items-center justify-between p-2 border border-gray-300 rounded-md">
            <span className="text-gray-700">{fieldValue}</span>
            <button
              onClick={() => handleEditClick(field)}
              className="text-blue-500 hover:underline"
            >
              <FaEdit className="inline-block mr-1" />
              Edit
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderFieldWithDropdown = (label: string, field: keyof ShipmentData, countryField: keyof ShipmentData) => {
    const isEditingField = isEditing[field];
    const fieldValue = fields[field] as string;
    const countryValue = fields[countryField] as string;

    // Get cities based on selected country
    const cities = countryValue ? countryCityData[countryValue] : [];

    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        {isEditingField ? (
          <>
            <select
              value={countryValue}
              onChange={(e) => handleInputChange(countryField, e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md mb-2"
            >
              <option value="">Select Country</option>
              {Object.keys(countryCityData).map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <select
              value={fieldValue}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </>
        ) : (
          <div className="flex items-center justify-between p-2 border border-gray-300 rounded-md">
            <span className="text-gray-700">{fieldValue}</span>
            <button
              onClick={() => handleEditClick(field)}
              className="text-blue-500 hover:underline"
            >
              <FaEdit className="inline-block mr-1" />
              Edit
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderShipmentType = () => {
    const isEditingField = isEditing.shipmentType;
    const fieldValue = fields.shipmentType as string;

    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Shipment Type</label>
        {isEditingField ? (
          <select
            value={fieldValue}
            onChange={(e) => handleInputChange("shipmentType", e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Shipment Type</option>
            <option value="FCL">FCL</option>
            <option value="LCL">LCL</option>
          </select>
        ) : (
          <div className="flex items-center justify-between p-2 border border-gray-300 rounded-md">
            <span className="text-gray-700">{fieldValue}</span>
            <button
              onClick={() => handleEditClick("shipmentType")}
              className="text-blue-500 hover:underline"
            >
              <FaEdit className="inline-block mr-1" />
              Edit
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderSizeAndWeightDetails = () => {
    const isEditingField = isEditing.weight;
    const weightValue = fields.weight as string;
    const heightValue = fields.height as string;
    const lengthValue = fields.length as string;
    const widthValue = fields.width as string;

    return (
      <div className="bg-white p-6 shadow-lg rounded-lg mb-4">
        <h2 className="text-lg font-bold mb-4">Size & Weight Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
            {isEditingField ? (
              <input
                type="text"
                value={weightValue}
                onChange={(e) => handleInputChange("weight", e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md"
              />
            ) : (
              <div className="flex items-center justify-between p-2 border border-gray-300 rounded-md">
                <span className="text-gray-700">{weightValue}</span>
                <button
                  onClick={() => handleEditClick("weight")}
                  className="text-blue-500 hover:underline"
                >
                  <FaEdit className="inline-block mr-1" />
                  Edit
                </button>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dimensions (L x W x H)</label>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                value={lengthValue}
                onChange={(e) => handleInputChange("length", e.target.value)}
                placeholder="Length"
                className="block w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                value={widthValue}
                onChange={(e) => handleInputChange("width", e.target.value)}
                placeholder="Width"
                className="block w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                value={heightValue}
                onChange={(e) => handleInputChange("height", e.target.value)}
                placeholder="Height"
                className="block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderFragileItem = () => {
    const isEditingField = isEditing.isFragile;
    const fieldValue = fields.isFragile as boolean;

    return (
      <div className="bg-white p-6 shadow-lg rounded-lg mb-4">
        <h2 className="text-lg font-bold mb-4">Fragile Item</h2>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={fieldValue}
            onChange={(e) => handleInputChange("isFragile", e.target.checked)}
            className="mr-2"
          />
          <label className="text-gray-700">Is this shipment fragile?</label>
        </div>
        {fieldValue && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Fragile Category</label>
            <input
              type="text"
              value={fields.fragileCategory as string}
              onChange={(e) => handleInputChange("fragileCategory", e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
            <label className="block text-sm font-medium text-gray-700 mb-1 mt-2">Fragile Sub-Category</label>
            <input
              type="text"
              value={fields.fragileSubCategory as string}
              onChange={(e) => handleInputChange("fragileSubCategory", e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        )}
      </div>
    );
  };

  const renderShippingDetails = () => {
    const isEditingField = isEditing.shippingDate;
    const shippingDateValue = fields.shippingDate as string;
    const deliveryDateValue = fields.deliveryDate as string;

    return (
      <div className="bg-white p-6 shadow-lg rounded-lg mb-4">
        <h2 className="text-lg font-bold mb-4">Shipping Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Date</label>
            {isEditingField ? (
              <input
                type="date"
                value={shippingDateValue}
                onChange={(e) => handleInputChange("shippingDate", e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md"
              />
            ) : (
              <div className="flex items-center justify-between p-2 border border-gray-300 rounded-md">
                <span className="text-gray-700">{shippingDateValue}</span>
                <button
                  onClick={() => handleEditClick("shippingDate")}
                  className="text-blue-500 hover:underline"
                >
                  <FaEdit className="inline-block mr-1" />
                  Edit
                </button>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Date</label>
            <input
              type="date"
              value={deliveryDateValue}
              onChange={(e) => handleInputChange("deliveryDate", e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>
    );
  };

  const renderAdditionalProtection = () => {
    const isEditingField = isEditing.extraProtection;
    const fieldValue = fields.extraProtection as boolean;

    return (
      <div className="bg-white p-6 shadow-lg rounded-lg mb-4">
        <h2 className="text-lg font-bold mb-4">Additional Protection</h2>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={fieldValue}
            onChange={(e) => handleInputChange("extraProtection", e.target.checked)}
            className="mr-2"
          />
          <label className="text-gray-700">Do you need additional protection for this shipment?</label>
        </div>
        {fieldValue && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Protection Type</label>
            <select
              value={fields.selectedProtections?.[0] as string}
              onChange={(e) => handleInputChange("selectedProtections", [e.target.value])}
              className="block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Protection Type</option>
              <option value="Insurance">Insurance</option>
              <option value="Packing">Packing</option>
              <option value="Both">Both</option>
            </select>
          </div>
        )}
      </div>
    );
  };

  const renderConfirmButton = () => {
    return (
      <button
        onClick={handleConfirm}
        className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors"
      >
        Confirm Shipment
      </button>
    );
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full px-8 pt-4">
      <NavigationBar onNavigate={(url) => router.push(url)} />
      <div className="flex flex-col items-start w-full max-w-6xl mt-12 px-8">
        <h1 className="text-4xl font-extrabold mb-6 self-start">Review & Confirm</h1>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 w-full mt-2">
          {/* Consignor (Shipper) */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-lg font-bold mb-4">Consignor (Shipper)</h2>
            {renderField("Full Name", "consignorName")}
            {renderField("Email", "consignorEmail")}
            {renderField("Phone", "consignorPhone")}
            {renderField("Address", "consignorAddress")}
            {renderField("Country", "consignorCountry", false)}
            {renderFieldWithDropdown("City", "consignorCity", "consignorCountry")}
          </div>

          {/* Consignee (Recipient) */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-lg font-bold mb-4">Consignee (Recipient)</h2>
            {renderField("Full Name", "consigneeName")}
            {renderField("Email", "consigneeEmail")}
            {renderField("Phone", "consigneePhone")}
            {renderField("Address", "consigneeAddress")}
            {renderField("Country", "consigneeCountry", false)}
            {renderFieldWithDropdown("City", "consigneeCity", "consigneeCountry")}
          </div>

          {/* Origin (From) */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-lg font-bold mb-4">Origin (From)</h2>
            {renderField("Country", "originCountry", false)}
            {renderFieldWithDropdown("City", "originCity", "originCountry")}
            {renderField("Address", "originStreet")}
          </div>

          {/* Destination (To) */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-lg font-bold mb-4">Destination (To)</h2>
            {renderField("Country", "destinationCountry", false)}
            {renderFieldWithDropdown("City", "destinationCity", "destinationCountry")}
            {renderField("Address", "destinationStreet")}
          </div>

          {/* Shipment Type & Details */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
          {renderShipmentType()}
          </div>

          {/* Size & Weight Details */}
          {renderSizeAndWeightDetails()}

          {/* Fragile Item */}
          {renderFragileItem()}

          {/* Shipping Details */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            {renderShippingDetails()}
          </div>

          <div className="col-span-1">
            {/* Additional Protection */}
            {renderAdditionalProtection()}
          </div>

          <div className="col-span-1 flex justify-end items-center mt-8">
            {/* Confirm Button */}
            {renderConfirmButton()}
          </div>
        </div>
      </div>
    </div>
  );
}
