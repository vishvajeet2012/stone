import type { Metadata } from "next";
import { Playfair_Display, Lato, Cinzel, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/Components/shared/header";
import Footer from "@/Components/shared/footer";
import { Toaster } from "@/Components/ui/sonner";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maitrii Stone Gallery",
  description: "Experience Timeless Elegance with Premium Stone Surfaces",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${lato.variable} ${cinzel.variable} ${montserrat.variable} font-sans antialiased`}
      >
        <Header/>
        {children}
        <Toaster />
        <Footer/>
      </body>
    </html>
  );
}
