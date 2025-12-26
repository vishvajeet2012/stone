"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  stoneName: string;
}

export default function EnquiryModal({ isOpen, onClose, stoneName }: EnquiryModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-warm-cream w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden relative"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 text-saddle-brown transition-colors z-10"
              >
                <X size={24} />
              </button>

              <div className="p-8">
                <div className="mb-6">
                  <span className="text-modern-earthy text-xs font-bold tracking-widest uppercase block mb-1">
                    Enquire About
                  </span>
                  <h3 className="text-3xl font-serif font-bold text-saddle-brown">
                    {stoneName}
                  </h3>
                </div>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-sm font-bold text-saddle-brown/80 mb-1">Name</label>
                    <input 
                      type="text" 
                      placeholder="Your Name"
                      className="w-full bg-white border border-stone-200 rounded-lg px-4 py-3 focus:outline-none focus:border-saddle-brown focus:ring-1 focus:ring-saddle-brown transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-saddle-brown/80 mb-1">Email or Phone</label>
                    <input 
                      type="text" 
                      placeholder="how@can.we.reach.you"
                      className="w-full bg-white border border-stone-200 rounded-lg px-4 py-3 focus:outline-none focus:border-saddle-brown focus:ring-1 focus:ring-saddle-brown transition-colors"
                    />
                  </div>

                  <div>
                     <label className="block text-sm font-bold text-saddle-brown/80 mb-1">Message</label>
                     <textarea
                       rows={4}
                       placeholder={`I am interested in ${stoneName} for my project...`}
                       className="w-full bg-white border border-stone-200 rounded-lg px-4 py-3 focus:outline-none focus:border-saddle-brown focus:ring-1 focus:ring-saddle-brown transition-colors resize-none"
                     ></textarea>
                  </div>

                  <button className="w-full bg-saddle-brown text-warm-cream font-bold py-4 rounded-xl hover:bg-saddle-brown/90 transition-all shadow-lg active:scale-[0.98] uppercase tracking-wide text-sm mt-2">
                    Send Enquiry
                  </button>
                  
                  <p className="text-center text-xs text-stone-500 mt-4">
                    We typically respond within 24 hours.
                  </p>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
