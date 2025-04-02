"use client";

import Link from "next/link";
import Image from "next/image";

export default function NavigationBar({ onNavigate }: { onNavigate: (url: string) => void }) {
  return (
    <nav className="relative w-full h-12 bg-[#242424] flex items-center px-4 z-10">
      <Link
        href="/"
        className="flex items-center"
        onClick={(e) => {
          e.preventDefault();
          onNavigate("/");
        }}
      >
        <Image src="/logoname.png" alt="Logo" width={140} height={50} className="h-10 w-auto cursor-pointer" />
      </Link>
      <div className="flex h-full ml-4">
        <Link
          href="/"
          className="flex items-center justify-center px-6 text-lg text-white bg-[#242424] transition-all duration-[1250ms] hover:bg-gray-200 hover:text-black h-full"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("/");
          }}
        >
          Homepage
        </Link>
        <Link
          href="/create-shipment"
          className="flex items-center justify-center px-6 text-lg text-white bg-[#242424] transition-all duration-[1250ms] hover:bg-gray-200 hover:text-black h-full"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("/create-shipment");
          }}
        >
          Create Shipment
        </Link>
      </div>
    </nav>
  );
}
