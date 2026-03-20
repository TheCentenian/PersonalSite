import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Centenian | Web3 Infrastructure Builder",
  description:
    "Sui ecosystem builder. Product architect. Systems thinker. Building experimental apps around blockchain UX, asset ownership, and event-driven systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${font.variable} h-full`}>
      <body className="h-screen flex flex-col antialiased font-sans overflow-hidden">
        <Nav />
        <main className="flex-1 min-h-0 flex flex-col overflow-hidden">
          <div className="flex-1 min-h-0 flex flex-col">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
