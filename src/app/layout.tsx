import type { Metadata } from "next";
import { Geist, Geist_Mono, Merriweather, Space_Grotesk, Roboto, Open_Sans } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["400", "900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "PageShift - Gerenciamento de Advertoriais",
  description: "Plataforma completa para gerenciar e otimizar seus advertoriais dinamicamente.",
  icons: {
    icon: 'https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/94e94392-0815-4bb4-9cfa-ca4362c3495f%20%281%29%20%281%29%20%281%29-3fiBqRARoxDTImBJrinAorCbtuk9as.png',
    shortcut: 'https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/94e94392-0815-4bb4-9cfa-ca4362c3495f%20%281%29%20%281%29%20%281%29-3fiBqRARoxDTImBJrinAorCbtuk9as.png',
    apple: 'https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/94e94392-0815-4bb4-9cfa-ca4362c3495f%20%281%29%20%281%29%20%281%29-3fiBqRARoxDTImBJrinAorCbtuk9as.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Graphik Trial Font */}
        <link href="https://fonts.cdnfonts.com/css/graphik-trial" rel="stylesheet" />
        
        {/* Swetrix Tracking Script */}
        <script src="https://swetrix.org/swetrix.js" defer></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', function() {
                swetrix.init('FUBK8k33p9FP', {
                  apiURL: 'http://swetrixapi-jso0o0co04ww0kw8w4w0s4kg.147.93.179.152.sslip.io/log',
                });
                swetrix.trackViews();
              });
            `,
          }}
        />
        <noscript>
          <img
            src="http://swetrixapi-jso0o0co04ww0kw8w4w0s4kg.147.93.179.152.sslip.io/log/noscript?pid=FUBK8k33p9FP"
            alt=""
            referrerPolicy="no-referrer-when-downgrade"
          />
        </noscript>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${merriweather.variable} ${spaceGrotesk.variable} ${roboto.variable} ${openSans.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}