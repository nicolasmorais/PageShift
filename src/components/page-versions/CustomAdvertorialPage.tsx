import { getDb, CustomAdvertorial } from '@/lib/database';
import { BlockRenderer } from '@/components/advertorial-dynamic/BlockRenderer';
import { FooterAP } from '@/components/advertorial-ap/FooterAP'; // Reusing the dynamic footer
import { notFound } from 'next/navigation';
import type { Metadata } from "next";

interface CustomAdvertorialPageProps {
    advertorialId: string;
}

// Function to generate metadata dynamically
export async function generateMetadata({ advertorialId }: CustomAdvertorialPageProps): Promise<Metadata> {
  const db = await getDb();
  const advertorial = db.data.customAdvertorials.find(a => a.id === advertorialId);
  
  if (!advertorial) {
    return { title: "Conteúdo Não Encontrado" };
  }

  return {
    title: advertorial.header.title || "Advertorial Dinâmico",
    description: advertorial.header.subheadline,
  };
}

// Component to render the header
const DynamicHeader = ({ preTitle, title, subheadline }: CustomAdvertorial["header"]) => (
    <header className="text-center pt-10 pb-6 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4">
            <p className="text-sm text-blue-600 font-semibold uppercase tracking-wider">
                {preTitle}
            </p>
            <h1 className="mt-4 text-3xl md:text-5xl text-gray-900 dark:text-white leading-tight font-black">
                {title}
            </h1>
            {subheadline && (
                <h2 className="mt-4 text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-300">
                    {subheadline}
                </h2>
            )}
        </div>
    </header>
);


export async function CustomAdvertorialPage({ advertorialId }: CustomAdvertorialPageProps) {
  const db = await getDb();
  const advertorial = db.data.customAdvertorials.find(a => a.id === advertorialId);
  const approvalPageContent = db.data.approvalPageContent; // Fetching footer data

  if (!advertorial) {
    notFound();
  }

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white font-merriweather min-h-screen">
      <div className="bg-gray-100 dark:bg-gray-800 text-center py-2">
        <p className="text-sm font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
          Advertorial
        </p>
      </div>
      
      <DynamicHeader {...advertorial.header} />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {advertorial.blocks.map((block) => (
          <BlockRenderer key={block.id} block={block} />
        ))}
      </main>
      
      {/* Reusing the dynamic footer from the Approval Page */}
      <FooterAP {...approvalPageContent.footer} />
    </div>
  );
}