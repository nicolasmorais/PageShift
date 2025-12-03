import { MadeWithDyad } from "@/components/made-with-dyad";

export default function Home() {
  return (
    <div className="grid grid-rows-[1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-1 items-center text-center">
        <h1 className="text-5xl font-bold">Sua Aplicação</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Comece a construir seu projeto.
        </p>
      </main>
      <MadeWithDyad />
    </div>
  );
}