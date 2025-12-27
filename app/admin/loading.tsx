"use client";

import { motion } from "framer-motion";

export default function AdminLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] w-full bg-warm-cream/50">
      <div className="relative flex items-center justify-center">
        {/* Outer Ring */}
        <motion.div
          className="w-16 h-16 rounded-full border-4 border-saddle-brown/20 border-t-saddle-brown"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner static logo/dot */}
        <motion.div 
            className="absolute w-3 h-3 bg-saddle-brown rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
