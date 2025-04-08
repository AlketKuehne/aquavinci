"use client";

import { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import temporaryDatabank from "../../../../utils/temporaryDatabank";

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
  const [fields, setFields] = useState<Partial<ShipmentData>>({});

  useEffect(() => {
    const data = temporaryDatabank.getData();
    if (Object.keys(data).length === 0) {
      temporaryDatabank.updateField("consignorName", "John Doe");
      temporaryDatabank.updateField("shipmentType", "FCL");
    }
    setFields(temporaryDatabank.getData());
  }, []);

  if (!fields || Object.keys(fields).length === 0) {
    return <div>Loading...</div>;
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
              {["consignorName", "consignorEmail", "consignorPhone"].map((field) => (
                <div key={field} className="flex justify-between items-center">
                  <div>
                    <h3 className="text-md font-medium capitalize">{field.replace("consignor", "").replace(/([A-Z])/g, " $1")}</h3>
                    <p className="text-gray-700">{fields[field as keyof ShipmentData]}</p>
                  </div>
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
                    <p className="text-gray-700">{fields[field as keyof ShipmentData]}</p>
                  </div>
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
                    <p className="text-gray-700">{fields[field as keyof ShipmentData]}</p>
                  </div>
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
                    <p className="text-gray-700">{fields[field as keyof ShipmentData]}</p>
                  </div>
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
                    <p className="text-gray-700">{fields[field as keyof ShipmentData]}</p>
                  </div>
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
          </div>

          {/* FCL or LCL Selection */}
          {fields.shipmentType === "FCL" && (
            <div className="bg-white p-6 shadow-lg rounded-lg flex justify-between items-center w-full">
              <div>
                <h2 className="text-lg font-bold mb-2">Number of Containers</h2>
                <p className="text-gray-700">{fields.fclSelection || "N/A"}</p>
              </div>
            </div>
          )}
          {fields.shipmentType === "LCL" && (
            <div className="bg-white p-6 shadow-lg rounded-lg flex justify-between items-center w-full">
              <div>
                <h2 className="text-lg font-bold mb-2">Number of Packages</h2>
                <p className="text-gray-700">{fields.lclSelection || "N/A"}</p>
              </div>
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
                    <p className="text-gray-700">{fields[field as keyof ShipmentData]}</p>
                  </div>
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
                    <p className="text-gray-700">{fields.fragileCategory || "N/A"}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-md font-medium">Subcategory</h3>
                    <p className="text-gray-700">{fields.fragileSubCategory || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Delivery Option */}
          <div className="bg-white p-6 shadow-lg rounded-lg flex justify-between items-center w-full">
            <div>
              <h2 className="text-lg font-bold mb-2">Delivery Option</h2>
              <p className="text-gray-700">
                {fields.deliveryOption === "pickup" ? "Pick Up" : "Deliver"}
              </p>
            </div>
          </div>

          {/* Delivery Date */}
          <div className="bg-white p-6 shadow-lg rounded-lg flex justify-between items-center w-full">
            <div>
              <h2 className="text-lg font-bold mb-2">Delivery Date</h2>
              <p className="text-gray-700">{fields.deliveryDate || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
