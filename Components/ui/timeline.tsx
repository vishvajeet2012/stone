"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (

    <div
      className="w-full bg-warm-cream font-lato md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-10 px-4 md:px-8 lg:px-10">

      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-8">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-8 md:pt-12 md:gap-8"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-24 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-6 absolute left-3 md:left-3 w-6 rounded-full bg-warm-cream border border-saddle-brown/20 flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-saddle-brown border border-saddle-brown p-1" />
              </div>
              <h3 className="hidden md:block text-base md:pl-16 md:text-xl font-bold text-saddle-brown ">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-12 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-lg mb-2 text-left font-bold text-saddle-brown">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute left-[23px] md:left-[23px] top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-0% via-saddle-brown/20 to-transparent to-90%  mask-[linear-gradient(to_bottom,transparent_0%,black_10%,black_80%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-linear-to-t from-saddle-brown via-modern-earthy to-transparent from-0% via-10% rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

