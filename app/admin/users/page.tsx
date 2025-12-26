"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/axios";
import { toast } from "sonner";
import { Loader2, Trash2, Shield, ShieldOff, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserType {
  _id: string;
  fullName: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get("/users");
      setUsers(data.users);
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.delete(`/users/${id}`);
      setUsers((prev) => prev.filter((user) => user._id !== id));
      toast.success("User deleted");
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  const toggleAdmin = async (id: string, currentStatus: boolean) => {
    try {
      const { data } = await api.patch(`/users/${id}`, { isAdmin: !currentStatus });
      setUsers((prev) => 
        prev.map(user => user._id === id ? { ...user, isAdmin: data.user.isAdmin } : user)
      );
      toast.success(`User is now ${!currentStatus ? 'Admin' : 'Member'}`);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-saddle-brown" />
      </div>
    );
  }

  return (
    <div className="font-lato space-y-8">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-3xl font-playfair font-bold text-saddle-brown">User Management</h1>
           <p className="text-modern-earthy/80 mt-1">Manage system access and administration</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg border border-saddle-brown/10 shadow-sm">
            <span className="text-sm font-bold text-modern-earthy">Total Users: {users.length}</span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-saddle-brown/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-warm-cream border-b border-saddle-brown/10">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-saddle-brown/60">User</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-saddle-brown/60">Email</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-saddle-brown/60">Role</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-saddle-brown/60">Joined</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-saddle-brown/60 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-saddle-brown/5">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-warm-cream/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-saddle-brown/10 flex items-center justify-center text-saddle-brown">
                            <User className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-modern-earthy">{user.fullName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-modern-earthy/80">{user.email}</td>
                  <td className="px-6 py-4">
                    <span 
                        className={cn(
                            "px-2 py-1 rounded-full text-xs font-bold border",
                            user.isAdmin 
                                ? "bg-emerald-100 text-emerald-700 border-emerald-200" 
                                : "bg-gray-100 text-gray-600 border-gray-200"
                        )}
                    >
                        {user.isAdmin ? "Admin" : "Member"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-modern-earthy/50">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                        onClick={() => toggleAdmin(user._id, user.isAdmin)}
                        className="p-2 text-modern-earthy hover:text-saddle-brown hover:bg-saddle-brown/10 rounded-md transition-colors"
                        title={user.isAdmin ? "Remove Admin" : "Make Admin"}
                    >
                        {user.isAdmin ? <ShieldOff className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                    </button>
                    <button
                        onClick={() => handleDelete(user._id)}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title="Delete User"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {users.length === 0 && (
              <div className="p-8 text-center text-modern-earthy/50 italic">
                  No users found.
              </div>
          )}
        </div>
      </div>
    </div>
  );
}
