"use client";

import { Activity, Users, FileText, Briefcase } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8 font-lato">
      <div>
        <h1 className="text-4xl font-playfair font-bold text-saddle-brown">Dashboard</h1>
        <p className="text-modern-earthy/80 mt-2 font-medium">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Visits", value: "12,345", change: "+12%", icon: Activity },
          { label: "New Inquiries", value: "48", change: "+5%", icon: Users },
          { label: "Active Projects", value: "24", change: "0%", icon: Briefcase },
          { label: "Published Blogs", value: "156", change: "+8%", icon: FileText },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-saddle-brown/10 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
            <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-warm-cream rounded-full group-hover:bg-saddle-brown/10 transition-colors">
                    <stat.icon className="w-6 h-6 text-saddle-brown" />
                </div>
                <span className="text-modern-earthy bg-modern-earthy/10 px-2 py-1 rounded-full text-xs font-bold">
                    {stat.change}
                </span>
            </div>
            <p className="text-sm font-bold text-modern-earthy/60 uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-3xl font-playfair font-bold text-saddle-brown mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>
      
      {/* Chart Placeholder Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 w-full h-96 bg-white border border-saddle-brown/10 rounded-xl p-8 shadow-sm flex flex-col">
              <h3 className="text-xl font-bold text-saddle-brown mb-6 font-playfair">Traffic Overview</h3>
              <div className="flex-1 border-2 border-dashed border-saddle-brown/10 rounded-lg flex items-center justify-center bg-warm-cream/30">
                 <p className="text-saddle-brown/40 font-bold uppercase tracking-widest text-sm">Analytics Chart Integration Required</p>
              </div>
          </div>

          <div className="w-full h-96 bg-white border border-saddle-brown/10 rounded-xl p-8 shadow-sm flex flex-col">
              <h3 className="text-xl font-bold text-saddle-brown mb-6 font-playfair">Recent Activity</h3>
              <div className="flex-1 space-y-4 overflow-y-auto pr-2">
                 {[1,2,3,4].map((_, i) => (
                     <div key={i} className="flex items-start gap-3 pb-3 border-b border-saddle-brown/5 last:border-0">
                         <div className="w-2 h-2 mt-2 rounded-full bg-modern-earthy shrink-0" />
                         <div>
                             <p className="text-sm font-bold text-modern-earthy">New inquiry received</p>
                             <p className="text-xs text-modern-earthy/60">2 hours ago</p>
                         </div>
                     </div>
                 ))}
              </div>
          </div>
      </div>
    </div>
  );
}
