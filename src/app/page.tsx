import { MadeWithDyad } from "@/components/made-with-dyad";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="grid grid-rows-[1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-1 items-center sm:items-start text-center">
        <h1 className="text-4xl font-bold">Welcome to the App</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          This is the home page. Check out the advertorial below.
        </p>
        <Link href="/advertorial" passHref>
          <Button size="lg">View Advertorial Page</Button>
        </Link>
      </main>
      <MadeWithDyad />
    </div>
  );
}