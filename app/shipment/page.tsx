import Link from "next/link";

export default function ShipmentPage() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      
      {/* Dünne, durchgehende Navigationsleiste */}
      <nav className="w-full h-6 bg-[#242424] flex">
        <Link href="/" className="flex items-center px-4 text-sm text-white hover:bg-gray-600 w-40">
          Homepage
        </Link>
        <Link href="/shipment" className="flex items-center px-4 text-sm text-white hover:bg-gray-600 w-40">
          Create Shipment
        </Link>
      </nav>

      {/* Seiteninhalt */}
      <div className="flex flex-col items-center justify-center flex-grow p-8">
        <h1 className="text-3xl font-bold">Shipment Page</h1>
        <p className="mt-4 text-lg">Welcome to the shipment page!</p>
      </div>
    </div>
  );
}