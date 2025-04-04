"use client";

import { useState } from "react";

export default function Boxes({ shipmentType }: { shipmentType: string | null }) {
  const [fclSelection, setFclSelection] = useState<string | null>(null);
  const [lclSelection, setLclSelection] = useState<string | null>(null);
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [length, setLength] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [isFragile, setIsFragile] = useState(false);
  const [fragileCategory, setFragileCategory] = useState<string | null>(null);
  const [fragileSubCategory, setFragileSubCategory] = useState<string | null>(null);
  const [extraProtection, setExtraProtection] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState<string | null>(null);
  const [arrivalDate, setArrivalDate] = useState<string>(""); // State for arrival date

  const fragileSubCategories = {
    Electronic: ["Mobile Phone", "Laptop", "Tablet", "Other"],
    Glassware: ["Glass Bottle", "Window Glass", "Glassware Set", "Other"],
    Ceramic: ["Ceramic Plate", "Ceramic Vase", "Ceramic Mug", "Other"],
    Furniture: ["Wooden Table", "Glass Table", "Chair", "Other"],
    Artwork: ["Painting", "Sculpture", "Canvas Art", "Other"],
    MusicalInstruments: ["Guitar", "Piano", "Violin", "Other"],
    Jewelry: ["Necklace", "Ring", "Bracelet", "Other"],
    Other: ["Custom Item 1", "Custom Item 2", "Other"],
  };

  const handleNumberInput = (value: string, setter: (val: string) => void, max: number) => {
    if (value === "" || (/^[1-9][0-9]*$/.test(value) && parseInt(value) <= max)) {
      setter(value);
    }
  };

  return (
    <div className="flex flex-col items-start w-full max-w-6xl mt-4 px-8">
      <h1 className="text-4xl font-extrabold mb-8 self-start">Details</h1>
      <div className="grid grid-cols-3 gap-4 w-full"> {/* Updated to grid layout with uniform spacing */}
        <div className={`bg-white p-6 shadow-lg rounded-lg ${shipmentType === "LCL" ? "opacity-50 pointer-events-none" : ""}`}>
          <h2 className="text-lg font-bold mb-4">Full Container Load</h2>
          <input
            type="text"
            placeholder="Enter number of containers (1-100)"
            value={fclSelection || ""}
            onChange={(e) => handleNumberInput(e.target.value, setFclSelection, 100)}
            className="w-full p-3 border rounded bg-gray-100"
          />
        </div>
        <div className={`bg-white p-6 shadow-lg rounded-lg ${shipmentType === "FCL" ? "opacity-50 pointer-events-none" : ""}`}>
          <h2 className="text-lg font-bold mb-4">Less Container Load</h2>
          <input
            type="text"
            placeholder="Enter number of packages"
            value={lclSelection || ""}
            onChange={(e) => setLclSelection(e.target.value)}
            className="w-full p-3 border rounded bg-gray-100"
          />
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-lg font-bold mb-4">Size & Weight Details</h2>
          <h3 className="text-md font-semibold mb-2">Weight</h3>
          <input
            type="text"
            placeholder="Weight (in kg)"
            value={weight}
            onChange={(e) => handleNumberInput(e.target.value, setWeight, 100000000)}
            className="w-full p-3 border rounded mb-4 bg-gray-100"
          />
          <h3 className="text-md font-semibold mb-2">Dimensions</h3>
          <input
            type="text"
            placeholder="Height (in m)"
            value={height}
            onChange={(e) => handleNumberInput(e.target.value, setHeight, 10000)}
            className="w-full p-3 border rounded mb-3 bg-gray-100"
          />
          <input
            type="text"
            placeholder="Length (in m)"
            value={length}
            onChange={(e) => handleNumberInput(e.target.value, setLength, 10000)}
            className="w-full p-3 border rounded mb-3 bg-gray-100"
          />
          <input
            type="text"
            placeholder="Width (in m)"
            value={width}
            onChange={(e) => handleNumberInput(e.target.value, setWidth, 10000)}
            className="w-full p-3 border rounded bg-gray-100"
          />
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-lg font-bold mb-4">Fragile Item</h2>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="fragileItem"
              checked={isFragile}
              onChange={(e) => {
                const isChecked = e.target.checked;
                setIsFragile(isChecked);
                if (!isChecked) {
                  setFragileCategory(null);
                  setFragileSubCategory(null);
                  setExtraProtection(false);
                }
              }}
              className="w-5 h-5"
            />
            <label htmlFor="fragileItem" className="ml-2 text-lg font-medium">Is this a fragile item?</label>
          </div>
          <h3 className="text-md font-semibold mb-2">Categories</h3>
          <select
            id="fragileCategory"
            value={fragileCategory || ""}
            onChange={(e) => {
              setFragileCategory(e.target.value);
              setFragileSubCategory(null);
            }}
            disabled={!isFragile}
            className="w-full p-3 border rounded bg-gray-100 disabled:bg-gray-300 disabled:cursor-not-allowed mb-4"
          >
            <option value="">Select Category</option>
            {Object.keys(fragileSubCategories).map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <h3 className="text-md font-semibold mb-2">Subcategories</h3>
          <select
            id="fragileSubCategory"
            value={fragileSubCategory || ""}
            onChange={(e) => setFragileSubCategory(e.target.value)}
            disabled={!isFragile || !fragileCategory}
            className="w-full p-3 border rounded bg-gray-100 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <option value="">Select Subcategory</option>
            {fragileCategory &&
              fragileSubCategories[fragileCategory as keyof typeof fragileSubCategories].map((subCategory) => (
                <option key={subCategory} value={subCategory}>{subCategory}</option>
              ))}
          </select>
          <div className="flex items-center mt-6">
            <input
              type="checkbox"
              id="extraProtection"
              checked={extraProtection}
              onChange={() => setExtraProtection(!extraProtection)}
              className="w-5 h-5"
              disabled={!isFragile}
            />
            <label htmlFor="extraProtection" className="ml-2 text-lg font-medium">
              Request additional protection for fragile items?
            </label>
          </div>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg col-span-3"> {/* Full width for delivery option */}
          <h2 className="text-lg font-bold mb-4">Delivery Option</h2>
          <label className="flex items-center mb-4">
            <input
              type="radio"
              name="deliveryOption"
              value="pickup"
              checked={deliveryOption === "pickup"}
              onChange={() => setDeliveryOption("pickup")}
              className="w-5 h-5"
            />
            <span className="ml-2 text-lg font-medium">Pick Up</span>
          </label>
          <label className="flex items-center mb-4">
            <input
              type="radio"
              name="deliveryOption"
              value="deliver"
              checked={deliveryOption === "deliver"}
              onChange={() => setDeliveryOption("deliver")}
              className="w-5 h-5"
            />
            <span className="ml-2 text-lg font-medium">Deliver</span>
          </label>
          <div className="mt-4">
            <label htmlFor="arrivalDate" className="block text-md font-semibold mb-2">Arrival Date</label>
            <input
              type="date"
              id="arrivalDate"
              value={arrivalDate}
              onChange={(e) => setArrivalDate(e.target.value)}
              className="w-full p-3 border rounded bg-gray-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
