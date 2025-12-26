"use client";

import React from "react";
import Image from "next/image";

// Placeholder Certificates - In real app these would be actual cert images
const certificates = [
  { name: "ISO 9001", src: "https://placehold.co/150x200/f5f1ed/885a2b?text=ISO+9001" },
  { name: "Green Guard", src: "https://placehold.co/150x200/f5f1ed/885a2b?text=Green+Guard" },
  { name: "CE Marking", src: "https://placehold.co/150x200/f5f1ed/885a2b?text=CE+Marking" },
  { name: "LEED Gold", src: "https://placehold.co/150x200/f5f1ed/885a2b?text=LEED+Gold" },
];

export default function Certificates() {
  return (
    <section className="w-full bg-warm-cream py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto border-t border-saddle-brown/10 pt-16">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
            <div className="text-center md:text-left">
                <span className="text-modern-earthy text-xs font-bold   tracking-widest uppercase mb-2 block">
                    Quality Assurance
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-saddle-brown">
                    Certifications & Standards
                </h2>
            </div>
             <p className="text-saddle-brown/80 font-sans max-w-md text-center md:text-right leading-relaxed text-sm md:text-base">
                We adhere to the highest global standards of sustainability and quality control, ensuring every stone meets rigorous benchmarks.
            </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
            {certificates.map((cert, index) => (
                <div key={index} className="group relative w-32 h-40 md:w-40 md:h-52 bg-white/50 border border-saddle-brown/10 rounded-xl p-4 flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:border-saddle-brown/30 bg-white">
                    <div className="relative w-full h-full grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100">
                        {/* 
                         Replace with valid Next/Image or SVG in production. 
                         Using text for placeholder clarity.
                        */}
                         <div className="w-full h-full flex flex-col items-center justify-center text-center">
                             <div className="w-12 h-12 rounded-full border-2 border-saddle-brown flex items-center justify-center mb-2">
                                <span className="text-2xl">🏆</span>
                             </div>
                             <span className="text-saddle-brown font-bold text-sm">{cert.name}</span>
                         </div>
                    </div>
                </div>
            ))}
        </div>

      </div>
    </section>
  );
}
