"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/axios";
import { toast } from "sonner";
import { User, Lock, Save, Loader2 } from "lucide-react";

export default function AdminProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Profile Form States
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  // Password Form States
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Fetch User Data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get("/auth/me");
        setUser(data.user);
        setFullName(data.user.fullName);
        setEmail(data.user.email);
      } catch (error) {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Handle Profile Update
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    try {
      const { data } = await api.put("/auth/update-profile", { fullName, email });
      setUser(data.user);
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  // Handle Password Change
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
        toast.error("New passwords do not match");
        return;
    }

    setIsChangingPassword(true);
    try {
      await api.put("/auth/change-password", { currentPassword, newPassword });
      toast.success("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to change password");
    } finally {
      setIsChangingPassword(false);
    }
  };

  if (loading) {
      return <div className="min-h-screen flex items-center justify-center bg-warm-cream">
          <Loader2 className="w-8 h-8 animate-spin text-saddle-brown" />
      </div>;
  }

  return (
    <div className="p-8 bg-warm-cream min-h-screen font-lato text-modern-earthy">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-playfair font-bold text-saddle-brown mb-8 flex items-center gap-2">
            <User className="w-8 h-8" /> Profile Settings
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Profile Information Card */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-saddle-brown/10">
                <h2 className="text-xl font-bold text-modern-earthy mb-6 flex items-center gap-2">
                    Personal Information
                </h2>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-modern-earthy/70 mb-1">Full Name</label>
                        <input 
                            type="text" 
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full px-4 py-2 border border-saddle-brown/20 rounded-md focus:outline-none focus:border-saddle-brown bg-warm-cream/30"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-modern-earthy/70 mb-1">Email Address</label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-saddle-brown/20 rounded-md focus:outline-none focus:border-saddle-brown bg-warm-cream/30"
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={isUpdatingProfile}
                        className="w-full mt-4 bg-saddle-brown hover:bg-modern-earthy text-white font-bold py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        {isUpdatingProfile ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Update Profile
                    </button>
                </form>
            </div>

            {/* Change Password Card */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-saddle-brown/10">
                <h2 className="text-xl font-bold text-modern-earthy mb-6 flex items-center gap-2">
                    <Lock className="w-5 h-5"/> Security
                </h2>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-modern-earthy/70 mb-1">Current Password</label>
                        <input 
                            type="password" 
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-saddle-brown/20 rounded-md focus:outline-none focus:border-saddle-brown bg-warm-cream/30"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-modern-earthy/70 mb-1">New Password</label>
                        <input 
                            type="password" 
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-saddle-brown/20 rounded-md focus:outline-none focus:border-saddle-brown bg-warm-cream/30"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-modern-earthy/70 mb-1">Confirm New Password</label>
                        <input 
                            type="password" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-saddle-brown/20 rounded-md focus:outline-none focus:border-saddle-brown bg-warm-cream/30"
                            required
                        />
                    </div>
                    <button 
                         type="submit" 
                         disabled={isChangingPassword}
                         className="w-full mt-4 bg-modern-earthy hover:bg-saddle-brown text-white font-bold py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        {isChangingPassword ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                        Change Password
                    </button>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
}
