"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, Loader2 } from "lucide-react";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { toast } from "sonner";
import axios from "axios";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });
  const [phone, setPhone] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/contact", { ...formData, phone });
      
      if (response.data.success) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "General Inquiry", message: "" });
        setPhone(undefined);
      } else {
        toast.error(response.data.error || "Failed to send message");
      }
    } catch (error: unknown) {
      const errorMessage = axios.isAxiosError(error) && error.response?.data?.error 
        ? error.response.data.error 
        : "Something went wrong. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full bg-warm-cream py-20 px-4 md:px-8 relative overflow-hidden">
        {/* Background Decorative Element - Right */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-saddle-brown/5 rounded-l-[10rem] z-0 hidden lg:block" />

        
        <div className="absolute top-0 left-0 w-[400px] h-[400px] z-0 opacity-10 pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="0" cy="0" r="300" stroke="#8B4513" strokeWidth="2" strokeDasharray="10 10" />
                <circle cx="0" cy="0" r="250" stroke="#8B4513" strokeWidth="1" />
                <circle cx="0" cy="0" r="200" stroke="#8B4513" strokeWidth="4" opacity="0.5" />
                <path d="M0 400 Q 200 200 400 0" stroke="#8B4513" strokeWidth="1" opacity="0.3" />
            </svg>
        </div>

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Contact Info */}
        <div className="space-y-8">
            <div>
                <span className="text-modern-earthy text-xs font-bold tracking-widest uppercase mb-2 block">
                    Get in Touch
                </span>
                <h2 className="text-4xl md:text-6xl font-playfair font-bold text-saddle-brown mb-6">
                    Let&apos;s Build Something Timeless
                </h2>
                <p className="text-saddle-brown/80 font-lato text-lg leading-relaxed max-w-md">
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
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-saddle-brown uppercase tracking-wider">Name *</label>
                        <input 
                          type="text" 
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-warm-cream/50 border border-saddle-brown/20 rounded-lg p-3 text-saddle-brown focus:outline-hidden focus:border-saddle-brown transition-colors" 
                          placeholder="John Doe" 
                          required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-saddle-brown uppercase tracking-wider">Email *</label>
                        <input 
                          type="email" 
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-warm-cream/50 border border-saddle-brown/20 rounded-lg p-3 text-saddle-brown focus:outline-hidden focus:border-saddle-brown transition-colors" 
                          placeholder="john@example.com" 
                          required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-saddle-brown uppercase tracking-wider">Phone Number</label>
                    <div className="phone-input-container">
                        <PhoneInput
                            placeholder="Enter phone number"
                            value={phone}
                            onChange={setPhone}
                            defaultCountry="IN"
                            international
                            countryCallingCodeEditable={false} 
                            className="bg-warm-cream/50 border border-saddle-brown/20 rounded-lg p-3 text-saddle-brown focus-within:border-saddle-brown transition-colors"
                        />
                    </div>
                     <style jsx global>{`
                        .PhoneInputInput {
                            background-color: transparent;
                            border: none;
                            outline: none;
                            color: inherit;
                            font-size: 1rem;
                        }
                        .PhoneInputCountryIcon {
                            width: 24px;
                            height: 18px;
                        }
                        .PhoneInputCountryIconImg {
                            display: block;
                            width: 100%;
                            height: 100%;
                        }
                        .PhoneInputCountrySelect {
                            background-color: transparent;
                            color: black;
                        }
                        .PhoneInputCountrySelectArrow {
                            color: #8B4513;
                            opacity: 0.7;
                        }
                     `}</style>
                </div>
                
                <div className="space-y-2">
                    <label className="text-sm font-bold text-saddle-brown uppercase tracking-wider">Subject</label>
                     <select 
                       value={formData.subject}
                       onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                       className="w-full bg-warm-cream/50 border border-saddle-brown/20 rounded-lg p-3 text-saddle-brown focus:outline-hidden focus:border-saddle-brown transition-colors"
                     >
                        <option>General Inquiry</option>
                        <option>Project Consultation</option>
                        <option>Bulk Order</option>
                        <option>Partnership</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-saddle-brown uppercase tracking-wider">Message *</label>
                    <textarea 
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-warm-cream/50 border border-saddle-brown/20 rounded-lg p-3 text-saddle-brown focus:outline-hidden focus:border-saddle-brown transition-colors h-32 resize-none" 
                      placeholder="Tell us about your project..."
                      required
                    ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-saddle-brown text-warm-cream font-bold py-4 rounded-lg hover:bg-saddle-brown/90 transition-colors uppercase tracking-widest shadow-lg transform active:scale-95 duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
                    {isSubmitting ? "Sending..." : "Send Message"}
                </button>
            </form>
        </div>

      </div>
    </section>
  );
}

