"use client";

import { CheckCircle } from "lucide-react";

interface ContentAPProps {
  intro: string;
  pillarsTitle: string;
  pillars: string[];
  outro: string;
}

export const ContentAP = ({ intro, pillarsTitle, pillars, outro }: ContentAPProps) => {
  return (
    <section className="space-y-6 text-xl leading-relaxed py-8">
      <p>{intro}</p>
      <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 font-sans">
          {pillarsTitle}
        </h2>
        <ul className="space-y-3">
          {pillars.map((pillar, index) => (
            <li key={index} className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-green-500" />
              <span>{pillar}</span>
            </li>
          ))}
        </ul>
      </div>
      <p>{outro}</p>
    </section>
  );
};