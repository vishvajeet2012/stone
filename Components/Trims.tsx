"use client";

import React from "react";
import Image from "next/image";

export type TrimItem = {
  id: string;
  name: string;
  dimensions: string;
  sku: string;
  image: string;
};

interface TrimsProps {
  items: TrimItem[];
}

export function Trims({ items }: TrimsProps) {
  return (
    <div className="w-full py-12 border-t border-saddle-brown/10">
      <div className="flex items-center gap-2 mb-8">
        <span className="text-saddle-brown">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H20V20H4V4Z" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
                <path d="M4 14H20" stroke="currentColor" strokeWidth="1.5" />
                <path d="M14 4V20" stroke="currentColor" strokeWidth="1.5" />
             </svg>
        </span>
        <h2 className="text-lg font-bold uppercase text-saddle-brown tracking-widest">Trims</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10">
        {items.map((item) => (
          <div key={item.id} className="group cursor-pointer">
            <div className="aspect-[4/3] bg-modern-earthy/5 mb-4 relative overflow-hidden rounded-sm">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                />
            </div>
            
            <div className="space-y-1">
                <p className="text-[10px] font-medium text-modern-earthy/60">{item.dimensions}</p>
                <h3 className="text-xs font-bold uppercase text-saddle-brown leading-tight group-hover:underline decoration-saddle-brown/50 underline-offset-4">
                    {item.name}
                </h3>
                <p className="text-[10px] text-modern-earthy/40 uppercase tracking-wider">ID#: {item.sku}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
