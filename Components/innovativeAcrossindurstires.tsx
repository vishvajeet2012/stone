"use client";

import Image from "next/image";
import { Timeline } from "@/Components/ui/timeline";


export default function InnovativeAcrossIndustries() {
  const data = [
    {
      title: "Energy",
      content: (
        <div className="relative rounded-xl overflow-hidden aspect-2/1 md:aspect-3/1 shadow-sm hover:shadow-lg transition-all group">
            <Image
                src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=800"
                alt="Energy Sector Stone"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-4 md:p-6">
                <h4 className="text-3xl capitalize font-semibold text-saddle-brown tracking-tight ">
                    Energy Infrastructure
                </h4>
                <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    <span className="bg-white/20 backdrop-blur-md text-warm-cream px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-semibold border border-white/10">Cladding</span>
                    <span className="bg-white/20 backdrop-blur-md text-warm-cream px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-semibold border border-white/10">Flooring</span>
                </div>
            </div>
        </div>
      ),
    },
    {
      title: "Metal",
      content: (
        <div className="relative rounded-xl overflow-hidden aspect-2/1 md:aspect-3/1 shadow-sm hover:shadow-lg transition-all group">
            <Image
                src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800"
                alt="Metal Industry Stone"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
             <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-4 md:p-6">
                <h4 className="text-xl md:text-2xl font-serif font-bold text-warm-cream mb-2 translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                    Foundry & Processing
                </h4>
                <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    <span className="bg-white/20 backdrop-blur-md text-warm-cream px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-semibold border border-white/10">Heat Resistant</span>
                    <span className="bg-white/20 backdrop-blur-md text-warm-cream px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-semibold border border-white/10">Durable</span>
                </div>
            </div>
        </div>
      ),
    },
    {
      title: "Mining",
      content: (
        <div className="relative rounded-xl overflow-hidden aspect-2/1 md:aspect-3/1 shadow-sm hover:shadow-lg transition-all group">
            <Image
                src="https://images.unsplash.com/photo-1541249780007-88339b4b9b21?auto=format&fit=crop&q=80&w=800"
                alt="Mining Sector"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-4 md:p-6">
                <h4 className="text-xl md:text-2xl font-serif font-bold text-warm-cream mb-2 translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                    Extraction Environments
                </h4>
                 <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    <span className="bg-white/20 backdrop-blur-md text-warm-cream px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-semibold border border-white/10">Robust</span>
                    <span className="bg-white/20 backdrop-blur-md text-warm-cream px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-semibold border border-white/10">High load</span>
                </div>
            </div>
        </div>
      ),
    },
    {
      title: "Solar",
      content: (
        <div className="relative rounded-xl overflow-hidden aspect-2/1 md:aspect-3/1 shadow-sm hover:shadow-lg transition-all group">
            <Image
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800"
                alt="Solar Energy"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-4 md:p-6">
                <h4 className="text-xl md:text-2xl font-serif font-bold text-warm-cream mb-2 translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                    Renewable Energy
                </h4>
                <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    <span className="bg-white/20 backdrop-blur-md text-warm-cream px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-semibold border border-white/10">Eco-Friendly</span>
                    <span className="bg-white/20 backdrop-blur-md text-warm-cream px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-semibold border border-white/10">Stable</span>
                </div>
            </div>
        </div>
      ),
    },
     {
      title: "Water Filtration",
      content: (
        <div className="relative rounded-xl overflow-hidden aspect-2/1 md:aspect-3/1 shadow-sm hover:shadow-lg transition-all group">
           <Image
                src="https://images.unsplash.com/photo-1519750292352-c9fc17322ed7?auto=format&fit=crop&q=80&w=800"
                alt="Water Filtration"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-4 md:p-6">
                <h4 className="text-xl md:text-2xl font-serif font-bold text-warm-cream mb-2 translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                    Purification Media
                </h4>
                <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    <span className="bg-white/20 backdrop-blur-md text-warm-cream px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-semibold border border-white/10">Silica Sand</span>
                    <span className="bg-white/20 backdrop-blur-md text-warm-cream px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-semibold border border-white/10">Garnet</span>
                </div>
            </div>
        </div>
      ),
    },
     {
      title: "Other Industries",
      content: (
        <div className="relative rounded-xl overflow-hidden aspect-2/1 md:aspect-3/1 shadow-sm hover:shadow-lg transition-all group">
            <Image
                src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800"
                alt="Other Industries"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
             <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-4 md:p-6">
                <h4 className="text-xl md:text-2xl font-serif font-bold text-warm-cream mb-2 translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                    Versatile Solutions
                </h4>
                <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    <span className="bg-white/20 backdrop-blur-md text-warm-cream px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-semibold border border-white/10">Chemical</span>
                    <span className="bg-white/20 backdrop-blur-md text-warm-cream px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-semibold border border-white/10">Abrasives</span>
                </div>
            </div>
        </div>
      ),
    },
  ];
  return (
    <div className="w-full bg-warm-cream pb-24">
      <div className="max-w-7xl mx-auto pt-20 px-4 md:px-8">
         <h2 className="text-3xl md:text-5xl font-serif font-bold text-saddle-brown mb-4 tracking-tight">
             Innovative Across Industries
         </h2>
         <p className="text-modern-earthy text-lg max-w-2xl font-sans">
             Serving diverse sectors with precision-engineered natural stone and mineral solutions.
         </p>
      </div>
      <Timeline data={data} />
    </div>
  );
}