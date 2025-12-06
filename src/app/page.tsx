"use client";

import dynamic from "next/dynamic";

const WysiwygEditor = dynamic(
  () => import("@/components/editor/WysiwygEditor"),
  { ssr: false }
);

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-black rounded-lg shadow-lg p-4 sm:p-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-6 font-merriweather">
          Editor de Conteúdo
        </h1>
        <WysiwygEditor />
      </div>
    </main>
  );
}