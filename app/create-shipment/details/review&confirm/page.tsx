"use client"; // This component is a client component x

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavigationBar from "./NavigationBar";
import countryCityData from "../../../../utils/countryCityData";
import { FaEdit } from "react-icons/fa";
import { supabase } from '../../../../utils/supabaseClient';

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
    // Versuche zuerst, die Daten aus 'allShipmentData' zu laden (von /create-shipment)
    const allData = sessionStorage.getItem("allShipmentData");
    const detailsData = sessionStorage.getItem("shipmentDetails");
    const details = detailsData ? JSON.parse(detailsData) : {};
    if (allData) {
      const raw = JSON.parse(allData);
      // Mapping von /create-shipment Feldern auf Review-Felder, ergänze mit Details-Daten
      const mapped = {
        consignorName: raw.consignorFullName || details.consignorName || "",
        consignorEmail: raw.consignorEmail || details.consignorEmail || "",
        consignorPhone: raw.consignorPhone || details.consignorPhone || "",
        consignorAddress: raw.consignorFullAddress || details.consignorAddress || "",
        consignorCountry: raw.consignorCountry || raw.country || details.consignorCountry || "",
        consignorCity: raw.consignorCity || details.consignorCity || "",
        consigneeName: raw.consigneeFullName || details.consigneeName || "",
        consigneeEmail: raw.consigneeEmail || details.consigneeEmail || "",
        consigneePhone: raw.consigneePhone || details.consigneePhone || "",
        consigneeAddress: raw.consigneeFullAddress || details.consigneeAddress || "",
        consigneeCountry: raw.consigneeCountry || details.consigneeCountry || "",
        consigneeCity: raw.consigneeCity || details.consigneeCity || "",
        originCountry: raw.country || details.originCountry || "",
        originCity: raw.originCity || details.originCity || "",
        originStreet: raw.street || details.originStreet || "",
        destinationCountry: raw.destinationCountry || details.destinationCountry || "",
        destinationCity: raw.destinationCity || details.destinationCity || "",
        destinationStreet: raw.destinationStreet || details.destinationStreet || "",
        containerType: raw.containerType || details.containerType || "", // Typ aus create-shipment
        fclSelection: details.fclSelection || raw.fclSelection || "", // Anzahl aus Details bevorzugen
        packageType: raw.packageType || details.packageType || "",
        goodsDescription: raw.description || details.goodsDescription || "",
        numberOfPieces: raw.numberOfPieces || details.numberOfPieces || "1",
        dangerousGoods: (typeof raw.isDangerousGoods === "boolean" ? (raw.isDangerousGoods ? "Yes" : "No") : (details.dangerousGoods || "No")),
        shippingDate: raw.shippingDate || details.shippingDate || "",
        deliveryDate: raw.deliveryDate || details.deliveryDate || "",
        shipmentType: raw.shipmentType || details.shipmentType || "",
        weight: details.weight || raw.weight || "",
        height: details.height || raw.height || "",
        length: details.length || raw.length || "",
        width: details.width || raw.width || "",
        isFragile: typeof details.isFragile === "boolean" ? details.isFragile : (typeof raw.isFragile === "boolean" ? raw.isFragile : false),
        fragileCategory: details.fragileCategory || raw.fragileCategory || "",
        fragileSubCategory: details.fragileSubCategory || raw.fragileSubCategory || "",
        extraProtection: typeof details.extraProtection === "boolean" ? details.extraProtection : (typeof raw.extraProtection === "boolean" ? raw.extraProtection : false),
        deliveryOption: details.deliveryOption || raw.deliveryOption || "",
        selectedProtections: Array.isArray(details.selectedProtections) ? details.selectedProtections : (Array.isArray(raw.selectedProtections) ? raw.selectedProtections : []),
        numberOfPackages: details.numberOfPackages || raw.numberOfPackages || ""
      };
      setFields(mapped);
      return;
    }
    // Fallback: Lade die Daten aus 'shipmentDetails' (von Details-Schritt)
    if (detailsData) {
      setFields(details);
    }
  }, []);

  const handleEditClick = (field: keyof ShipmentData) => {
    // Reset all other fields to non-editing state and revert unsaved changes
    setIsEditing((prev) => {
      const updatedEditing = Object.keys(fields).reduce((acc, key) => {
        const typedKey = key as keyof ShipmentData; // Explicitly type the key
        acc[typedKey] = typedKey === field;
        return acc;
      }, {} as Record<keyof ShipmentData, boolean>);
      return updatedEditing;
    });
  };

  const handleInputChange = (field: keyof ShipmentData, value: string) => {
    // Restrict input to letters for consignorName and consigneeName
    if (field === "consignorName" || field === "consigneeName") {
      if (/^[a-zA-Z\s]*$/.test(value)) {
        setFields((prev) => ({ ...prev, [field]: value }));
      }
    } 
    // Restrict input to numbers for numeric fields and phone numbers
    else if (["numberOfPieces", "weight", "height", "length", "width", "consignorPhone", "consigneePhone"].includes(field)) {
      if (/^\d*$/.test(value)) {
        setFields((prev) => ({ ...prev, [field]: value }));
      }
    } 
    // Restrict "Number of Packages" to numbers with max value of 100 and no leading zero
    else if (field === "numberOfPackages") {
      if (/^\d*$/.test(value) && (value === "" || (parseInt(value) > 0 && parseInt(value) <= 100))) {
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
    const userInputs = { ...fields };
    try {
      // Speichere die Daten in Supabase (Tabelle 'shipments')
      const { error } = await supabase.from('shipments').insert([userInputs]);
      if (error) throw error;
      sessionStorage.setItem("authorizedForComplete", "true");
      router.push("/create-shipment/details/review&confirm/complete");
    } catch (error) {
      console.error('Error during confirmation:', error);
      alert('Fehler beim Speichern in der Datenbank!');
    }
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

  const renderFieldWithDropdownOptions = (
    label: string,
    field: keyof ShipmentData,
    options: string[],
    editable: boolean = true
  ) => (
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-md font-bold">{label}:</h3>
        {editable && isEditing[field] ? (
          <select
            value={fields[field] as string || ""}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
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

  const renderShipmentType = () => {
    const isFCL = fields.shipmentType === "FCL";
    const numberLabel = isFCL ? "Number of Containers" : `Number of ${fields.packageType ? fields.packageType.charAt(0).toUpperCase() + fields.packageType.slice(1) : "Packages"}`;
    const numberValue = isFCL ? fields.fclSelection : fields.lclSelection; // Use correct field based on shipment type

    return (
      <div className="">
        <h2 className="text-lg font-bold mb-4">Shipment Type & Details</h2>
        <p className="text-gray-700 font-medium mb-4">{shipmentType}</p> {/* Display shipment type */}
        <div className="mt-1">
          <h3 className="text-md font-bold">{numberLabel}:</h3>
          <p className="text-gray-700">{numberValue || "N/A"}</p> {/* Display user input or "N/A" */}
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
              <p className="text-gray-700">{fields.fclSelection || "N/A"}</p> /* Ensure user input is displayed */
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
              <p className="text-gray-700">{fields.lclSelection || "N/A"}</p> /* Ensure user input is displayed */
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

  const renderSizeAndWeightDetails = () => {
    const isLCL = fields.shipmentType === "LCL"; // Check if the shipment type is LCL

    return (
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-lg font-bold mb-3">Size & Weight Details</h2> {/* Reduced spacing */}
        <div className="text-gray-700"> {/* Labels and values use the same style */}
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

  const renderFragileItem = () => (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-lg font-bold mb-3">Fragile Item</h2> {/* Reduced spacing */}
      <div className="mb-1"> {/* Reduced spacing */}
        <h3 className="text-md font-bold">Is Fragile:</h3>
        <p className="text-gray-700">{fields.isFragile ? "Yes" : "No"}</p>
      </div>
      <div className="mb-1"> {/* Reduced spacing */}
        <h3 className="text-md font-bold">Category:</h3>
        <p className="text-gray-700">{fields.fragileCategory || "N/A"}</p>
      </div>
      <div className="mb-1"> {/* Reduced spacing */}
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
                onChange={(e) =>
                  handleInputChange("extraProtection", e.target.value === "Yes" ? "true" : "false")
                }
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

  const renderConfirmButton = () => (
    <div className="flex justify-end items-center mt-8"> {/* Adjusted margin to avoid overlap */}
      <button
        className="px-6 py-3 bg-black text-white rounded-full transition-all duration-[1250ms] hover:bg-transparent hover:text-black cursor-pointer" // Ensure `cursor-pointer` is present
        onClick={handleConfirm} // Ensure the onClick handler is properly set
      >
        Confirm
      </button>
    </div>
  );

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
            {renderField("Address", "originStreet")} {/* Editable */}
          </div>

          {/* Destination (To) */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-lg font-bold mb-4">Destination (To)</h2>
            {renderField("Country", "destinationCountry", false)} {/* Non-editable */}
            {renderFieldWithDropdown("City", "destinationCity", "destinationCountry")} {/* Dropdown */}
            {renderField("Address", "destinationStreet")} {/* Editable */}
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
