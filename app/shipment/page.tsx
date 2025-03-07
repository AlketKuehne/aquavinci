import Link from "next/link";
import Image from "next/image";

export default function ShipmentPage() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="w-full h-12 bg-[#242424] flex items-center px-4">
        {/* Logo */}
        <Link href="/">
          <Image src="/logoname.png" alt="Logo" width={140} height={50} className="h-10 w-auto cursor-pointer" />
        </Link>

        {/* Navigation Links */}
        <div className="flex h-full ml-4">
          <Link
            href="/"
            className="flex items-center justify-center px-6 text-lg text-white transition-all duration-200 hover:bg-gray-200 hover:text-black h-full"
          >
            Homepage
          </Link>
          <Link
            href="/shipment"
            className="flex items-center justify-center px-6 text-lg text-white transition-all duration-200 hover:bg-gray-200 hover:text-black h-full"
          >
            Create Shipment
          </Link>
        </div>
      </nav>

      {/* Title */}
      <h1 className="text-5xl font-extrabold mt-20 mb-10 ml-16">Create Shipment</h1>

      {/* Form Section */}
      <div className="flex gap-10">
        {/* Sender Box */}
        <div className="bg-white shadow-lg p-6 rounded-lg w-96">
          <h2 className="text-xl font-bold mb-4">Consignor (Sender)</h2>
          <input type="text" placeholder="Full Name" className="w-full p-2 mb-3 border rounded-md bg-gray-100" />
          <input type="email" placeholder="Email Address" className="w-full p-2 mb-3 border rounded-md bg-gray-100" />
          <input type="tel" placeholder="Phone Number" className="w-full p-2 mb-3 border rounded-md bg-gray-100" />
          <input type="text" placeholder="Full Address" className="w-full p-2 mb-3 border rounded-md bg-gray-100" />
        </div>

        {/* Recipient Box */}
        <div className="bg-white shadow-lg p-6 rounded-lg w-96">
          <h2 className="text-xl font-bold mb-4">Consignee (Recipient)</h2>
          <input type="text" placeholder="Full Name" className="w-full p-2 mb-3 border rounded-md bg-gray-100" />
          <input type="email" placeholder="Email Address" className="w-full p-2 mb-3 border rounded-md bg-gray-100" />
          <input type="tel" placeholder="Phone Number" className="w-full p-2 mb-3 border rounded-md bg-gray-100" />
          <input type="text" placeholder="Full Address" className="w-full p-2 mb-3 border rounded-md bg-gray-100" />
        </div>
      </div>
    </div>
  );
}