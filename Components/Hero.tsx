"use client";

import KineticSlider from "@/Components/KineticSlider";
import { useMemo } from "react";

export default function Hero() {
  // Use direct paths from public folder (avoids Turbopack AVIF import issue)
  const images = useMemo(() => [
    "/earth.png",
    "/mars.avif",
    "/venus.avif",
  ], []);

  const texts = useMemo(() => [
    ["Earth", "Surface gravity: 9.807 m/s²"],
    ["Mars", "Surface gravity: 3.711 m/s²"],
    ["Venus", "Surface gravity: 8.87 m/s²"],
  ], []);

  return (
    <section className="w-full h-screen">
      <KineticSlider images={images} texts={texts} />
    </section>
  );
}
