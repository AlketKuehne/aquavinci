import Link from "next/link";
import Image from "next/image";

export default function Details() {
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
        <h1 className="text-4xl font-extrabold mb-8 self-start">Next Page</h1>
        <p>Welcome to the next page of the shipment creation process.</p>
      </div>
    </div>
  );
}
