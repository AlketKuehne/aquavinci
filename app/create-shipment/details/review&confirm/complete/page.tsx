"use client"; // This component is a client component

import NavigationBar from "./NavigationBar"; // Corrected import path
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter

export default function CompletePage() {
  const router = useRouter(); // Initialize router

  useEffect(() => {
    // Simulate order data
    const confirmedOrder = {
      id: Date.now(),
      status: "Confirmed",
      date: new Date().toISOString(),
    };

    // Save the order to the database
    fetch("/api/saveOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(confirmedOrder),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save order");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Order saved successfully:", data);
      })
      .catch((error) => {
        console.error("Error saving order:", error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full px-8 pt-4">
      <NavigationBar />
      <div className="flex flex-col items-center justify-center w-full mt-12">
        <h1 className="text-4xl font-extrabold text-green-600 mb-6">
          Your Shipment was Successful!
        </h1>
        <p className="text-lg text-gray-700">
          Thank you for using our service.
        </p>
      </div>
    </div>
  );
}
