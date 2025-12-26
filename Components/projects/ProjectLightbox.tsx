"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, MapPin, Grid, Layers, Share2 } from "lucide-react";
import { ProjectItem } from "./ProjectListing";

interface ProjectLightboxProps {
  selectedProject: ProjectItem | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function ProjectLightbox({ selectedProject, onClose, onNext, onPrev }: ProjectLightboxProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Reset active image when project changes
  React.useEffect(() => {
    setActiveImageIndex(0);
  }, [selectedProject]);

  if (!selectedProject) return null;

  const currentGallery = selectedProject.gallery && selectedProject.gallery.length > 0 
    ? selectedProject.gallery 
    : [selectedProject.image];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-modern-earthy/95 flex items-center justify-center overflow-y-auto"
      >
        <div className="w-full h-full flex flex-col md:flex-row relative">
            
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-50 text-warm-cream/50 hover:text-warm-cream transition-colors p-2 bg-modern-earthy/20 rounded-full backdrop-blur-sm"
            >
                <X size={32} />
            </button>

            {/* Left/Top: Image Gallery */}
            <div className="w-full md:w-2/3 h-[50vh] md:h-full relative bg-modern-earthy flex flex-col justify-center">
                {/* Main Image */}
                <div className="relative w-full h-full">
                    <AnimatePresence mode="wait">
                        <motion.div 
                            key={activeImageIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="w-full h-full relative"
                        >
                             <Image 
                                src={currentGallery[activeImageIndex]} 
                                alt={`${selectedProject.title} - View ${activeImageIndex + 1}`} 
                                fill 
                                className="object-cover md:object-contain"
                            />
                        </motion.div>
                    </AnimatePresence>
                   
                    {/* Image Nav Buttons (within image area) */}
                    <button
                        onClick={(e) => { 
                            e.stopPropagation(); 
                            setActiveImageIndex((prev) => prev === 0 ? currentGallery.length - 1 : prev - 1); 
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-cream/50 hover:text-warm-cream transition-colors p-2 bg-modern-earthy/20 hover:bg-modern-earthy/40 rounded-full backdrop-blur-sm"
                    >
                        <ChevronLeft size={32} />
                    </button>
                    <button
                        onClick={(e) => { 
                            e.stopPropagation(); 
                            setActiveImageIndex((prev) => (prev + 1) % currentGallery.length); 
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-warm-cream/50 hover:text-warm-cream transition-colors p-2 bg-modern-earthy/20 hover:bg-modern-earthy/40 rounded-full backdrop-blur-sm"
                    >
                        <ChevronRight size={32} />
                    </button>
                </div>

                {/* Thumbnail Strip */}
                {currentGallery.length > 1 && (
                    <div className="absolute bottom-4 left-0 w-full flex justify-center gap-2 px-4 overflow-x-auto no-scrollbar py-2">
                        {currentGallery.map((img, idx) => (
                            <button 
                                key={idx}
                                onClick={() => setActiveImageIndex(idx)}
                                className={`relative w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-md overflow-hidden border-2 transition-all ${activeImageIndex === idx ? 'border-saddle-brown scale-105' : 'border-warm-cream/20 opacity-60 hover:opacity-100'}`}
                            >
                                <Image src={img} alt="thumb" fill className="object-cover" />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Right/Bottom: Details Panel */}
            <div className="w-full md:w-1/3 h-auto md:h-full bg-warm-cream border-l border-saddle-brown/10 p-8 md:p-12 overflow-y-auto flex flex-col text-modern-earthy">
                
                {/* Project Header */}
                <div className="mb-8 md:mt-20">
                    <span className="text-saddle-brown text-xs font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
                        <MapPin className="w-3 h-3" /> {selectedProject.location}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-playfair font-bold text-modern-earthy mb-6 leading-tight">
                        {selectedProject.title}
                    </h2>
                    <div className="w-12 h-1 bg-saddle-brown mb-6"></div>
                    <p className="text-lg leading-relaxed text-modern-earthy/70 italic font-playfair">
                        "{selectedProject.description}"
                    </p>
                </div>

                {/* Stone Details Grid */}
                <div className="grid grid-cols-1 gap-6 mb-12 border-t border-saddle-brown/10 pt-8">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-saddle-brown/5 rounded-full text-saddle-brown">
                             <Layers size={20} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-wider text-modern-earthy/50 mb-1">Stone Used</h4>
                            <p className="text-modern-earthy text-lg font-medium">{selectedProject.stoneUsed}</p>
                        </div>
                    </div>
                    {/* Add more details here if available in data, e.g., Finish, Application */}
                </div>

                 {/* Project Navigation (Footer of sidebar) */}
                 <div className="mt-auto pt-8 border-t border-saddle-brown/20 flex items-center justify-between">
                    <button 
                        onClick={onPrev}
                        className="flex items-center gap-2 text-sm font-bold text-saddle-brown hover:text-modern-earthy transition-colors group uppercase tracking-widest"
                    >
                        <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform"/> Previous
                    </button>
                    <button 
                        onClick={onNext}
                        className="flex items-center gap-2 text-sm font-bold text-saddle-brown hover:text-modern-earthy transition-colors group uppercase tracking-widest"
                    >
                         Next <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                    </button>
                </div>
            </div>


        </div>
      </motion.div>
    </AnimatePresence>
  );
}

