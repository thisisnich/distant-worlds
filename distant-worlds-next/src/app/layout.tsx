import type { Metadata } from "next";
import { Orbitron, Inter } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "700", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Distant Worlds - Procedural Planet Collection",
  description: "Minted, not discovered. Weekly drops of procedurally generated planets created with Blender.",
  keywords: ["procedural art", "planets", "NFT", "Blender", "digital art", "space"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${inter.variable} font-inter antialiased`}>
        {children}
      </body>
    </html>
  );
}
