import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        
        {/* ZENTRIERTES & GRÖSSERES BILD */}
        <Image
          className="mx-auto rounded-lg mt-[-40px]"
          src="/Screenshot.jpg"
          alt="Next.js logo"
          width={400} 
          height={400} 
          priority
        />

        {/* Fließtext */}
        <p className="text-sm text-left sm:text-base font-[family-name:var(--font-geist-mono)]">
          Der Transport von Waren über See mit Containerschiffen ist eine kosteneffiziente und zuverlässige Möglichkeit, große Mengen sicher ans Ziel zu bringen. Doch nicht jeder benötigt einen ganzen Container – deshalb bieten wir flexible Lösungen für Ihre Fracht. Mit <strong>LCL ("Less Container Load")</strong> können Sie sich den Container mit anderen Kunden teilen und zahlen nur für den tatsächlich genutzten Platz. Falls Sie eine größere Sendung haben, steht Ihnen unser <strong>FCL ("Full Container Load")</strong> zur Verfügung, bei dem Ihre Ware exklusiv in einem eigenen Container transportiert wird. So haben Sie volle Kontrolle über Ihre Fracht und profitieren von einem schnellen Versand. Unsere weltweiten Verbindungen ermöglichen es uns, die effizienteste Route für Ihre Sendung zu wählen, damit Ihre Ware so schnell wie möglich ihr Ziel erreicht. Ihre Sicherheit und Zufriedenheit sind dabei unsere höchste Priorität. Wir arbeiten mit den wichtigsten Häfen weltweit zusammen und garantieren Ihnen eine reibungslose Abwicklung. Egal, ob kleine oder große Mengen – mit unseren Lösungen finden wir den passenden Transport für Sie. Nutzen Sie unsere Erfahrung und profitieren Sie von einem günstigen, sicheren und schnellen Seeweg für Ihre Fracht. Lassen Sie sich beraten und starten Sie noch heute mit uns Ihren Seetransport!
        </p>

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