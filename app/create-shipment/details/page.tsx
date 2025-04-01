"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function DetailsPage() {
  const router = useRouter();
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [isFragile, setIsFragile] = useState(false);
  const [fragileMaterial, setFragileMaterial] = useState("");
  const [fclSelection, setFclSelection] = useState<string | null>(null);
  const [lclSelection, setLclSelection] = useState<string | null>(null);
  const [fragileCategory, setFragileCategory] = useState<string | null>(null);
  const [fragileSubCategory, setFragileSubCategory] = useState<string | null>(null);

  const fragileSubCategories = {
    electronic: ["Mobile Phone", "Laptop", "Tablet", "Other"],
    glassware: ["Glass Bottle", "Window Glass", "Glassware Set", "Other"],
    ceramic: ["Ceramic Plate", "Ceramic Vase", "Ceramic Mug", "Other"],
    other: ["Custom Item 1", "Custom Item 2", "Other"]
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
      setShowCancelPopup(true);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleNavigation = (url: string) => {
    setPendingNavigation(url);
    setShowCancelPopup(true);
  };

  const handleCancel = () => {
    setShowCancelPopup(false);
    router.push('/');
  };

  const handleStay = () => {
    setShowCancelPopup(false);
    setPendingNavigation(null);
  };

  const handleConfirmNavigation = () => {
    if (pendingNavigation) {
      router.push(pendingNavigation);
    }
  };

  useEffect(() => {
    if (!showCancelPopup && pendingNavigation) {
      handleConfirmNavigation();
    }
  }, [showCancelPopup, pendingNavigation]);

  return (
    <div className="flex flex-col items-center min-h-screen relative">
      {/* Navigation Bar */}
      <nav className={`relative w-full h-12 bg-[#242424] flex items-center px-4 z-10 ${showCancelPopup ? 'pointer-events-none' : ''}`}>
        {/* Clickable Logo (Fixed Size, No Overlap) */}
        <Link href="/" className="flex items-center" onClick={(e) => { e.preventDefault(); handleNavigation('/'); }}>
          <Image 
            src="/logoname.png" 
            alt="Logo" 
            width={140} 
            height={50} 
            className="h-10 w-auto cursor-pointer"
          />
        </Link>

        {/* Navigation Links (Start after the logo, properly spaced) */}
        <div className="flex h-full ml-4">
          <Link
            href="/"
            className="flex items-center justify-center px-6 text-lg text-white bg-[#242424] transition-all duration-[1250ms] hover:bg-gray-200 hover:text-black h-full"
            onClick={(e) => { e.preventDefault(); handleNavigation('/'); }}
          >
            Homepage
          </Link>
          <Link
            href="/create-shipment"
            className="flex items-center justify-center px-6 text-lg text-white bg-[#242424] transition-all duration-[1250ms] hover:bg-gray-200 hover:text-black h-full"
            onClick={(e) => { e.preventDefault(); handleNavigation('/create-shipment'); }}
          >
            Create Shipment
          </Link>
        </div>
      </nav>

      {/* Page Content */}
      <div className="flex flex-col items-start w-full max-w-6xl mt-4 px-8">
        <h1 className="text-4xl font-extrabold mb-8 self-start">Details</h1>

        {/* FCL and LCL Boxes */}
        <div className="flex justify-between w-full gap-x-4">
          {/* Box for FCL */}
          <div className="bg-white p-6 shadow-lg rounded-lg w-1/2">
            <h2 className="text-lg font-bold mb-4">Full Container Load</h2>
            <label htmlFor="fclQuantity" className="block text-lg font-medium mb-2">
              Enter number of containers
            </label>
            <input
              id="fclQuantity"
              type="text"
              placeholder="Enter number of containers"
              value={fclSelection || ""}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || (/^[1-9]\d{0,2}$/.test(value) && Number(value) <= 100)) {
                  setFclSelection(value);
                }
              }}
              className="w-full p-3 border rounded bg-gray-100"
              aria-label="FCL Quantity"
            />
          </div>

          {/* Box for LCL */}
          <div className="bg-white p-6 shadow-lg rounded-lg w-1/2">
            <h2 className="text-lg font-bold mb-4">Less Container Load</h2>
            <label htmlFor="lclQuantity" className="block text-lg font-medium mb-2">
              Enter number of packages
            </label>
            <input
              id="lclQuantity"
              type="text"
              placeholder="Enter number of packages"
              value={lclSelection || ""}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || (/^[1-9]\d{0,2}$/.test(value) && Number(value) <= 100)) {
                  setLclSelection(value);
                }
              }}
              className="w-full p-3 border rounded bg-gray-100"
              aria-label="LCL Quantity"
            />
          </div>
        </div>

        {/* Weight and Dimensions, Fragile Item Boxes */}
        <div className="flex justify-between w-full mt-4 gap-x-4">
          {/* Box for Weight and Dimensions */}
          <div className="bg-white p-6 shadow-lg rounded-lg w-1/2">
            <h2 className="text-lg font-bold mb-4">Weight</h2>
            <input
              type="number"
              placeholder="Weight (in kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full p-3 border rounded mb-4 bg-gray-100"
              aria-label="Weight"
            />
            <h2 className="text-lg font-bold mb-4">Dimensions</h2>
            <input
              type="number"
              placeholder="Height (in m)"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full p-3 border rounded mb-3 bg-gray-100"
              aria-label="Height"
            />
            <input
              type="number"
              placeholder="Length (in m)"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full p-3 border rounded mb-3 bg-gray-100"
              aria-label="Length"
            />
            <input
              type="number"
              placeholder="Width (in m)"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="w-full p-3 border rounded bg-gray-100"
              aria-label="Width"
            />
          </div>

          {/* Box for Fragile Items */}
          <div className="bg-white p-6 shadow-lg rounded-lg w-1/2">
            <h2 className="text-lg font-bold mb-4">Fragile Item</h2>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="fragileItem"
                checked={isFragile}
                onChange={() => {
                  setIsFragile(!isFragile);
                  if (isFragile) {
                    setFragileCategory(null); // Reset category
                    setFragileSubCategory(null); // Reset subcategory
                  }
                }}
                className="w-5 h-5"
                aria-label="Fragile Item"
              />
              <label htmlFor="fragileItem" className="ml-2 text-lg font-medium">Is this a fragile item?</label>
            </div>

            {/* Category Section */}
            <h3 className="text-md font-semibold mb-2">Categories</h3>
            <select
              id="fragileCategory"
              value={fragileCategory || ""}
              onChange={(e) => {
                setFragileCategory(e.target.value);
                setFragileSubCategory(null); // Reset subcategory when category changes
              }}
              disabled={!isFragile}
              className="w-full p-3 border rounded bg-gray-100 disabled:bg-gray-300 disabled:cursor-not-allowed mb-4"
              aria-label="Fragile Category"
            >
              <option value="">Select Category</option>
              <option value="electronic">Electronic</option>
              <option value="glassware">Glassware</option>
              <option value="ceramic">Ceramic</option>
              <option value="other">Other</option>
            </select>

            {/* Subcategory Section */}
            <h3 className="text-md font-semibold mb-2">
              {fragileCategory === "other" ? "Specify Other Category" : fragileCategory ? `Select ${fragileCategory.charAt(0).toUpperCase() + fragileCategory.slice(1)}` : "Subcategory"}
            </h3>
            {fragileCategory === "other" ? (
              <input
                type="text"
                placeholder="Specify your category"
                value={fragileSubCategory || ""}
                onChange={(e) => setFragileSubCategory(e.target.value)}
                className="w-full p-3 border rounded bg-gray-100"
                aria-label="Other Category"
              />
            ) : (
              <select
                id="fragileSubCategory"
                value={fragileSubCategory || ""}
                onChange={(e) => setFragileSubCategory(e.target.value)}
                disabled={!isFragile || !fragileCategory}
                className="w-full p-3 border rounded bg-gray-100 disabled:bg-gray-300 disabled:cursor-not-allowed"
                aria-label="Fragile Subcategory"
              >
                <option value="">Select Subcategory</option>
                {fragileCategory &&
                  fragileSubCategories[fragileCategory as keyof typeof fragileSubCategories].map((subCategory) => (
                    <option key={subCategory} value={subCategory}>{subCategory}</option>
                  ))}
              </select>
            )}

            {/* Additional Protection Checkbox */}
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="extraProtection"
                className="w-5 h-5"
                disabled={!isFragile}
                aria-label="Request Additional Protection"
              />
              <label htmlFor="extraProtection" className="ml-2 text-lg font-medium">
                Would you like to request additional protection?
              </label>
            </div>
          </div>
        </div>

        {/* Add two empty boxes */}
        <div className="flex justify-between w-full mt-4 gap-x-4">
          {/* Empty Box 1 */}
          <div className="bg-white p-6 shadow-lg rounded-lg w-1/2 h-64">
            {/* Empty content */}
          </div>

          {/* Empty Box 2 */}
          <div className="bg-white p-6 shadow-lg rounded-lg w-1/2 h-64">
            {/* Empty content */}
          </div>
        </div>
      </div>

      {/* Add extra spacing for scrolling */}
      <div className="h-16"></div>

      {showCancelPopup && (
        <>
          <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-20"></div>
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-30">
            <div className="bg-white p-6 rounded-lg shadow-lg relative w-96">
              <div className="text-black text-lg mb-4 text-center">
                Are you sure you want to cancel your shipment?
              </div>
              <div className="flex justify-around">
                <button
                  className="w-28 h-10 px-5 py-2 bg-gray-300 text-black rounded-full cursor-pointer transition-all duration-[1250ms] hover:bg-black hover:text-white text-lg font-medium"
                  onClick={handleCancel}
                >
                  Yes
                </button>
                <button
                  className="w-28 h-10 px-5 py-2 bg-black text-gray-300 rounded-full cursor-pointer transition-all duration-[1250ms] hover:bg-gray-300 hover:text-black text-lg font-medium"
                  onClick={handleStay}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}