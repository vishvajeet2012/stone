"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { ProjectItem } from "./ProjectListing";

interface ProjectParallaxProps {
  projects: ProjectItem[];
  onProjectClick: (project: ProjectItem) => void;
}

export default function ProjectParallax({ projects, onProjectClick }: ProjectParallaxProps) {
  const gallery = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  // Distribute projects into 4 columns
  const chunkedProjects = [[], [], [], []] as ProjectItem[][];
  projects.forEach((project, index) => {
    chunkedProjects[index % 4].push(project);
  });
  
  // Ensure we have enough data for the effect or fill with repeats if needed for demo
  // For now, we use what we have.

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="w-full bg-warm-cream overflow-hidden text-black">
      

      <div
        ref={gallery}
        className="relative box-border flex h-[175vh] gap-[2vw] overflow-hidden bg-warm-cream p-[2vw]"
      >
        <Column projects={chunkedProjects[0]} y={y} onProjectClick={onProjectClick} />
        <Column projects={chunkedProjects[1]} y={y2} onProjectClick={onProjectClick} />
        <Column projects={chunkedProjects[2]} y={y3} onProjectClick={onProjectClick} />
        <Column projects={chunkedProjects[3]} y={y4} onProjectClick={onProjectClick} />
      </div>
    </div>
  );
}

type ColumnProps = {
  projects: ProjectItem[];
  y: MotionValue<number>;
  onProjectClick: (project: ProjectItem) => void;
};

const Column = ({ projects, y, onProjectClick }: ColumnProps) => {
  return (
    <motion.div
      className="relative -top-[45%] flex h-full w-1/4 min-w-[200px] flex-col gap-[2vw] first:top-[-45%] [&:nth-child(2)]:top-[-95%] [&:nth-child(3)]:top-[-45%] [&:nth-child(4)]:top-[-75%]"
      style={{ y }}
    >
      {projects.map((project, i) => (
        <div 
            key={i} 
            className="relative h-full w-full overflow-hidden rounded-md cursor-pointer group"
            onClick={() => onProjectClick(project)}
        >
          <div className="relative aspect-[3/4] w-full">
            <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Overlay - Always Visible as requested */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
              <span className="text-warm-cream/80 text-[10px] font-bold tracking-widest uppercase mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {project.location}
              </span>
              <h3 className="text-lg text-white font-serif font-bold mb-0.5 leading-tight">
                {project.title}
              </h3>
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );
};
