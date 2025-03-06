import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[10px_1fr_20px] items-start justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start w-full">
        
        {/* ZENTRIERTES & WEIT NACH OBEN VERSCHOBENES BILD */}
        <Image
          className="mx-auto mt-[-150px] rounded-lg"
          src="/Screenshot.jpg"
          alt="Next.js logo"
          width={400} 
          height={400} 
          priority
        />
        
        {/* Slogan */}
        <p className="text-center font-bold text-lg sm:text-xl w-[400px]">VOM WASSER ÜBERWUNDEN</p>
        
        {/* Fließtext */}
        <p className="text-sm text-left sm:text-base font-[family-name:var(--font-geist-mono)] w-[400px]">
          Der Transport von Waren über See mit Containerschiffen ist eine kosteneffiziente und zuverlässige Möglichkeit, große Mengen sicher ans Ziel zu bringen. Doch nicht jeder benötigt einen ganzen Container – deshalb bieten wir flexible Lösungen für Ihre Fracht. Mit <strong>LCL ("Less Container Load")</strong> können Sie sich den Container mit anderen Kunden teilen und zahlen nur für den tatsächlich genutzten Platz. Falls Sie eine größere Sendung haben, steht Ihnen unser <strong>FCL ("Full Container Load")</strong> zur Verfügung, bei dem Ihre Ware exklusiv in einem eigenen Container transportiert wird. So haben Sie volle Kontrolle über Ihre Fracht und profitieren von einem schnellen Versand. 
          <br/><br/>Unsere weltweiten Verbindungen ermöglichen es uns, die effizienteste Route für Ihre Sendung zu wählen, damit Ihre Ware so schnell wie möglich ihr Ziel erreicht. Ihre Sicherheit und Zufriedenheit sind dabei unsere höchste Priorität. Wir arbeiten mit den wichtigsten Häfen weltweit zusammen und garantieren Ihnen eine reibungslose Abwicklung. Egal, ob kleine oder große Mengen – mit unseren Lösungen finden wir den passenden Transport für Sie. Nutzen Sie unsere Erfahrung und profitieren Sie von einem günstigen, sicheren und schnellen Seeweg für Ihre Fracht. 
          <br/><br/>Wir verstehen, dass Zeit und Kosten entscheidende Faktoren sind. Daher optimieren wir unsere Versandrouten kontinuierlich, um Ihnen den bestmöglichen Service zu bieten. Unsere Experten stehen Ihnen jederzeit beratend zur Seite, um die passende Lösung für Ihre individuellen Bedürfnisse zu finden. Lassen Sie sich beraten und starten Sie noch heute mit uns Ihren Seetransport!
        </p>
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