"use client";

import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactUs() {
  return (
    <section className="w-full bg-warm-cream py-20 px-4 md:px-8 relative overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-saddle-brown/5 rounded-l-[10rem] z-0 hidden lg:block" />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Contact Info */}
        <div className="space-y-8">
            <div>
                <span className="text-modern-earthy text-xs font-bold tracking-widest uppercase mb-2 block">
                    Get in Touch
                </span>
                <h2 className="text-4xl md:text-6xl font-serif font-bold text-saddle-brown mb-6">
                    Let&apos;s Build Something Timeless
                </h2>
                <p className="text-saddle-brown/80 font-sans text-lg leading-relaxed max-w-md">
                    Whether you are an architect, designer, or homeowner, we are here to help you find the perfect stone for your vision.
                </p>
            </div>

            <div className="space-y-6 pt-4">
                 <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-saddle-brown text-warm-cream flex items-center justify-center text-xl shrink-0">
                        <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="text-saddle-brown font-bold text-lg">Visit Our Gallery</h4>
                        <p className="text-saddle-brown/70">123 Stone Avenue, Marble City, Jaipur, Rajasthan</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-saddle-brown text-warm-cream flex items-center justify-center text-xl shrink-0">
                        <Phone className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="text-saddle-brown font-bold text-lg">Call Us</h4>
                        <p className="text-saddle-brown/70">+91 98765 43210</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-saddle-brown text-warm-cream flex items-center justify-center text-xl shrink-0">
                        <Mail className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="text-saddle-brown font-bold text-lg">Email Us</h4>
                        <p className="text-saddle-brown/70">connect@worldofstones.com</p>
                    </div>
                 </div>
            </div>
        </div>

        {/* Right: Contact Form */}
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-saddle-brown/10">
            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-saddle-brown uppercase tracking-wider">Name</label>
                        <input type="text" className="w-full bg-warm-cream/50 border border-saddle-brown/20 rounded-lg p-3 text-saddle-brown focus:outline-hidden focus:border-saddle-brown transition-colors" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-saddle-brown uppercase tracking-wider">Email</label>
                        <input type="email" className="w-full bg-warm-cream/50 border border-saddle-brown/20 rounded-lg p-3 text-saddle-brown focus:outline-hidden focus:border-saddle-brown transition-colors" placeholder="john@example.com" />
                    </div>
                </div>
                
                <div className="space-y-2">
                    <label className="text-sm font-bold text-saddle-brown uppercase tracking-wider">Subject</label>
                     <select className="w-full bg-warm-cream/50 border border-saddle-brown/20 rounded-lg p-3 text-saddle-brown focus:outline-hidden focus:border-saddle-brown transition-colors">
                        <option>General Inquiry</option>
                        <option>Project Consultation</option>
                        <option>Bulk Order</option>
                        <option>Partnership</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-saddle-brown uppercase tracking-wider">Message</label>
                    <textarea className="w-full bg-warm-cream/50 border border-saddle-brown/20 rounded-lg p-3 text-saddle-brown focus:outline-hidden focus:border-saddle-brown transition-colors h-32 resize-none" placeholder="Tell us about your project..."></textarea>
                </div>

                <button type="button" className="w-full bg-saddle-brown text-warm-cream font-bold py-4 rounded-lg hover:bg-saddle-brown/90 transition-colors uppercase tracking-widest shadow-lg transform active:scale-95 duration-200">
                    Send Message
                </button>
            </form>
        </div>

      </div>
    </section>
  );
}
