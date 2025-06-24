"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import NavigationBar from "../NavigationBar";
import countryCityData from "../../../../../utils/countryCityData";
import { FaEdit } from "react-icons/fa";
import { supabase } from "../../../../../utils/supabaseClient";

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
  const editRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchShipment = async () => {
      const { data, error } = await supabase.from("shipments").select("*").eq("id", id).single();
      if (error) setError(error.message);
      setFields(data || {});
      setLoading(false);
    };
    fetchShipment();
  }, [id]);

  // Click outside to close edit mode
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (editRef.current && !editRef.current.contains(event.target as Node)) {
        setIsEditing({} as Record<keyof ShipmentData, boolean>);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  // Hilfsfunktion: Gibt zurück, ob ein Feld editierbar ist (wie im Original)
  const isFieldEditable = (field: keyof ShipmentData): boolean => {
    // Felder, die im Original NICHT editierbar sind:
    const nonEditable: (keyof ShipmentData)[] = [
      "consignorCountry", "consigneeCountry", "originCountry", "destinationCountry"
    ];
    return !nonEditable.includes(field);
  };

  // renderField angepasst: editable-Flag wie im Original
  const renderField = (label: string, field: keyof ShipmentData, editable: boolean = isFieldEditable(field)) => (
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

  // renderFieldWithDropdown angepasst: editable-Flag wie im Original
  const renderFieldWithDropdown = (
    label: string,
    field: keyof ShipmentData,
    countryField: keyof ShipmentData,
    editable: boolean = isFieldEditable(field)
  ) => {
    const country = fields[countryField] as string;
    const cities = countryCityData[country] || [];
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

  // --- ab hier: 1:1 Kopie der Render-Logik aus dem Original für die späteren Boxen ---

  // --- Shipment Type & Details ---
  const renderShipmentType = () => {
    const isFCL = fields.shipmentType === "FCL";
    const numberLabel = isFCL ? "Number of Containers" : `Number of ${fields.packageType ? fields.packageType.charAt(0).toUpperCase() + fields.packageType.slice(1) : "Packages"}`;
    const numberValue = isFCL ? fields.fclSelection : fields.lclSelection;

    return (
      <div className="">
        <h2 className="text-lg font-bold mb-4">Shipment Type & Details</h2>
        <p className="text-gray-700 font-medium mb-4">{fields.shipmentType}</p>
        <div className="mt-1">
          <h3 className="text-md font-bold">{numberLabel}:</h3>
          <p className="text-gray-700">{numberValue || "N/A"}</p>
        </div>
        {isFCL ? (
          <div className="mt-1">
            <h3 className="text-md font-bold">Number of Containers:</h3>
            {isEditing["fclSelection"] ? (
              <input
                type="text"
                value={fields.fclSelection || ""}
                onChange={(e) => handleInputChange("fclSelection", e.target.value)}
                className="border border-gray-300 rounded px-2 py-1"
              />
            ) : (
              <p className="text-gray-700">{fields.fclSelection || "N/A"}</p>
            )}
          </div>
        ) : (
          <div className="mt-1">
            <h3 className="text-md font-bold">Number of Packages:</h3>
            {isEditing["lclSelection"] ? (
              <input
                type="text"
                value={fields.lclSelection || ""}
                onChange={(e) => handleInputChange("lclSelection", e.target.value)}
                className="border border-gray-300 rounded px-2 py-1"
              />
            ) : (
              <p className="text-gray-700">{fields.lclSelection || "N/A"}</p>
            )}
          </div>
        )}
        <div className="mt-1">
          <h3 className="text-md font-bold">Number of Pieces:</h3>
          {isEditing["numberOfPieces"] ? (
            <input
              type="text"
              value={fields.numberOfPieces || ""}
              onChange={(e) => handleInputChange("numberOfPieces", e.target.value)}
              className="border border-gray-300 rounded px-2 py-1"
            />
          ) : (
            <p className="text-gray-700">{fields.numberOfPieces || "N/A"}</p>
          )}
        </div>
        {renderField("Description of Goods", "goodsDescription")}
      </div>
    );
  };

  // --- Size & Weight Details ---
  const renderSizeAndWeightDetails = () => {
    const isLCL = fields.shipmentType === "LCL";
    return (
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-lg font-bold mb-3">Size & Weight Details</h2>
        <div className="text-gray-700">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-md font-bold">Weight (in kg):</h3>
              {isEditing["weight"] ? (
                <input
                  type="text"
                  value={fields.weight || ""}
                  onChange={(e) => handleInputChange("weight", e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1"
                />
              ) : (
                <p className="text-gray-700">{fields.weight || "N/A"}</p>
              )}
            </div>
            {!isEditing["weight"] && (
              <div
                className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black cursor-pointer transition-all duration-[1250ms] hover:bg-black hover:text-white"
                onClick={() => handleEditClick("weight")}
              >
                <FaEdit />
              </div>
            )}
            {isEditing["weight"] && (
              <button
                className="ml-2 text-sm text-white bg-black px-2 py-1 rounded cursor-pointer transition-all duration-[1250ms] hover:bg-white hover:text-black"
                onClick={() => handleSave("weight")}
              >
                Save
              </button>
            )}
          </div>
          {isLCL && (
            <p className="text-black font-bold text-md mt-1 mb-1">Sizes per Piece</p>
          )}
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-md font-bold">Height (in cm):</h3>
              {isEditing["height"] ? (
                <input
                  type="text"
                  value={fields.height || ""}
                  onChange={(e) => handleInputChange("height", e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1"
                />
              ) : (
                <p className="text-gray-700">{fields.height || "N/A"}</p>
              )}
            </div>
            {!isEditing["height"] && (
              <div
                className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black cursor-pointer transition-all duration-[1250ms] hover:bg-black hover:text-white"
                onClick={() => handleEditClick("height")}
              >
                <FaEdit />
              </div>
            )}
            {isEditing["height"] && (
              <button
                className="ml-2 text-sm text-white bg-black px-2 py-1 rounded cursor-pointer transition-all duration-[1250ms] hover:bg-white hover:text-black"
                onClick={() => handleSave("height")}
              >
                Save
              </button>
            )}
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-md font-bold">Length (in cm):</h3>
              {isEditing["length"] ? (
                <input
                  type="text"
                  value={fields.length || ""}
                  onChange={(e) => handleInputChange("length", e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1"
                />
              ) : (
                <p className="text-gray-700">{fields.length || "N/A"}</p>
              )}
            </div>
            {!isEditing["length"] && (
              <div
                className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black cursor-pointer transition-all duration-[1250ms] hover:bg-black hover:text-white"
                onClick={() => handleEditClick("length")}
              >
                <FaEdit />
              </div>
            )}
            {isEditing["length"] && (
              <button
                className="ml-2 text-sm text-white bg-black px-2 py-1 rounded cursor-pointer transition-all duration-[1250ms] hover:bg-white hover:text-black"
                onClick={() => handleSave("length")}
              >
                Save
              </button>
            )}
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-md font-bold">Width (in cm):</h3>
              {isEditing["width"] ? (
                <input
                  type="text"
                  value={fields.width || ""}
                  onChange={(e) => handleInputChange("width", e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1"
                />
              ) : (
                <p className="text-gray-700">{fields.width || "N/A"}</p>
              )}
            </div>
            {!isEditing["width"] && (
              <div
                className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black cursor-pointer transition-all duration-[1250ms] hover:bg-black hover:text-white"
                onClick={() => handleEditClick("width")}
              >
                <FaEdit />
              </div>
            )}
            {isEditing["width"] && (
              <button
                className="ml-2 text-sm text-white bg-black px-2 py-1 rounded cursor-pointer transition-all duration-[1250ms] hover:bg-white hover:text-black"
                onClick={() => handleSave("width")}
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // --- Fragile Item ---
  const renderFragileItem = () => (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-lg font-bold mb-3">Fragile Item</h2>
      <div className="mb-1">
        <h3 className="text-md font-bold">Is Fragile:</h3>
        <p className="text-gray-700">{fields.isFragile ? "Yes" : "No"}</p>
      </div>
      <div className="mb-1">
        <h3 className="text-md font-bold">Category:</h3>
        <p className="text-gray-700">{fields.fragileCategory || "N/A"}</p>
      </div>
      <div className="mb-1">
        <h3 className="text-md font-bold">Subcategory:</h3>
        <p className="text-gray-700">{fields.fragileSubCategory || "N/A"}</p>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div>
          <h3 className="text-md font-bold">Required Insurance:</h3>
          {fields.isFragile ? (
            isEditing["extraProtection"] ? (
              <select
                value={fields.extraProtection ? "Yes" : "No"}
                onChange={(e) => handleInputChange("extraProtection", e.target.value === "Yes" ? "true" : "false")}
                className="p-2 border rounded bg-gray-100"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            ) : (
              <p className="text-gray-700">{fields.extraProtection ? "Yes" : "No"}</p>
            )
          ) : (
            <p className="text-gray-700">N/A</p>
          )}
        </div>
        {fields.isFragile && (
          <div>
            {!isEditing["extraProtection"] && (
              <div
                className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black cursor-pointer transition-all duration-[1250ms] hover:bg-black hover:text-white"
                onClick={() => handleEditClick("extraProtection")}
              >
                <FaEdit />
              </div>
            )}
            {isEditing["extraProtection"] && (
              <button
                className="ml-2 text-sm text-white bg-black px-2 py-1 rounded cursor-pointer transition-all duration-[1250ms] hover:bg-white hover:text-black"
                onClick={() => handleSave("extraProtection")}
              >
                Save
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );

  // --- Additional Protection ---
  const renderAdditionalProtection = () => (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-lg font-bold mb-4">Additional Protection</h2>
      <div className="mb-4">
        <h3 className="text-md font-bold">Requested:</h3>
        <p className="text-gray-700">{fields.extraProtection ? "Yes" : "No"}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-md font-bold">Selected Protections:</h3>
        <p className="text-gray-700">{fields.selectedProtections?.join(", ") || "N/A"}</p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div>
          <h3 className="text-md font-bold">Dangerous Goods:</h3>
          {isEditing["dangerousGoods"] ? (
            <select
              value={fields.dangerousGoods || "No"}
              onChange={(e) => handleInputChange("dangerousGoods", e.target.value)}
              className="border border-gray-300 rounded px-2 py-1"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          ) : (
            <p className="text-gray-700">{fields.dangerousGoods || "No"}</p>
          )}
        </div>
        {!isEditing["dangerousGoods"] && (
          <div
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black cursor-pointer transition-all duration-[1250ms] hover:bg-black hover:text-white"
            onClick={() => handleEditClick("dangerousGoods")}
          >
            <FaEdit />
          </div>
        )}
        {isEditing["dangerousGoods"] && (
          <button
            className="ml-2 text-sm text-white bg-black px-2 py-1 rounded cursor-pointer transition-all duration-[1250ms] hover:bg-white hover:text-black"
            onClick={() => handleSave("dangerousGoods")}
          >
            Save
          </button>
        )}
      </div>
    </div>
  );

  // --- Shipping Details ---
  const renderShippingDetails = () => (
    <div className="">
      <h2 className="text-lg font-bold mb-3">Shipping Date Details</h2>
      <div className="mb-1">
        <h3 className="text-md font-bold">Pick Up or Deliver:</h3>
        <p className="text-gray-700">{fields.deliveryOption || "N/A"}</p>
      </div>
      <div className="mb-1">
        <h3 className="text-md font-bold">Shipping Date:</h3>
        <p className="text-gray-700">{fields.shippingDate || "N/A"}</p>
      </div>
      <div className="mb-1">
        <h3 className="text-md font-bold">Delivery Date:</h3>
        <p className="text-gray-700">{fields.deliveryDate || "N/A"}</p>
      </div>
    </div>
  );

  // --- Confirm Button ---
  const renderConfirmButton = () => (
    <div className="flex justify-end items-center mt-8">
      <button
        className="px-6 py-3 bg-black text-white rounded-full transition-all duration-[1250ms] hover:bg-transparent hover:text-black cursor-pointer"
        onClick={handleConfirm}
      >
        Save
      </button>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full px-8 pt-4">
      <NavigationBar onNavigate={(url) => router.push(url)} />
      <div className="flex flex-col items-start w-full max-w-6xl mt-12 px-8" ref={editRef}>
        <h1 className="text-4xl font-extrabold mb-6 self-start">Edit Shipment</h1>
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
