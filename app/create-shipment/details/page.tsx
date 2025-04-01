"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from 'next/navigation';

function DetailsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams(); // Suspense-enabled hook
  const shipmentType = searchParams.get("shipmentType"); // Get shipment type from query params
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [fclSelection, setFclSelection] = useState<string | null>(null);
  const [lclSelection, setLclSelection] = useState<string | null>(null);
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [length, setLength] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [isFragile, setIsFragile] = useState(false);
  const [fragileCategory, setFragileCategory] = useState<string | null>(null);
  const [fragileSubCategory, setFragileSubCategory] = useState<string | null>(null);
  const [extraProtection, setExtraProtection] = useState(false); // State for extra protection checkbox

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

  useEffect(() => {
    // Check session storage for authorization
    const authorized = sessionStorage.getItem("authorizedForDetails");
    if (authorized === "true" && shipmentType) {
      setIsAuthorized(true);
    } else {
      router.push('/create-shipment'); // Redirect if not authorized
    }
  }, [shipmentType, router]);

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

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (showCancelPopup) {
        e.preventDefault();
        e.returnValue = ''; // Required for modern browsers to show the confirmation dialog
      } else {
        setShowCancelPopup(true); // Show the popup when attempting to leave
        e.preventDefault();
      }
    };

    const handlePopState = () => {
      setShowCancelPopup(true); // Show the popup when navigating via the browser's back/forward buttons
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [showCancelPopup]);

  const handleYes = () => {
    setShowCancelPopup(false);
    window.removeEventListener('beforeunload', () => {}); // Allow navigation
    if (pendingNavigation) {
      router.push(pendingNavigation);
    } else {
      window.location.reload(); // Handle reload case
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen relative">
      {!isAuthorized ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
            <p className="text-lg">You can only access this page by completing the form on the Create Shipment page.</p>
            <Link href="/create-shipment">
              <button className="mt-4 px-6 py-3 bg-black text-white text-lg font-medium rounded-full transition-all duration-300 hover:bg-gray-300 hover:text-black">
                Go to Create Shipment
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Navigation Bar */}
          <nav className={`relative w-full h-12 bg-[#242424] flex items-center px-4 z-10`}>
            <Link
              href="/"
              className="flex items-center"
              onClick={(e) => {
                e.preventDefault();
                setPendingNavigation('/');
                setShowCancelPopup(true); // Ensure the popup is shown
              }}
            >
              <Image 
                src="/logoname.png" 
                alt="Logo" 
                width={140} 
                height={50} 
                className="h-10 w-auto cursor-pointer"
              />
            </Link>
            <div className="flex h-full ml-4">
              <Link
                href="/"
                className="flex items-center justify-center px-6 text-lg text-white bg-[#242424] transition-all duration-[1250ms] hover:bg-gray-200 hover:text-black h-full"
                onClick={(e) => {
                  e.preventDefault();
                  setPendingNavigation('/');
                  setShowCancelPopup(true); // Ensure the popup is shown
                }}
              >
                Homepage
              </Link>
              <Link
                href="/create-shipment"
                className="flex items-center justify-center px-6 text-lg text-white bg-[#242424] transition-all duration-[1250ms] hover:bg-gray-200 hover:text-black h-full"
                onClick={(e) => {
                  e.preventDefault();
                  setPendingNavigation('/create-shipment');
                  setShowCancelPopup(true); // Ensure the popup is shown
                }}
              >
                Create Shipment
              </Link>
            </div>
          </nav>

          {/* Cancel Popup */}
          {showCancelPopup && (
            <div
              className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center pointer-events-auto"
            >
              <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative text-center z-10">
                <h2 className="text-lg font-bold mb-6">Are you certain you wish to leave this page? Unsaved changes will be lost.</h2>
                <div className="flex justify-center gap-8 mt-6">
                  <button
                    className="px-8 py-4 bg-gray-300 text-black rounded-full transition-all duration-[1250ms] hover:bg-black hover:text-white cursor-pointer"
                    onClick={() => {
                      setShowCancelPopup(false); // Close the popup and stay on the current page
                    }}
                  >
                    No
                  </button>
                  <button
                    className="px-8 py-4 bg-black text-white rounded-full transition-all duration-[1250ms] hover:bg-gray-300 hover:text-black cursor-pointer"
                    onClick={() => {
                      setShowCancelPopup(false);
                      if (pendingNavigation) {
                        router.push(pendingNavigation); // Navigate to the pending URL
                      } else {
                        window.location.reload(); // Reload the page if no pending navigation
                      }
                    }}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Page Content */}
          <div className="flex flex-col items-start w-full max-w-6xl mt-4 px-8">
            <h1 className="text-4xl font-extrabold mb-8 self-start">Details</h1>

            {/* FCL and LCL Boxes */}
            <div className="flex justify-between w-full gap-x-4">
              {/* Box for FCL */}
              <div className={`bg-white p-6 shadow-lg rounded-lg w-1/2 ${shipmentType === "LCL" ? "opacity-50 pointer-events-none" : ""}`}>
                <h2 className="text-lg font-bold mb-4">Full Container Load</h2>
                <input
                  id="fclQuantity"
                  type="text"
                  placeholder="Enter number of containers"
                  value={fclSelection || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^(?:[1-9][0-9]?|100)?$/.test(value)) {
                      setFclSelection(value);
                    }
                  }}
                  className="w-full p-3 border rounded bg-gray-100"
                  aria-label="FCL Quantity"
                />
              </div>

              {/* Box for LCL */}
              <div className={`bg-white p-6 shadow-lg rounded-lg w-1/2 ${shipmentType === "FCL" ? "opacity-50 pointer-events-none" : ""}`}>
                <h2 className="text-lg font-bold mb-4">Less Container Load</h2>
                <input
                  id="lclQuantity"
                  type="text"
                  placeholder="Enter number of packages"
                  value={lclSelection || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^(?:[1-9][0-9]?|100)?$/.test(value)) {
                      setLclSelection(value);
                    }
                  }}
                  className="w-full p-3 border rounded bg-gray-100"
                  aria-label="LCL Quantity"
                />
              </div>
            </div>

            {/* Size & Weight Details, Fragile Item Boxes */}
            <div className="flex justify-between w-full mt-4 gap-x-4">
              {/* Box for Size & Weight Details */}
              <div className="bg-white p-6 shadow-lg rounded-lg w-1/2">
                <h2 className="text-lg font-bold mb-4">Size & Weight Details</h2> {/* Main header */}
                <h3 className="text-md font-semibold mb-2">Weight</h3> {/* Subheadline for Weight */}
                <input
                  type="number"
                  placeholder="Weight (in kg)"
                  value={weight}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (parseFloat(value) >= 0 || value === "") {
                      setWeight(value);
                    }
                  }}
                  className="w-full p-3 border rounded mb-4 bg-gray-100"
                  aria-label="Weight"
                />
                <h3 className="text-md font-semibold mb-2">Dimensions</h3> {/* Subheadline for Dimensions */}
                <input
                  type="number"
                  placeholder="Height (in m)"
                  value={height}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (parseFloat(value) >= 0 || value === "") {
                      setHeight(value);
                    }
                  }}
                  className="w-full p-3 border rounded mb-3 bg-gray-100"
                  aria-label="Height"
                />
                <input
                  type="number"
                  placeholder="Length (in m)"
                  value={length}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (parseFloat(value) >= 0 || value === "") {
                      setLength(value);
                    }
                  }}
                  className="w-full p-3 border rounded mb-3 bg-gray-100"
                  aria-label="Length"
                />
                <input
                  type="number"
                  placeholder="Width (in m)"
                  value={width}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (parseFloat(value) >= 0 || value === "") {
                      setWidth(value);
                    }
                  }}
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
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setIsFragile(isChecked);
                      if (!isChecked) {
                        setFragileCategory(null); // Reset category
                        setFragileSubCategory(null); // Reset subcategory
                        setExtraProtection(false); // Immediately reset extra protection checkbox
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
                  {Object.keys(fragileSubCategories).map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>

                {/* Subcategory Section */}
                <h3 className="text-md font-semibold mb-2">
                  {fragileCategory === "other" ? "Specify Other Category" : fragileCategory ? `Select ${fragileCategory}` : "Subcategory"}
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
                <div className="flex items-center mt-6">
                  <input
                    type="checkbox"
                    id="extraProtection"
                    checked={extraProtection}
                    onChange={() => setExtraProtection(!extraProtection)}
                    className="w-5 h-5"
                    disabled={!isFragile}
                    aria-label="Request Additional Protection"
                  />
                  <label htmlFor="extraProtection" className="ml-2 text-lg font-medium">
                    Would you like to request extra protection for fragile items?
                  </label>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function DetailsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DetailsPageContent />
    </Suspense>
  );
}