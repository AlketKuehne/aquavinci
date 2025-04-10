"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import databank from "../../../utils/databank"; // Import databank for shared state

export default function Boxes({ shipmentType, shippingDate, minDeliveryDate }: { shipmentType: string | null; shippingDate: string; minDeliveryDate: string }) {
  const router = useRouter(); // Initialize router for navigation
  const [fclSelection, setFclSelection] = useState<string | undefined>(undefined);
  const [lclSelection, setLclSelection] = useState<string | undefined>(undefined);
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [length, setLength] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [isFragile, setIsFragile] = useState(false);
  const [fragileCategory, setFragileCategory] = useState<string | undefined>(undefined);
  const [fragileSubCategory, setFragileSubCategory] = useState<string | undefined>(undefined);
  const [extraProtection, setExtraProtection] = useState(false);
  const [insuranceRequired, setInsuranceRequired] = useState(false); // State for insurance checkbox
  const [selectedProtections, setSelectedProtections] = useState<string[]>([]); // State for multiple protection options
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility
  const [dropdownDirection, setDropdownDirection] = useState<"down" | "up">("down"); // State for dropdown direction
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for dropdown container
  const [deliveryOption, setDeliveryOption] = useState<string | undefined>(undefined);
  const [deliveryDate, setDeliveryDate] = useState<string>(""); // State for delivery date
  const [country, setCountry] = useState<string | undefined>(undefined); // Add country state
  const [destinationCountry, setDestinationCountry] = useState<string | undefined>(undefined); // Add destination country state
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility

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

  const protectionOptions = [
    "Bubble Wrap",
    "Foam Padding",
    "Shock Absorbers",
    "Waterproof Packaging",
    "Anti-Static Wrap",
    "Corner Protectors",
    "Thermal Insulation",
    "Vibration Dampeners",
    "Custom Crates",
    "Heavy-Duty Straps",
    "Pallet Covers",
    "Edge Guards",
    "Stretch Film",
    "Humidity Control Packs",
    "Impact Indicators",
    "Tamper-Evident Seals",
    "Reinforced Boxes",
    "Cushioning Material",
    "Protective Sleeves",
    "Void Fillers",
  ]; // Expanded list of protection options

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

  const closeDropdown = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", closeDropdown);
    } else {
      document.removeEventListener("mousedown", closeDropdown);
    }

    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    if (isDropdownOpen && dropdownRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Check if there's enough space below; if not, drop up
      if (dropdownRect.bottom + 300 > viewportHeight) {
        setDropdownDirection("up");
      } else {
        setDropdownDirection("down");
      }
    }
  }, [isDropdownOpen]);

  useEffect(() => {
    // Reset delivery date if constraints change
    setDeliveryDate("");
  }, [country, destinationCountry]);

  useEffect(() => {
    // Reset delivery date if shipping date or constraints change
    setDeliveryDate("");
  }, [shippingDate, minDeliveryDate]);

  useEffect(() => {
    // Save data to databank as the user types
    databank.updateData({
      fclSelection,
      lclSelection,
      weight,
      height,
      length,
      width,
      isFragile,
      fragileCategory,
      fragileSubCategory,
      extraProtection,
      selectedProtections,
      deliveryOption,
      deliveryDate,
    });
  }, [
    fclSelection,
    lclSelection,
    weight,
    height,
    length,
    width,
    isFragile,
    fragileCategory,
    fragileSubCategory,
    extraProtection,
    selectedProtections,
    deliveryOption,
    deliveryDate,
  ]);

  const calculateMinDeliveryDate = (): string => {
    if (!shippingDate || !minDeliveryDate) return new Date().toISOString().split("T")[0];
    const baseDate = new Date(minDeliveryDate);
    if (deliveryOption === "deliver") {
      baseDate.setDate(baseDate.getDate() + 4); // Add 4 days for "Deliver" option
    }
    return baseDate.toISOString().split("T")[0];
  };

  const handleContinueClick = () => {
    // Validate mandatory fields
    const isFclValid = shipmentType === "FCL" && fclSelection;
    const isLclValid = shipmentType === "LCL" && lclSelection;
    const isSizeWeightValid = weight && height && length && width;
    const isDeliveryValid = deliveryOption && deliveryDate;

    if ((isFclValid || isLclValid) && isSizeWeightValid && isDeliveryValid) {
      router.push("https://aquavinci.vercel.app/create-shipment/details/review&confirm");
    } else {
      setShowPopup(true); // Show popup if validation fails
    }
  };

  return (
    <div className="flex flex-col items-start w-full max-w-6xl mt-4 px-8 pt-12"> {/* Adjusted pt-12 for padding */}
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
            placeholder="Enter number of packages (1-100)"
            value={lclSelection || ""}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || (/^[1-9][0-9]?$|^100$/.test(value) && parseInt(value) <= 100)) {
                setLclSelection(value);
              }
            }}
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
          <h3 className="text-md font-semibold mb-2">Sizes per Piece</h3>
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
        <div className="bg-white p-6 shadow-lg rounded-lg"> {/* Fragile Item */}
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
                  setFragileCategory(undefined);
                  setFragileSubCategory(undefined);
                  setInsuranceRequired(false); // Reset insurance if fragile is unchecked
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
              setFragileSubCategory(undefined);
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
          {fragileCategory === "Other" ? (
            <input
              type="text"
              placeholder="Enter custom subcategory"
              value={fragileSubCategory || ""}
              onChange={(e) => setFragileSubCategory(e.target.value)}
              className="w-full p-3 border rounded bg-gray-100"
            />
          ) : (
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
          )}
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="insuranceRequired"
              checked={insuranceRequired}
              onChange={(e) => setInsuranceRequired(e.target.checked)}
              className="w-5 h-5"
              disabled={!isFragile} // Insurance only available if fragile is checked
            />
            <label htmlFor="insuranceRequired" className="ml-2 text-lg font-medium">
              Do you require insurance for this shipment?
            </label>
          </div>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg"> {/* Delivery Option */}
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
        <div className="bg-white p-6 shadow-lg rounded-lg"> {/* Additional Protection */}
          <h2 className="text-lg font-bold mb-4">Additional Protection</h2>
          <div className="mb-4">
            <h3 className="text-md font-semibold mb-2">Request Additional Protection</h3>
            <label className="flex items-center">
              <input
                type="checkbox"
                id="extraProtection"
                checked={extraProtection}
                onChange={() => {
                  if (extraProtection) {
                    setSelectedProtections([]); // Reset selected protections if unchecked
                  }
                  setExtraProtection(!extraProtection);
                }}
                className="w-5 h-5"
              />
              <span className="ml-2 text-lg font-medium">Request additional protection for your shipment?</span>
            </label>
          </div>
          <div>
            <h3 className="text-md font-semibold mb-2">Protection</h3>
            <label className="block text-md font-medium mb-2">
              Select additional protection options:
            </label>
            <div className="relative" ref={dropdownRef}>
              <div
                className={`border rounded p-3 cursor-pointer ${
                  extraProtection ? "bg-gray-100" : "bg-gray-300 cursor-not-allowed"
                }`}
                onClick={() => {
                  if (extraProtection) toggleDropdown();
                }}
              >
                {selectedProtections.length > 0
                  ? selectedProtections.join(", ")
                  : "Select protection options"}
              </div>
              {isDropdownOpen && extraProtection && (
                <div
                  className={`absolute z-10 bg-white border rounded shadow-lg mt-1 w-full max-h-[300px] overflow-y-auto ${
                    dropdownDirection === "up" ? "bottom-full mb-1" : "top-full mt-1"
                  }`}
                >
                  <div className="grid grid-cols-3 gap-4 p-3">
                    {protectionOptions.map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedProtections.includes(option)}
                          onChange={() => toggleProtection(option)}
                          className="w-5 h-5"
                        />
                        <span className="ml-2 text-sm font-medium">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Continue Button */}
      <div className="flex justify-end w-full mt-16 mb-16">
        <button
          className="flex items-center px-6 py-3 bg-black text-white text-lg font-medium rounded-full transition-all duration-[1250ms] hover:bg-[#E5E5E5] hover:text-black cursor-pointer"
          onClick={handleContinueClick}
        >
          Continue
        </button>
      </div>
      {/* Popup */}
      {showPopup && (
        <div
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} // Semi-transparent background
          className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center pointer-events-auto"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-96 z-10">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer text-3xl"
              onClick={() => setShowPopup(false)}
            >
              ×
            </button>
            <h2 className="text-red-500 text-lg font-bold mb-4 text-center">!!WARNING!!</h2>
            <p className="text-black text-lg">You can't continue without filling the mandatory fields (*)</p>
          </div>
        </div>
      )}
    </div>
  );
}
