"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// App Icons (Using standard logos or placeholders if originals strictly required)
// Since user provided specific URLs, we'll try to use them or better yet, Lucide icons for a cleaner, self-contained implementation if they fail,
// but let's stick to the visual style requested.
// To ensure reliability, I will use Lucide icons for the "Admin" context but styled to look like the dock apps.
// OR, if the user specifically wanted THOSE apps, I'd use them.
// Given "Admin Panel", standard apps like "Notion/Asana" might be placeholders.
// Let's implement a generic "Admin Dock" with Lucide icons representing admin features (Dashboard, Users, Products, Analytics, Settings, etc.)
// wrapped in the same interaction model.

import {
  LayoutDashboard,
  Users,
  Package,
  BarChart3,
  Settings,
  FileText,
  Mail,
  LogOut,
  Palette
} from "lucide-react";

export default function AdminDock() {
  const mouseX = useMotionValue(Infinity);
  const pathname = usePathname();

  const icons = [
    { title: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { title: "Users", icon: Users, href: "/admin/users" },
    { title: "Products", icon: Package, href: "/admin/products" },
    { title: "Analytics", icon: BarChart3, href: "/admin/analytics" },
    { title: "Blogs", icon: FileText, href: "/admin/blogs" },
    { title: "Inquiries", icon: Mail, href: "/admin/inquiries" },
    { title: "Theme", icon: Palette, href: "/admin/theme" },
    { title: "Settings", icon: Settings, href: "/admin/settings" },
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
      <div className="w-[1px] h-10 bg-white/20 mx-1" />

       <DockIcon mouseX={mouseX} title="Logout" href="/auth/login" isActive={false}>
            <LogOut className="w-full h-full text-red-400" />
       </DockIcon>

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
    mouseX: any, 
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

  const widthSync = useTransform(distance, [-150, 0, 150], [50, 80, 50]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <Link href={href}>
        <motion.div
        ref={ref}
        style={{ width }}
        className={cn(
            "aspect-square rounded-xl border flex items-center justify-center relative group cursor-pointer shadow-lg transition-all duration-300",
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
