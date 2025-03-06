import Image from "next/image";
import Link from "next/link"; 

export default function Home() {
  return (
    <div className="grid grid-rows-[10px_1fr_20px] items-start justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-4 row-start-2 items-center sm:items-center w-full">
        
        {/* ZENTRIERTES & WEIT NACH OBEN VERSCHOBENES BILD */}
        <Image
          className="mx-auto mt-[-100px] rounded-lg"
          src="/Screenshot.jpg"
          alt="Next.js logo"
          width={400} 
          height={400} 
          priority
        />
        
        {/* Slogan */}
        <p className="text-center font-bold text-xl sm:text-2xl w-full">OVERCOME BY WATER</p>
        
        {/* Fließtext */}
        <p className="text-center text-sm sm:text-base font-[family-name:var(--font-geist-mono)] w-[500px]">
          The transportation of goods by sea using container ships is a cost-effective and reliable solution. With <strong>LCL</strong> (Less Container Load), you share space and only pay for what you use. For larger shipments, <strong>FCL</strong> (Full Container Load) ensures your goods are transported exclusively in a dedicated container. Our global network guarantees the fastest route and a smooth process. Security and customer satisfaction are our top priorities. Benefit from affordable, secure, and fast sea transport – start today!
        </p>

        {/* Buttons */}
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link 
            href="/shipment"
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            <Image src="/vercel.svg" alt="Vercel logomark" width={20} height={20} />
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