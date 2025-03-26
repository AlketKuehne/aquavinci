"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function DetailsPage() {
  const router = useRouter();
  const [showCancelPopup, setShowCancelPopup] = useState(false);

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

  const handleCancel = () => {
    setShowCancelPopup(false);
    router.push('/');
  };

  const handleStay = () => {
    setShowCancelPopup(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      {/* Navigation Bar */}
      <nav className="relative w-full h-12 bg-[#242424] flex items-center px-4 z-10">
        {/* Clickable Logo (Fixed Size, No Overlap) */}
        <Link href="/" className="flex items-center">
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
          >
            Homepage
          </Link>
          <Link
            href="/create-shipment"
            className="flex items-center justify-center px-6 text-lg text-white bg-[#242424] transition-all duration-[1250ms] hover:bg-gray-200 hover:text-black h-full"
          >
            Create Shipment
          </Link>
        </div>
      </nav>

      {/* Page Content */}
      <div className="flex flex-col items-start w-full max-w-6xl mt-12 px-8">
        <h1 className="text-4xl font-extrabold mb-8 self-start">Details Page</h1>
        <p>Welcome to the details page of the shipment creation process.</p>
      </div>

      {showCancelPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-96 z-10">
            <div className="text-black text-lg mb-4 text-center">
              Are you sure you want to cancel your shipment?
            </div>
            <div className="flex justify-around">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-full cursor-pointer"
                onClick={handleCancel}
              >
                Yes
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-black rounded-full cursor-pointer"
                onClick={handleStay}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
