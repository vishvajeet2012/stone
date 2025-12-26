"use client";

import React, { useState } from "react";
import ProjectHeader from "./ProjectHeader";
import ProjectGrid from "./ProjectGrid";
import ProjectLightbox from "./ProjectLightbox";
import ProjectParallax from "./ProjectParallax";

export interface ProjectItem {
  id: string;
  title: string;
  location: string;
  stoneUsed: string;
  image: string;
  gallery: string[];
  description: string;
}

interface ProjectListingProps {
  title: string;
  description: string;
  projects: ProjectItem[];
}

export default function ProjectListing({ title, description, projects }: ProjectListingProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const openLightbox = (project: ProjectItem) => setSelectedProject(project);
  const closeLightbox = () => setSelectedProject(null);

  const nextProject = () => {
    if (!selectedProject) return;
    const currentIndex = projects.findIndex((p) => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % projects.length;
    setSelectedProject(projects[nextIndex]);
  };

  const prevProject = () => {
    if (!selectedProject) return;
    const currentIndex = projects.findIndex((p) => p.id === selectedProject.id);
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    setSelectedProject(projects[prevIndex]);
  };

  return (
    <section className="bg-warm-cream min-h-screen py-20 px-4 md:px-8">
      <ProjectHeader title={title} description={description} />
      
      <div className="hidden lg:block">
        <ProjectParallax projects={projects} onProjectClick={openLightbox} />
      </div>
      <div className="">
         <ProjectGrid projects={projects} onProjectClick={openLightbox} />
      </div>
      
      <ProjectLightbox 
        selectedProject={selectedProject} 
        onClose={closeLightbox} 
        onNext={nextProject} 
        onPrev={prevProject} 
      />
    </section>
  );
}
