import Link from "next/link";
import Image from "next/image";

export default function ShipmentPage() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      
      {/* Navigation Bar */}
      <nav className="w-full h-12 bg-[#242424] flex items-center px-4 fixed top-0 left-0">
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

      {/* Title - Create Shipment */}
      <h1 className="text-5xl font-extrabold mt-20 mb-10 ml-[350px]">Create Shipment</h1>

      {/* Shipment Form - Two Parallel Boxes */}
      <div className="flex gap-12">
        {/* Consignor Box */}
        <div className="bg-white p-6 rounded-lg shadow-md w-96">
          <h2 className="text-xl font-bold mb-4">Consignor (Sender)</h2>
          <form className="flex flex-col gap-4">
            <input type="text" placeholder="Full Name" className="border border-gray-300 p-2 rounded-md w-full text-gray-600"/>
            <input type="email" placeholder="Email Address" className="border border-gray-300 p-2 rounded-md w-full text-gray-600"/>
            <input type="tel" placeholder="Phone Number" className="border border-gray-300 p-2 rounded-md w-full text-gray-600"/>
            <input type="text" placeholder="Full Address" className="border border-gray-300 p-2 rounded-md w-full text-gray-600"/>
          </form>
        </div>

        {/* Consignee Box */}
        <div className="bg-white p-6 rounded-lg shadow-md w-96">
          <h2 className="text-xl font-bold mb-4">Consignee (Recipient)</h2>
          <form className="flex flex-col gap-4">
            <input type="text" placeholder="Full Name" className="border border-gray-300 p-2 rounded-md w-full text-gray-600"/>
            <input type="email" placeholder="Email Address" className="border border-gray-300 p-2 rounded-md w-full text-gray-600"/>
            <input type="tel" placeholder="Phone Number" className="border border-gray-300 p-2 rounded-md w-full text-gray-600"/>
            <input type="text" placeholder="Full Address" className="border border-gray-300 p-2 rounded-md w-full text-gray-600"/>
          </form>
        </div>
      </div>

    </div>
  );
}
