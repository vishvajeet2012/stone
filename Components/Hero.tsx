"use client";

import KineticSlider from "@/Components/KineticSlider";
import { useMemo } from "react";

export default function Hero() {
  // Use exact Unsplash URLs from rgbKineticSlider reference
  const images = useMemo(() => [
    "https://images.unsplash.com/photo-1523643391907-41e69459a06f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80",
    "https://images.unsplash.com/photo-1547234935-80c7145ec969?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80",
    "https://images.unsplash.com/photo-1612892483236-52d32a0e0ac1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
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
