"use client";

interface FooterAPProps {
  disclaimer: string;
  copyright: string;
}

export const FooterAP = ({ disclaimer, copyright }: FooterAPProps) => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="bg-gray-900 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center text-xs text-gray-400 space-y-3">
          <p>{disclaimer}</p>
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  );
};