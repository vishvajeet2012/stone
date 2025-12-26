"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import EnquiryModal from "@/Components/shared/EnquiryModal";

interface ProductInfoProps {
  product: {
    name: string;
    description: string;
    features: string[];
    specifications: { label: string; value: string }[];
  };
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col h-full justify-center">
      <EnquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        stoneName={product.name} 
      />
      
      <span className="text-modern-earthy font-lato text-sm font-bold tracking-widest uppercase mb-2">
        Premium Collection
      </span>
      <h1 className="text-4xl md:text-5xl font-playfair font-bold text-saddle-brown mb-6">
        {product.name}
      </h1>
      
      <p className="text-stone-600 font-lato text-lg leading-relaxed mb-8">
        {product.description}
      </p>

      {/* Specifications Table */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-100 mb-8">
        <h3 className="text-xl font-playfair font-bold text-saddle-brown mb-4">Specifications</h3>
        <div className="divide-y divide-stone-100">
          {product.specifications.map((spec, idx) => (
            <div key={idx} className="flex justify-between py-3 text-sm md:text-base">
              <span className="text-stone-500 font-medium">{spec.label}</span>
              <span className="text-saddle-brown font-semibold">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Features List */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        {product.features.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-2 text-stone-700">
             <CheckCircle2 className="w-5 h-5 text-modern-earthy" />
             <span className="font-medium text-sm">{feature}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button 
            onClick={() => setIsModalOpen(true)}
            className="flex-1 bg-saddle-brown text-warm-cream py-4 rounded-full font-bold text-center uppercase tracking-wider hover:bg-saddle-brown/90 transition-colors shadow-lg flex items-center justify-center gap-2"
        >
            Get a Quote <ArrowRight className="w-5 h-5" />
        </button>
        <button className="px-8 py-4 border border-saddle-brown text-saddle-brown rounded-full font-bold uppercase tracking-wider hover:bg-white transition-colors">
            Download Spec Sheet
        </button>
      </div>
    </div>
  );
}

