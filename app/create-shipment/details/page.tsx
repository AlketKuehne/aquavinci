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
      <div className="flex flex-col items-start w-full max-w-6xl mt-6 px-6">
        <h1 className="text-4xl font-extrabold mb-4 self-start">Details</h1>

        {/* FCL and LCL Boxes */}
        <div className="flex justify-between w-full mt-6 gap-x-1">
          {/* Box for FCL */}
          <div className="bg-white p-6 shadow-lg rounded-lg w-[48%]">
            <h2 className="text-lg font-bold mb-4">Full Container Load</h2>
            <label htmlFor="fclQuantity" className="block text-lg font-medium mb-2">
              Enter number of containers
            </label>
            <input
              id="fclQuantity"
              type="text"
              placeholder="Enter number of containers"
              value={fclSelection || ""}
              onChange={(e) => setFclSelection(e.target.value)}
              className="w-full p-3 border rounded bg-gray-100"
              aria-label="FCL Quantity"
            />
          </div>

          {/* Box for LCL */}
          <div className="bg-white p-6 shadow-lg rounded-lg w-[48%]">
            <h2 className="text-lg font-bold mb-4">Less Container Load</h2>
            <label htmlFor="lclQuantity" className="block text-lg font-medium mb-2">
              Enter number of packages
            </label>
            <input
              id="lclQuantity"
              type="text"
              placeholder="Enter number of packages"
              value={lclSelection || ""}
              onChange={(e) => setLclSelection(e.target.value)}
              className="w-full p-3 border rounded bg-gray-100"
              aria-label="LCL Quantity"
            />
          </div>
        </div>

        {/* Weight and Dimensions, Fragile Item Boxes */}
        <div className="flex justify-between w-full mt-6 gap-x-1">
          {/* Box for Weight and Dimensions */}
          <div className="bg-white p-6 shadow-lg rounded-lg w-[48%]">
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
          <div className="bg-white p-6 shadow-lg rounded-lg w-[48%]">
            <h2 className="text-lg font-bold mb-4">Fragile Item</h2>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="fragileItem"
                checked={isFragile}
                onChange={() => {
                  setIsFragile(!isFragile);
                  if (!isFragile) setFragileMaterial(""); // Reset dropdown if unchecked
                }}
                className="w-5 h-5"
                aria-label="Fragile Item"
              />
              <label htmlFor="fragileItem" className="ml-2 text-lg font-medium">Is this a fragile item?</label>
            </div>
            <select
              id="fragileMaterial"
              value={fragileMaterial}
              onChange={(e) => setFragileMaterial(e.target.value)}
              disabled={!isFragile}
              className="w-full p-3 border rounded bg-gray-100 disabled:bg-gray-300 disabled:cursor-not-allowed"
              aria-label="Fragile Material"
            >
              <option value="">Select Fragile Material</option>
              <option value="glass">Glass</option>
              <option value="porcelain">Porcelain</option>
              <option value="ceramic">Ceramic</option>
              <option value="crystal">Crystal</option>
            </select>
          </div>
        </div>
      </div>

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
                  className="px-4 py-2 bg-gray-300 text-black rounded-full cursor-pointer transition-all duration-[1250ms] hover:bg-black hover:text-white"
                  onClick={handleCancel}
                >
                  Yes
                </button>
                <button
                  className="px-4 py-2 bg-black text-gray-300 rounded-full cursor-pointer transition-all duration-[1250ms] hover:bg-gray-300 hover:text-black"
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