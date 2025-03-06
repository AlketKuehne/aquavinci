import Link from "next/link";

export default function ShipmentPage() {
  return (
    <div className="flex flex-col items-center min-h-screen p-8">
      
      {/* Navigation Leiste */}
      <nav className="w-full flex justify-between items-center p-4 bg-gray-200 shadow-md">
        <Link href="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Homepage
        </Link>
        <Link href="/shipment" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Create Shipment
        </Link>
      </nav>

      {/* Seiteninhalt */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-3xl font-bold">Shipment Page</h1>
        <p className="mt-4 text-lg">Welcome to the shipment page!</p>
      </div>
    </div>
  );
}