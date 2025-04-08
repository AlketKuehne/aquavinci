"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import NavigationBar from "./NavigationBar";
import Boxes from "./Boxes";
import Popup from "./Popup";
import databank from "../../../utils/Databank";

function DetailsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const shipmentType = searchParams.get("shipmentType");
  const [showPopup, setShowPopup] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const shippingDate = searchParams.get("shippingDate");
  const minDeliveryDate = searchParams.get("minDeliveryDate");

  useEffect(() => {
    const authorized = sessionStorage.getItem("authorizedForDetails");
    if (authorized === "true" && shipmentType) {
      setIsAuthorized(true);
    } else {
      router.push("/create-shipment");
    }
  }, [shipmentType, router]);

  const handleNavigation = (url: string) => {
    setPendingNavigation(url);
    setShowPopup(true);
  };

  const handleStay = () => {
    setShowPopup(false); // Close the popup and stay on the current page
    setPendingNavigation(null);
  };

  const handleConfirmNavigation = () => {
    if (pendingNavigation) {
      router.push(pendingNavigation); // Navigate to the pending URL
    }
  };

  useEffect(() => {
    if (!showPopup && pendingNavigation) {
      handleConfirmNavigation();
    }
  }, [showPopup, pendingNavigation]);

  const [formData, setFormData] = useState({
    containerType: "",
    goodsDescription: "",
    packageType: "",
    numberOfPieces: "",
    dangerousGoods: "",
    shippingDate: "",
    deliveryDate: "",
    shipmentType: "",
    fclSelection: "",
    lclSelection: "",
    weight: "",
    height: "",
    length: "",
    width: "",
    isFragile: false,
    fragileCategory: "",
    fragileSubCategory: "",
    extraProtection: false,
    deliveryOption: "",
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {
    const existingData = databank.getData()[databank.getData().length - 1]; // Get the last saved row
    const updatedData = { ...existingData, ...formData }; // Merge new inputs with existing data
    databank.saveData(updatedData); // Save the updated data
    window.location.href = "/create-shipment/details/review&confirm"; // Navigate to the next page
  };

  return (
    <div className="flex flex-col items-center min-h-screen relative">
      {!isAuthorized ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
            <p className="text-lg">
              You can only access this page by completing the form on the Create Shipment page.
            </p>
            <Link href="/create-shipment">
              <button className="mt-4 px-6 py-3 bg-black text-white text-lg font-medium rounded-full transition-all duration-300 hover:bg-gray-300 hover:text-black">
                Go to Create Shipment
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <NavigationBar onNavigate={handleNavigation} />
          {showPopup && (
            <Popup
              onStay={handleStay} // Stay on the current page
              onLeave={() => {
                setShowPopup(false); // Close the popup
                if (pendingNavigation) {
                  router.push(pendingNavigation); // Navigate to the pending URL
                }
              }}
            />
          )}
          <Boxes 
            shipmentType={shipmentType} 
            shippingDate={shippingDate || ""} // Ensure shippingDate is a string
            minDeliveryDate={minDeliveryDate || ""} // Ensure minDeliveryDate is a string
          />
          <div className="flex flex-col items-center justify-start min-h-screen w-full px-8 pt-4">
            <h1 className="text-4xl font-extrabold mb-6 text-left">Shipment Details</h1>
            <form className="grid grid-cols-2 gap-4 w-full max-w-4xl">
              <div>
                <label className="block text-sm font-medium">Container Type</label>
                <input
                  type="text"
                  value={formData.containerType}
                  onChange={(e) => handleInputChange("containerType", e.target.value)}
                  className="border rounded p-2 w-full"
                />
              </div>
              {/* Add other input fields similarly */}
            </form>
            <button
              onClick={handleContinue}
              className="mt-6 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Continue
            </button>
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