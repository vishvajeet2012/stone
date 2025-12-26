"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Heart, 
  Box, 
  MapPin, 
  CheckSquare, 
  Share2, 
  Facebook, 
  Twitter, 
  Layers, 
  Maximize2,
  Camera
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProductDetailPage() {
  const [activeTab, setActiveTab] = useState<string>("SPECS");
  const [selectedImage, setSelectedImage] = useState<number>(0);

  const images = [
    "/stone1.jpg", 
    "/stone2.jpg", 
    "/stone3.jpg"
  ];

  const specs = [
    { label: "SERIES NAME(S)", value: "Wayne Parc Reserve" },
    { label: "PRIMARY COLOR(S)", value: "Blonde" },
    { label: "THICKNESS", value: "12MM" },
    { label: "STYLE", value: "Wood" },
    { label: "WEAR LAYER", value: "30MIL" },
    { label: "ENVIRONMENTAL", value: "Greenguard Gold, FloorScore, USGBC LEED Certified" },
    { label: "RADIANT HEATING", value: "YES - See Installation Instructions for Details" },
    { label: "ADDITIONAL RESOURCES", value: "Disclaimer" },
  ];

  return (
    <div className="min-h-screen bg-white font-lato text-modern-earthy pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        
        <div className="md:hidden flex justify-end gap-4 mb-4 text-modern-earthy/60">
             <Share2 className="w-5 h-5" />
             <Facebook className="w-5 h-5" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-7 flex flex-col md:flex-row gap-4">
            
            <div className="hidden md:flex flex-col gap-4 w-24 shrink-0">
               {images.map((img, idx) => (
                 <button 
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={cn(
                    "relative w-full aspect-square border-2 transition-all",
                    selectedImage === idx ? "border-saddle-brown" : "border-transparent"
                  )}
                 >
                   <div className="relative w-full h-full bg-gray-100">
                    <p className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">IMG {idx + 1}</p>
                   </div>
                   {idx === 0 && <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-[10px] py-1 text-center uppercase">Detail</div>}
                   {idx === 1 && <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-[10px] py-1 text-center uppercase leading-tight">View in Room</div>}
                 </button>
               ))}
            </div>

            <div className="flex-1 space-y-6">
                <div className="relative w-full aspect-[4/3] bg-[#E5C687] overflow-hidden group">
                     <div className="absolute top-6 left-6 z-10">
                        <button className="bg-black/40 backdrop-blur-sm text-white px-4 py-3 flex flex-col items-center gap-1 hover:bg-black/60 transition-colors">
                            <Layers className="w-5 h-5" />
                            <span className="text-[10px] uppercase font-bold tracking-wider">Room Scenes</span>
                        </button>
                     </div>
                     <div className="absolute top-6 right-6 z-10">
                        <button className="bg-white/80 p-2 rounded-full hover:bg-white text-saddle-brown transition-colors">
                            <Heart className="w-6 h-6" />
                        </button>
                     </div>
                     
                     <div className="absolute inset-0 bg-[url('https://www.msisurfaces.com/images/vinyl-flooring/room-scenes/large/wayne-parc-reserve-elwood.jpg')] bg-cover bg-center" />

                     <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
                        <button className="bg-black/60 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-black/80 transition-colors">
                            <Maximize2 className="w-4 h-4" /> Click to expand
                        </button>
                     </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button className="bg-saddle-brown text-white py-4 px-6 uppercase font-bold tracking-widest text-sm hover:bg-modern-earthy transition-colors text-center">
                        See This In My Space
                    </button>
                    <button className="bg-white border border-saddle-brown text-saddle-brown py-4 px-6 uppercase font-bold tracking-widest text-sm hover:bg-saddle-brown hover:text-white transition-colors flex items-center justify-center gap-2">
                        <Box className="w-5 h-5" /> 3D View
                    </button>
                </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-8">
             <div className="hidden md:flex justify-end gap-3 text-modern-earthy/40 mb-2">
                 <button><Share2 className="w-5 h-5 hover:text-saddle-brown" /></button>
                 <button><Facebook className="w-5 h-5 hover:text-saddle-brown" /></button>
                 <button><Twitter className="w-5 h-5 hover:text-saddle-brown" /></button>
             </div>

             <div className="space-y-4">
                 <p className="text-sm leading-relaxed text-modern-earthy/80">
                     <span className="font-bold">Description:</span><br/>
                     Elwood® luxury vinyl planks from the Wayne Parc Reserve™ Collection feature soft blonde hues with smooth variation and subtle knots brought to life through grain-aligned EIR embossing and an UltraMatte™ finish for a natural woodgrain finish. These 9" x 72" planks offer a 12mm thickness and a waterproof WPC core that delivers a warm, cushioned feel underfoot.
                 </p>
             </div>

             <div className="grid grid-cols-2 gap-4">
                 <button className="border border-saddle-brown text-saddle-brown py-3 px-4 uppercase font-bold text-xs tracking-widest hover:bg-saddle-brown hover:text-white transition-colors flex items-center justify-center gap-2">
                     <CheckSquare className="w-4 h-4" /> Check Inventory
                 </button>
                 <button className="border border-saddle-brown text-saddle-brown py-3 px-4 uppercase font-bold text-xs tracking-widest hover:bg-saddle-brown hover:text-white transition-colors flex items-center justify-center gap-2">
                     <MapPin className="w-4 h-4" /> Dealer Locator
                 </button>
             </div>

             <div className="border-t border-b border-modern-earthy/10 py-4">
                 <div className="flex items-center gap-2 text-saddle-brown cursor-pointer hover:underline">
                     <Layers className="w-4 h-4" />
                     <span className="text-xs font-bold uppercase tracking-wider">See More From Wayner Parc Reserve™ Collection</span>
                 </div>
             </div>

             <div>
                 <div className="flex gap-8 border-b border-modern-earthy/10 mb-6">
                     {["SPECS", "APPLICATIONS"].map((tab) => (
                         <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "pb-3 text-sm font-bold uppercase tracking-widest transition-all relative",
                                activeTab === tab ? "text-saddle-brown after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-saddle-brown" : "text-modern-earthy/40 hover:text-saddle-brown"
                            )}
                         >
                             {tab}
                         </button>
                     ))}
                 </div>

                 {activeTab === "SPECS" && (
                     <div className="space-y-6">
                         <p className="text-xs italic text-modern-earthy/50">See technical specification sheets for more details</p>
                         <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                             {specs.map((spec, i) => (
                                 <div key={i}>
                                     <h4 className="text-xs font-bold text-modern-earthy/60 uppercase mb-1">{spec.label}</h4>
                                     <p className="text-sm font-medium text-modern-earthy">{spec.value}</p>
                                 </div>
                             ))}
                         </div>
                     </div>
                 )}
                  {activeTab === "APPLICATIONS" && (
                     <div className="space-y-6">
                         <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                             <div>
                                 <h4 className="text-xs font-bold text-modern-earthy/60 uppercase mb-1">Flooring</h4>
                                 <p className="text-sm font-medium text-modern-earthy">Residential: Yes</p>
                                 <p className="text-sm font-medium text-modern-earthy">Commercial: Yes</p>
                             </div>
                             <div>
                                 <h4 className="text-xs font-bold text-modern-earthy/60 uppercase mb-1">Wall</h4>
                                 <p className="text-sm font-medium text-modern-earthy">Residential: Yes</p>
                                 <p className="text-sm font-medium text-modern-earthy">Commercial: No</p>
                             </div>
                         </div>
                     </div>
                 )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
