"use client";

import React from "react";
import { LayoutGrid, ShieldCheck, Settings2 } from "lucide-react";

export default function ExportInfo() {
  const features = [
    {
      icon: <LayoutGrid size={48} strokeWidth={1} />,
      title: "WIDE VARIETY",
    },
    {
      icon: <ShieldCheck size={48} strokeWidth={1} />,
      title: "INTEGRITY",
    },
    {
      icon: <Settings2 size={48} strokeWidth={1} />,
      title: "CUSTOMIZED APPROACH",
    },
  ];

  return (
    <section className="w-full py-20 bg-stone-100/50 border-y border-stone-200 relative overflow-hidden">
      {/* Decorative Floral SVGs */}
      <div className="absolute top-0 left-0 w-[250px] h-[250px] z-0 opacity-10 pointer-events-none -translate-x-12 -translate-y-12">
        <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 100 Q 120 40 180 100 Q 120 160 100 100" stroke="#8B4513" strokeWidth="1" />
          <path d="M100 100 Q 40 120 100 180 Q 160 120 100 100" stroke="#8B4513" strokeWidth="1" />
          <path d="M100 100 Q 80 160 20 100 Q 80 40 100 100" stroke="#8B4513" strokeWidth="1" />
          <path d="M100 100 Q 160 80 100 20 Q 40 80 100 100" stroke="#8B4513" strokeWidth="1" />
        </svg>
      </div>

      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] z-0 opacity-10 pointer-events-none translate-x-12 translate-y-12 rotate-45">
        <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="15" stroke="#8B4513" strokeWidth="1" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <path key={i} d={`M 100 100 L ${100 + 80 * Math.cos(angle * Math.PI / 180)} ${100 + 80 * Math.sin(angle * Math.PI / 180)}`} stroke="#8B4513" strokeWidth="0.5" strokeDasharray="5 5" />
          ))}
          <path d="M100 100 C 150 50 150 150 100 100" stroke="#C4A484" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 text-center relative z-10">
        <h2 className="text-xl md:text-2xl font-playfair font-bold tracking-[0.2em] text-saddle-brown mb-8 uppercase">
          LAMSOUR UNIVERSAL EXPORTS
        </h2>
        
        <p className="max-w-4xl mx-auto text-stone-600 leading-relaxed mb-16 text-sm md:text-base font-lato font-light">
          Lamsour Universal Exports is one of the leading manufacturers, exporters, suppliers, and wholesalers of Indian natural stones, such as granite, marble, sandstone, slate, quartzite, limestone, and stone articles. The natural stone exporter supplies products like rough blocks, countertops, tiles, gangsaw slabs, cutter slabs along with different stone articles & monuments to customers based in the USA, Europe, Australia, South Africa, Hong Kong and many other countries around the globe.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center group">
              <div className="text-saddle-brown mb-6 transition-transform group-hover:text-modern-earthy duration-500 group-hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="text-sm font-playfair font-bold tracking-widest text-saddle-brown group-hover:text-modern-earthy transition-colors duration-300">
                {feature.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

