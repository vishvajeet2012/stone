"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { ProjectItem } from "./ProjectListing";

interface ProjectLightboxProps {
  selectedProject: ProjectItem | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function ProjectLightbox({ selectedProject, onClose, onNext, onPrev }: ProjectLightboxProps) {
  return (
    <AnimatePresence>
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
          >
            <X size={40} />
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2"
          >
            <ChevronLeft size={48} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2"
          >
            <ChevronRight size={48} />
          </button>

          {/* Content */}
          <div className="relative w-full max-w-5xl max-h-[90vh] flex flex-col items-center">
             <div className="relative w-full h-[60vh] md:h-[80vh]">
                  <Image 
                      src={selectedProject.image} 
                      alt={selectedProject.title} 
                      fill 
                      className="object-contain"
                  />
             </div>
             <div className="mt-6 text-center">
                  <h3 className="text-3xl text-white font-serif font-bold mb-2">{selectedProject.title}</h3>
                  <div className="flex items-center justify-center gap-6 text-white/70">
                       <span className="flex items-center gap-2"><MapPin size={16}/> {selectedProject.location}</span>
                       <span className="w-1 h-1 bg-white/50 rounded-full"></span>
                       <span className="italic">{selectedProject.stoneUsed}</span>
                  </div>
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
