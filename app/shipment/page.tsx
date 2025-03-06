import Link from "next/link";
import Image from "next/image";

export default function ShipmentPage() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      
      {/* Navigation Bar */}
      <nav className="w-full h-12 bg-[#242424] flex items-center px-4">
        {/* Logo (ganz links) */}
        <Image src="/logoname.png" alt="Logo" width={100} height={40} className="h-10 w-auto" />

        {/* Navigation Links */}
        <div className="flex ml-8">
          <Link href="/" className="flex items-center px-6 text-sm text-white hover:bg-gray-600 h-full">
            Homepage
          </Link>
          <Link href="/shipment" className="flex items-center px-6 text-sm text-white hover:bg-gray-600 h-full">
            Create Shipment
          </Link>
        </div>
      </nav>

      {/* Seiteninhalt */}
      <div className="flex flex-col items-center justify-center flex-grow p-8">
        <h1 className="text-3xl font-bold">Shipment Page</h1>
        <p className="mt-4 text-lg">Welcome to the shipment page!</p>
      </div>
    </div>
  );
}