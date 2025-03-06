import Image from "next/image";

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
        <p className="text-center font-bold text-xl sm:text-2xl w-full">VOM WASSER ÜBERWUNDEN</p>
        
        {/* Fließtext */}
        <p className="text-center text-sm sm:text-base font-[family-name:var(--font-geist-mono)] w-[500px]">
          Der Transport von Waren über See mit Containerschiffen ist eine kosteneffiziente und zuverlässige Lösung. Mit <strong>LCL</strong> teilen Sie sich den Platz und zahlen nur, was Sie nutzen. Für größere Sendungen gibt es <strong>FCL</strong>, bei dem Ihre Ware exklusiv in einem Container transportiert wird. Unsere globalen Verbindungen garantieren die schnellste Route und eine reibungslose Abwicklung. Sicherheit und Kundenzufriedenheit stehen an erster Stelle. Profitieren Sie von einem günstigen, sicheren und schnellen Seetransport – starten Sie noch heute!
        </p>

        {/* Buttons */}
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className=""
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Create Shipment
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
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
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
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
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
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
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
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