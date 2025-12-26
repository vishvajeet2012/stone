"use client";

import { usePathname } from "next/navigation";
import Header from "@/Components/shared/header";
import Footer from "@/Components/shared/footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Hide Header/Footer for routes starting with /admin
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Header />}
      {children}
      {!isAdmin && <Footer />}
    </>
  );
}
