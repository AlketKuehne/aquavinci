import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
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
            href="/shipment"
            className="flex items-center justify-center px-6 text-lg text-white bg-[#242424] transition-all duration-[1250ms] hover:bg-gray-200 hover:text-black h-full"
          >
            Create Shipment
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="grid items-center justify-items-center flex-grow p-8 pb-20 gap-6 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        
        {/* Centered Image */}
        <Image
          className="mx-auto mt-[-80px] rounded-lg"
          src="/Screenshot.jpg"
          alt="Next.js logo"
          width={400} 
          height={400} 
          priority
        />
        
        {/* Slogan (Right Under the Logo) */}
        <p className="text-center font-bold text-2xl sm:text-3xl w-full mt-2">
          OVERCOME BY WATER
        </p>
        
        {/* Description */}
        <p className="text-center text-sm sm:text-base font-[family-name:var(--font-geist-mono)] w-[500px] mt-2 mb-6">
          The transportation of goods by sea using container ships is a cost-effective and reliable solution. With <strong>LCL</strong> (Less Container Load), you share space and only pay for what you use. For larger shipments, <strong>FCL</strong> (Full Container Load) ensures your goods are transported exclusively in a dedicated container. Our global network guarantees the fastest route and a smooth process. Security and customer satisfaction are our top priorities. Benefit from affordable, secure, and fast sea transport – start today!
        </p>

        {/* Buttons */}
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link 
            href="/shipment"
            className="group rounded-full border border-transparent flex items-center justify-center text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 bg-[#242424] text-white transition-all duration-[1250ms] hover:bg-[#E5E5E5] hover:text-black focus:outline-none"
          >
            <Image 
              src="/vercel.ico" 
              alt="Vercel logomark" 
              width={20} 
              height={20} 
              className="mr-[8px] invert transition-all duration-[1250ms] group-hover:filter-none" 
            />
            Create Shipment
          </Link>

          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
