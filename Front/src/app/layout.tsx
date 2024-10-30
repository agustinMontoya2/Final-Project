import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import NavBarXL from "@/components/NavBarXL/NavBarXL";
import Footer from "@/components/footer/Footer";

// import ConditionalLayouts from "../components/ConditionalLayouts/ConditionalLayouts";




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
      <body
        className="flex flex-col min-h-screen justify-between"
      >
        {/* <UserProvider> */}





        {/* <ConditionalLayouts> */}
        <NavBarXL></NavBarXL>
        {children}
        <Footer></Footer>
        {/* </ConditionalLayouts> */}

        {/* </UserProvider> */}
      </body>
    </html>
  );
}

