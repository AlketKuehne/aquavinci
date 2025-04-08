"use client";

import { useState, useEffect } from "react";

export default function Boxes({ shipmentType, shippingDate, minDeliveryDate }: { shipmentType: string | null; shippingDate: string; minDeliveryDate: string }) {
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
  const [insuranceRequired, setInsuranceRequired] = useState(false); // State for insurance checkbox
  const [selectedProtections, setSelectedProtections] = useState<string[]>([]); // State for multiple protection options
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility
  const [deliveryOption, setDeliveryOption] = useState<string | null>(null);
  const [deliveryDate, setDeliveryDate] = useState<string>(""); // State for delivery date
  const [country, setCountry] = useState<string | null>(null); // Add country state
  const [destinationCountry, setDestinationCountry] = useState<string | null>(null); // Add destination country state

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

  const bubbleWrapOptions = ["None", "Standard Bubble Wrap", "Heavy-Duty Bubble Wrap"];

  const protectionOptions = ["Bubble Wrap", "Foam Padding", "Shock Absorbers", "Waterproof Packaging"];

  const handleNumberInput = (value: string, setter: (val: string) => void, max: number) => {
    if (value === "" || (/^[1-9][0-9]*$/.test(value) && parseInt(value) <= max)) {
      setter(value);
    }
  };

  const getMinimumDeliveryDays = (origin: string, destination: string): number => {
    if (!origin || !destination) return 0;
    return 40; // Default to 40 days for demonstration
  };

  const getDeliveryDateConstraints = (): { min: string; max: string } => {
    if (!country || !destinationCountry) {
      return { min: new Date().toISOString().split("T")[0], max: "" }; // Default to today if no countries are selected
    }

    const today = new Date();
    const minDays = getMinimumDeliveryDays(country, destinationCountry);
    const earliestDeliveryDate = new Date(today);
    earliestDeliveryDate.setDate(earliestDeliveryDate.getDate() + minDays);

    return { min: earliestDeliveryDate.toISOString().split("T")[0], max: "" }; // No maximum date
  };

  const toggleProtection = (option: string) => {
    setSelectedProtections((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleProtectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedProtections(selectedOptions);
  };

  useEffect(() => {
    // Reset delivery date if constraints change
    setDeliveryDate("");
  }, [country, destinationCountry]);

  useEffect(() => {
    // Reset delivery date if shipping date or constraints change
    setDeliveryDate("");
  }, [shippingDate, minDeliveryDate]);

  const calculateMinDeliveryDate = (): string => {
    if (!shippingDate || !minDeliveryDate) return new Date().toISOString().split("T")[0];
    return minDeliveryDate; // Use the minDeliveryDate passed from /create-shipment
  };

  return (
    <div className="flex flex-col items-start w-full max-w-6xl mt-4 px-8">
      <h1 className="text-4xl font-extrabold mb-8 self-start">Details</h1>
      <div className="grid grid-cols-2 gap-x-4 gap-y-7 w-full"> {/* gap-x for vertical, gap-y for horizontal */}
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
        <div className="bg-white p-6 shadow-lg rounded-lg"> {/* Consistent spacing */}
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
        <div className="bg-white p-6 shadow-lg rounded-lg"> {/* Consistent spacing */}
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
        <div className="bg-white p-6 shadow-lg rounded-lg"> {/* Same width as other boxes */}
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
            <label htmlFor="dateField" className="block text-md font-semibold mb-2">
              {deliveryOption === "deliver" ? "Delivery Date" : deliveryOption === "pickup" ? "Pick Up Date" : "Date"}
            </label>
            <input
              type="date"
              id="dateField"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              disabled={!deliveryOption} // Disabled if no option is selected
              min={calculateMinDeliveryDate()} // Dynamically calculate the minimum delivery date
              className={`w-full p-3 border rounded ${
                deliveryOption ? "bg-white text-black" : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            />
          </div>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg"> {/* Insurance & Additional Protection */}
          <h2 className="text-lg font-bold mb-4">Insurance & Additional Protection</h2>
          <div className="mb-4">
            <h3 className="text-md font-semibold mb-2">Insurance</h3>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={insuranceRequired}
                onChange={(e) => setInsuranceRequired(e.target.checked)}
                className="w-5 h-5"
              />
              <span className="ml-2 text-lg font-medium">Do you require insurance for this shipment?</span>
            </label>
          </div>
          <div>
            <h3 className="text-md font-semibold mb-2">Protection</h3>
            <label className="block text-md font-medium mb-2">
              Select additional protection options:
            </label>
            <div className="relative">
              <div
                className="border rounded bg-gray-100 p-3 cursor-pointer"
                onClick={toggleDropdown}
              >
                {selectedProtections.length > 0
                  ? selectedProtections.join(", ")
                  : "Select protection options"}
              </div>
              {isDropdownOpen && (
                <div className="absolute z-10 bg-white border rounded shadow-lg mt-1 w-full">
                  {protectionOptions.map((option) => (
                    <label key={option} className="flex items-center px-3 py-2 hover:bg-gray-100">
                      <input
                        type="checkbox"
                        checked={selectedProtections.includes(option)}
                        onChange={() => toggleProtection(option)}
                        className="w-5 h-5"
                      />
                      <span className="ml-2 text-lg font-medium">{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
