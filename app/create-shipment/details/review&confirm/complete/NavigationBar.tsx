"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

export default function NavigationBar() {
  const router = useRouter(); // Initialize router
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setIsVisible(false); // Hide navbar on scroll down
      } else {
        setIsVisible(true); // Show navbar on scroll up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 w-full h-12 bg-[#242424] flex items-center px-4 z-10 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div
        className="flex items-center cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Image src="/logoname.png" alt="Logo" width={140} height={50} className="h-10 w-auto" />
      </div>
      <div className="flex h-full ml-4">
        <div
          className="flex items-center justify-center px-6 text-lg text-white bg-[#242424] transition-all duration-[1250ms] hover:bg-gray-200 hover:text-black h-full cursor-pointer"
          onClick={() => router.push("/")}
        >
          Homepage
        </div>
        <div
          className="flex items-center justify-center px-6 text-lg text-white bg-[#242424] transition-all duration-[1250ms] hover:bg-gray-200 hover:text-black h-full cursor-pointer"
          onClick={() => router.push("/create-shipment")}
        >
          Create Shipment
        </div>
      </div>
    </nav>
  );
}
