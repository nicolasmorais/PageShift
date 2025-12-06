"use client";

interface HeaderAPProps {
  preTitle: string;
  title: string;
}

export const HeaderAP = ({ preTitle, title }: HeaderAPProps) => {
  return (
    <header className="text-center py-10 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-4xl mx-auto px-4">
        <p className="text-sm text-blue-600 font-semibold uppercase tracking-wider">
          {preTitle}
        </p>
        <h1 className="mt-4 text-3xl md:text-5xl text-gray-900 dark:text-white leading-tight font-black">
          {title}
        </h1>
      </div>
    </header>
  );
};