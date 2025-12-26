import { Lato, Playfair_Display } from "next/font/google";
import "../../app/globals.css"; // Ensure globals are loaded
import AdminDock from "@/Components/admin/AdminDock";
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


export const metadata = {
  title: "Admin Dashboard | Maitrii Stone",
  description: "Administrative Panel",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${playfair.variable} ${lato.variable} font-lato antialiased min-h-screen bg-[#121212] text-white selection:bg-saddle-brown selection:text-white`}>
        {/* Main Content Area */}
        <main className="min-h-screen pb-32"> {/* Pattern background with padding for dock */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)', backgroundSize: '40px 40px' }}>
            </div>
            
            <div className="relative z-10 p-6 md:p-10">
                {children}
            </div>
        </main>

        {/* Persistent Admin Dock */}
        <AdminDock />
        
        <Toaster />
    </div>
  );
}

