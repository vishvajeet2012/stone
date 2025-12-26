"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { ProjectItem } from "./ProjectListing";

interface ProjectGridProps {
  projects: ProjectItem[];
  onProjectClick: (project: ProjectItem) => void;
}

export default function ProjectGrid({ projects, onProjectClick }: ProjectGridProps) {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:pt-[100px] gap-8">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="group relative cursor-pointer overflow-hidden rounded-xl shadow-lg aspect-[3/4]"
          onClick={() => onProjectClick(project)}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
            <span className="text-warm-cream/80 text-xs font-bold tracking-widest uppercase mb-2 flex items-center gap-2">
              <MapPin className="w-3 h-3" /> {project.location}
            </span>
            <h3 className="text-2xl text-white font-playfair font-bold mb-1">
              {project.title}
            </h3>
            <p className="text-warm-cream/70 text-sm italic">
              {project.stoneUsed}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

