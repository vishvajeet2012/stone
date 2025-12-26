import React from "react";
import ProductGallery from "@/Components/product/ProductGallery";
import ProductInfo from "@/Components/product/ProductInfo";

const getProductData = (slug: string) => {
  return {
    name: slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
    description: "Experience the timeless beauty and unmatched durability of this premium natural stone. Mined from the finest quarries, it offers a unique blend of color and texture that transforms any space into a masterpiece.",
    images: [
      "https://images.unsplash.com/photo-1621261327989-183021f456c8?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1596541223964-b0a3390c5c63?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1599393710899-07f918961726?auto=format&fit=crop&q=80&w=800",
    ],
    specifications: [
      { label: "Origin", value: "Rajasthan, India" },
      { label: "Finish", value: "Polished, Honed, Leathered" },
      { label: "Thickness", value: "18mm, 20mm, 30mm" },
      { label: "Application", value: "Flooring, Countertops, Wall Cladding" },
    ],
    features: [
      "Heat Resistant",
      "Scratch Proof",
      "Low Maintenance",
      "Eco-Friendly"
    ]
  };
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string; productSlug: string }>;
}) {
  const { productSlug } = await params;
  const product = getProductData(productSlug);

  return (
    <main className="min-h-screen bg-warm-cream pt-24 pb-20 px-4 md:px-8 relative overflow-hidden">
      {/* Decorative Marble-Vein SVGs - Improved Visibility */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] z-0 opacity-30 pointer-events-none translate-x-1/4 -translate-y-1/4">
        <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 0 Q 150 100 50 200 T 150 400" stroke="#8B4513" strokeWidth="1.5" opacity="0.5" />
          <path d="M150 0 Q 200 150 100 250 T 200 400" stroke="#8B4513" strokeWidth="2" opacity="0.3" />
          <path d="M200 0 Q 250 120 150 220 T 250 400" stroke="#C4A484" strokeWidth="1" opacity="0.4" />
          <path d="M50 0 Q 100 120 0 250 T 100 400" stroke="#8B4513" strokeWidth="0.5" opacity="0.2" />
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] z-0 opacity-25 pointer-events-none -translate-x-1/4 translate-y-1/4 rotate-45">
        <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 100 Q 100 150 200 50 T 400 150" stroke="#8B4513" strokeWidth="2" opacity="0.4" />
          <path d="M0 150 Q 120 200 220 100 T 400 200" stroke="#8B4513" strokeWidth="1.5" opacity="0.3" />
          <path d="M0 200 Q 150 250 250 150 T 400 250" stroke="#C4A484" strokeWidth="1" opacity="0.2" />
          <circle cx="200" cy="200" r="180" stroke="#C4A484" strokeWidth="2" strokeDasharray="15 15" opacity="0.15" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left: Gallery */}
            <ProductGallery images={product.images} productName={product.name} />
            
            {/* Right: Details */}
            <ProductInfo product={product} />
        </div>
      </div>
    </main>
  );
}
