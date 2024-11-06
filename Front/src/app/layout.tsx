import type { Metadata } from "next";
import localFont from "next/font/local";
<<<<<<< HEAD
import "./globals.css";
import NavBarXL from "@/components/Navbar/NavBarXL";
import NavbarMovil from "@/components/Navbar/NavBarMobile";
import Footer from "@/components/footer/Footer";
import VoiceflowWidget from "@/components/VoiceflowWidget/VoiceflowWidget";
import BottomNavBar from "@/components/Navbar/BottomNavBar";
import { Suspense } from "react";
=======
import { Suspense } from "react";

import "./globals.css";
import NavBarXL from "@/components/Navbar/NavBarXL";
import Footer from "@/components/footer/Footer";
>>>>>>> 61873f34d2d182d63e05761a398fb60347262ca9

const geistSans = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Club Fellini - Bar",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen justify-between">

        <div className="hidden md:block">
          <Suspense fallback={<div>Cargando...</div>}>
            <NavBarXL />
          </Suspense>
        </div>
        <div className="block md:hidden">
          <NavbarMovil />
        </div>

        <main className="flex-grow">{children}</main>

        <Footer />

        <div className="block md:hidden">
          <BottomNavBar />
        </div>

        <VoiceflowWidget />
      </body>
    </html>
  );
}

