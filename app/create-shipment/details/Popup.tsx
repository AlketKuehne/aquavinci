"use client";

export default function Popup({ onStay, onLeave }: { onStay: () => void; onLeave: () => void }) {
  return (
    <div
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} // Force background opacity with inline styles
      className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center pointer-events-auto"
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative text-center z-10">
        <h2 className="text-lg font-bold mb-6">You have unsaved changes. Are you sure you want to leave this page?</h2>
        <div className="flex justify-center gap-10 mt-6">
          <button
            className="px-8 py-4 bg-gray-300 text-black text-base rounded-full transition-all duration-[1250ms] hover:bg-black hover:text-white cursor-pointer"
            onClick={onLeave} // Ensure this calls the onLeave function to leave the page
          >
            Yes
          </button>
          <button
            className="px-8 py-4 bg-black text-white text-base rounded-full transition-all duration-[1250ms] hover:bg-gray-300 hover:text-black cursor-pointer"
            onClick={onStay} // Ensure this calls the onStay function to stay on the page
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
