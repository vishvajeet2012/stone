import React from "react";

interface ProjectHeaderProps {
  title: string;
  description: string;
}

export default function ProjectHeader({ title, description }: ProjectHeaderProps) {
  return (
    <div className="max-w-7xl mx-auto mb-16 text-center">
      <h1 className="text-3xl md:text-5xl font-serif font-bold text-saddle-brown mb-6 uppercase tracking-wider">
        {title}
      </h1>
      <p className="text-modern-earthy/80 max-w-2xl mx-auto text-lg leading-relaxed font-sans">
        {description}
      </p>
    </div>
  );
}
