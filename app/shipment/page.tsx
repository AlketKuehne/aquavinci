import Link from "next/link";
import Image from "next/image";

export default function ShipmentPage() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      
      {/* Navigation Bar */}
      <nav className="w-full h-16 bg-[#242424] flex items-center px-4">
        {/* Klickbares Logo für die Homepage */}
        <Link href="/">
          <Image src="/logoname.png" alt="Logo" width={120} height={64} className="h-16 w-auto cursor-pointer" />
        </Link>

        {/* Navigation Links */}
        <div className="flex ml-8 h-full">
          <Link href="/" className="flex items-center justify-center px-6 text-lg text-white hover:bg-gray-600 h-full">
            Homepage
          </Link>
          <Link href="/shipment" className="flex items-center justify-center px-6 text-lg text-white hover:bg-gray-600 h-full">
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