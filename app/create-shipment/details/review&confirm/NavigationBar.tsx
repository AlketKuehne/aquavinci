"use client";

import Link from "next/link";

export default function NavigationBar() {
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/">
              <a className="text-2xl font-bold text-black">AquaVinci</a>
            </Link>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link href="/create-shipment">
              <a className="text-gray-700 hover:text-black transition duration-300">Create Shipment</a>
            </Link>
            <Link href="/track-shipment">
              <a className="text-gray-700 hover:text-black transition duration-300">Track Shipment</a>
            </Link>
            <Link href="/support">
              <a className="text-gray-700 hover:text-black transition duration-300">Support</a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
