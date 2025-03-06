import Image from "next/image";

export default function Shipment() {
  return (
    <div className="grid grid-rows-[10px_1fr_20px] items-start justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-4 row-start-2 items-center sm:items-center w-full">
        
        {/* Header-Bild */}
        <Image
          className="mx-auto mt-[-100px] rounded-lg"
          src="/shipment.jpg" // Neues Bild für die Shipment-Seite
          alt="Shipment Image"
          width={400} 
          height={400} 
          priority
        />
        
        {/* Überschrift */}
        <p className="text-center font-bold text-xl sm:text-2xl w-full">CREATE YOUR SHIPMENT</p>
        
        {/* Beschreibung */}
        <p className="text-center text-sm sm:text-base font-[family-name:var(--font-geist-mono)] w-[500px]">
          Plan and manage your shipment easily with our reliable and efficient sea transport solutions. Choose between <strong>LCL</strong> and <strong>FCL</strong> options, and let us take care of the logistics for you.
        </p>

        {/* Zurück-Button */}
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="/"
          >
            Back to Home
          </a>
        </div>
      </main>
    </div>
  );
}
