"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ManufacturingInfrastructure() {
  const features = [
    {
      title: "Advanced Processing",
      description: "State-of-the-art Italian machinery ensuring precision cuts and finishes for every slab.",
      image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Expansive Quarries",
      description: "Direct ownership of premium quarries guarantees consistent quality and uninterrupted supply.",
      image: "https://images.unsplash.com/photo-1534237710431-e2fc698436d5?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Global Logistics",
      description: "Seamless supply chain network delivering specialized stone protection to over 50 countries.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <section className="w-full py-24 bg-warm-cream text-saddle-brown">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header Section */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="text-center mb-16"
        >
          <span className="text-sm font-bold uppercase tracking-widest text-modern-earthy/60 mb-3 block">
            Our Backbone
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 tracking-tight">
            Manufacturing & Infrastructure
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-modern-earthy/80 font-sans leading-relaxed">
            Combining traditional craftsmanship with cutting-edge technology to deliver excellence at scale.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="group relative h-[450px] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <Image 
                src={feature.image}
                alt={feature.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="h-1 bg-warm-cream mb-4 w-12 group-hover:w-20 transition-all duration-500 ease-out" />
                <h3 className="text-2xl font-serif font-bold text-warm-cream mb-3">
                  {feature.title}
                </h3>
                <p className="text-warm-cream/90 font-sans leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 transform translate-y-4 group-hover:translate-y-0">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats or Visual divider optional */}
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 1 }}
            className="w-full h-px bg-saddle-brown/10 mt-20" 
        />
        
      </div>
    </section>
  )
}
