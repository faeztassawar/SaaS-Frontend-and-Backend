import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import localfont from "next/font/local";
import { DM_Sans } from "next/font/google";
import { Orbitron } from "next/font/google";
import AuthProvider from "@/lib/AuthProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const chillax = localfont({
  src: [
    {
      path: "./fonts/Chillax-Regular.otf",
      weight: "200 500 700 900 1100",
    },
  ],
  variable: "--font-chil",
});

const rose = localfont({
  src: [
    {
      path: "./fonts/Bitter Rose DEMO.otf",
      weight: "900",
    },
  ],
  variable: "--font-rose",
});

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm" });
const ob = Orbitron({ subsets: ["latin"], variable: "--font-ob" });

export const metadata: Metadata = {
  title: "DineDesign",
  description: "From Template to Table",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={`${dmSans.className} ${ob.variable} ${geistSans.variable} ${geistMono.variable} antialiased ${chillax.variable} ${rose.variable}`}
        >
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
