import Link from "next/link";
import Image from "next/image";

export default function ShipmentPage() {
  return (
    <div className="flex flex-col items-center min-h-screen p-8">
      
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

      {/* "Create Shipment" Überschrift */}
      <h1 className="text-4xl font-bold mt-12 ml-[440px] self-start">
        Create Shipment
      </h1>

      {/* Container für die beiden Kästen */}
      <div className="flex justify-center gap-12 mt-8">
        
        {/* Sender Box */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md w-96">
          <h2 className="text-xl font-bold mb-4">Consignor</h2>
          <input type="text" placeholder="Full Name" className="w-full p-2 mb-3 border border-gray-300 rounded-md placeholder-gray-500" />
          <input type="email" placeholder="Email Address" className="w-full p-2 mb-3 border border-gray-300 rounded-md placeholder-gray-500" />
          <input type="tel" placeholder="Phone Number" className="w-full p-2 mb-3 border border-gray-300 rounded-md placeholder-gray-500" />
          <input type="text" placeholder="Shipping Address" className="w-full p-2 border border-gray-300 rounded-md placeholder-gray-500" />
        </div>

        {/* Empfänger Box */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md w-96">
          <h2 className="text-xl font-bold mb-4">Consignee</h2>
          <input type="text" placeholder="Full Name" className="w-full p-2 mb-3 border border-gray-300 rounded-md placeholder-gray-500" />
          <input type="email" placeholder="Email Address" className="w-full p-2 mb-3 border border-gray-300 rounded-md placeholder-gray-500" />
          <input type="tel" placeholder="Phone Number" className="w-full p-2 mb-3 border border-gray-300 rounded-md placeholder-gray-500" />
          <input type="text" placeholder="Shipping Address" className="w-full p-2 border border-gray-300 rounded-md placeholder-gray-500" />
        </div>

      </div>
    </div>
  );
}