"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";


import {
  Package,
  Mail,
  LogOut,
  Palette,
  User,
  FileText,
  Briefcase,
  Grid,
  LayoutDashboard
} from "lucide-react";
import api from "@/lib/axios";

export default function AdminDock() {
  const mouseX = useMotionValue(Infinity);
  const pathname = usePathname();

  if (pathname === "/admin/login" || pathname === "/admin/signup") {
    return null;
  }

  const handleLogout = async () => {
    try {
        await api.post("/auth/logout");
        window.location.href = "/admin/login";
    } catch (error) {
        console.error("Logout failed", error);
    }
  };

  const icons = [
    { title: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { title: "Products", icon: Package, href: "/admin/products" },
    { title: "Categories", icon: Grid, href: "/admin/categories" },
    { title: "Projects", icon: Briefcase, href: "/admin/projects" },
    { title: "Contacts", icon: Mail, href: "/admin/contacts" },
    { title: "Blogs", icon: FileText, href: "/admin/blogs" },
    { title: "Theme", icon: Palette, href: "/admin/theme" },
    { title: "Settings", icon: User, href: "/admin/settings" },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-end gap-3 px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl"
         onMouseMove={(e) => mouseX.set(e.pageX)}
         onMouseLeave={() => mouseX.set(Infinity)}
    >
      {icons.map((item, index) => (
        <DockIcon 
            key={index} 
            mouseX={mouseX} 
            title={item.title} 
            href={item.href} 
            isActive={pathname === item.href}
        >
            <item.icon className={cn(
                "w-full h-full transition-colors duration-200", 
                 pathname === item.href ? "text-white" : "text-warm-cream"
            )} />
        </DockIcon>
      ))}
      
      {/* Separator */}
      <div className="w-px h-10 bg-white/20 mx-1" />

       <div onClick={handleLogout}> {/* Wrap in div for click handler, keep DockIcon styling if possible, but DockIcon uses Link. Let's make DockIcon accept onClick or handle it here. */}
           <DockIcon mouseX={mouseX} title="Logout" href="#" isActive={false}>
                <LogOut className="w-full h-full text-red-400" />
           </DockIcon>
       </div>

    </div>
  );
}

function DockIcon({ 
    mouseX, 
    title, 
    children, 
    href, 
    isActive 
}: { 
    mouseX: MotionValue<number>, 
    title: string, 
    children: React.ReactNode, 
    href: string,
    isActive: boolean
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 400, damping: 12 });

  return (
    <Link href={href}>
        <motion.div
        ref={ref}
        style={{ width }}
        className={cn(
            "aspect-square rounded-xl border flex items-center justify-center relative group cursor-pointer shadow-lg transition-all duration-150",
            isActive 
                ? "bg-saddle-brown border-white/40 shadow-white/10 scale-110 ring-2 ring-white/20" 
                : "bg-saddle-brown/90 hover:bg-saddle-brown border-white/10 hover:border-white/30"
        )}
        >
            <div className="w-6 h-6 sm:w-8 sm:h-8 pointer-events-none">
                {children}
            </div>
            
            {/* Active Indicator Dot */}
             {isActive && (
                <span className="absolute -bottom-2 w-1.5 h-1.5 bg-white rounded-full shadow-md shadow-white/50" />
            )}
            
            {/* Tooltip */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 backdrop-blur-sm rounded-md text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white/10">
                {title}
            </div>
        </motion.div>
    </Link>
  );
}
