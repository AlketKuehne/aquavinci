"use client";

import NavigationBar from "./NavigationBar"; // Corrected import path

export default function CompletePage() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full px-8 pt-4">
      <NavigationBar />
      <div className="flex flex-col items-center justify-center w-full mt-12">
        <h1 className="text-4xl font-extrabold text-green-600 mb-6">
          Your Shipment was Successful!
        </h1>
        <p className="text-lg text-gray-700">
          Thank you for using our service. You can now track your shipment or create a new one.
        </p>
      </div>
    </div>
  );
}
