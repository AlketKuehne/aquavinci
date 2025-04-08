"use client";

import NavigationBar from "./NavigationBar";

export default function ReviewAndConfirmPage() {
  const handleNavigate = (url: string) => {
    window.location.href = url; // Navigate to the specified URL
  };

  return (
    <div>
      <NavigationBar onNavigate={handleNavigate} />
      <div className="pt-16 px-8">
        <h1 className="text-4xl font-bold mb-8">Review & Confirm</h1>
        <p className="text-lg text-gray-700">
          This is the Review & Confirm page. Add your content here.
        </p>
        {/* Add additional content for the page */}
      </div>
    </div>
  );
}
