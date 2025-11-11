import "@/styles/globals.css";

import clsx from "clsx";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Lusitana } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lusitanaSerif = Lusitana({
  variable: "--font-lusitana-serif",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Invoify",
    default: "Invoify",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body
        className={clsx(
          geistSans.variable,
          geistMono.variable,
          lusitanaSerif.variable,
          "font-sans antialiased",
        )}
      >
        {children}
      </body>
    </html>
  );
}
