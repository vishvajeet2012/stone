"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Mail, Lock, User, ArrowRight } from "lucide-react";
import api from "@/lib/axios";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await api.post("/auth/signup", { fullName, email, password });
      toast.success(data.message || "Account created successfully!");
      router.push("/admin/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-warm-cream flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-saddle-brown/10 overflow-hidden">
        <div className="p-8 md:p-10">
          <div className="text-center mb-8">
            <h1 className="font-playfair text-3xl font-bold text-saddle-brown mb-2">Create Account</h1>
            <p className="text-modern-earthy/70 text-sm font-lato">Join us to manage your stone collection</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-modern-earthy/60">Full Name</label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-saddle-brown/40 group-focus-within:text-saddle-brown transition-colors" />
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-warm-cream/30 border border-saddle-brown/20 rounded-lg focus:outline-none focus:border-saddle-brown focus:ring-1 focus:ring-saddle-brown/20 transition-all font-lato text-modern-earthy placeholder:text-modern-earthy/30"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-modern-earthy/60">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-saddle-brown/40 group-focus-within:text-saddle-brown transition-colors" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-warm-cream/30 border border-saddle-brown/20 rounded-lg focus:outline-none focus:border-saddle-brown focus:ring-1 focus:ring-saddle-brown/20 transition-all font-lato text-modern-earthy placeholder:text-modern-earthy/30"
                  placeholder="admin@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-modern-earthy/60">Password</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-saddle-brown/40 group-focus-within:text-saddle-brown transition-colors" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-warm-cream/30 border border-saddle-brown/20 rounded-lg focus:outline-none focus:border-saddle-brown focus:ring-1 focus:ring-saddle-brown/20 transition-all font-lato text-modern-earthy placeholder:text-modern-earthy/30"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-saddle-brown hover:bg-modern-earthy text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-saddle-brown/20 flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Create Account <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
        
        <div className="p-6 bg-warm-cream/50 border-t border-saddle-brown/10 text-center">
          <p className="text-sm text-modern-earthy/70 font-lato">
            Already have an account?{" "}
            <Link href="/admin/login" className="font-bold text-saddle-brown hover:text-modern-earthy transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
