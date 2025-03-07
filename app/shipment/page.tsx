import Link from "next/link";
import Image from "next/image";

export default function ShipmentPage() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      
      {/* Navigation Bar */}
      <nav className="w-full h-12 bg-[#242424] flex items-center px-4">
        {/* Clickable Logo for Homepage */}
        <Link href="/">
          <Image src="/logoname.png" alt="Logo" width={140} height={50} className="h-10 w-auto cursor-pointer" />
        </Link>

        {/* Navigation Links */}
        <div className="flex h-full ml-4">
          <Link
            href="/"
            className="flex items-center justify-center px-6 text-lg text-white bg-[#242424] transition-all duration-1250 hover:bg-gray-200 hover:text-black h-full"
          >
            Homepage
          </Link>
          <Link
            href="/shipment"
            className="flex items-center justify-center px-6 text-lg text-white bg-[#242424] transition-all duration-1250 hover:bg-gray-200 hover:text-black h-full"
          >
            Create Shipment
          </Link>
        </div>
      </nav>

      {/* "Create Shipment" Überschrift (größer, weiter unten & perfekt ausgerichtet) */}
      <h1 className="text-4xl font-bold mt-8 ml-[185px] self-start">
        Create Shipment
      </h1>

      {/* Page Content */}
      <div className="flex flex-col items-center justify-center flex-grow p-8">
        <p className="mt-4 text-lg">Welcome to the shipment page!</p>
      </div>
    </div>
  );
}