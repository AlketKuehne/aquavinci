"use client";

export default function CancelPopup({ onStay, onLeave }: { onStay: () => void; onLeave: () => void }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center pointer-events-auto">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative text-center z-10">
        <h2 className="text-lg font-bold mb-6">Are you certain you wish to leave this page? Unsaved changes will be lost.</h2>
        <div className="flex justify-center gap-8 mt-6">
          <button
            className="px-8 py-4 bg-gray-300 text-black rounded-full transition-all duration-[1250ms] hover:bg-black hover:text-white cursor-pointer"
            onClick={onStay} // Stay on the current page
          >
            No
          </button>
          <button
            className="px-8 py-4 bg-black text-white rounded-full transition-all duration-[1250ms] hover:bg-gray-300 hover:text-black cursor-pointer"
            onClick={onLeave} // Navigate to the pending URL
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
