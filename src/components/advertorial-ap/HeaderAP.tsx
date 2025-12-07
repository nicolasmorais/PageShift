"use client";

interface HeaderAPProps {
  preTitle: string;
  title: string;
  subheadline: string;
}

export const HeaderAP = ({ preTitle, title, subheadline }: HeaderAPProps) => {
  return (
    <header className="text-center pt-10 pb-6">
      <div className="max-w-4xl mx-auto px-4">
        <p className="text-sm text-blue-600 font-semibold uppercase tracking-wider">
          {preTitle}
        </p>
        <h1 className="mt-4 text-3xl md:text-5xl text-gray-900 leading-tight font-black">
          {title}
        </h1>
        {subheadline && (
          <h2 className="mt-4 text-xl md:text-2xl font-medium text-gray-700">
            {subheadline}
          </h2>
        )}
      </div>
    </header>
  );
};