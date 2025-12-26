export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-playfair font-bold text-warm-cream">Dashboard</h1>
        <p className="text-white/60 mt-2">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Visits", value: "12,345", change: "+12%" },
          { label: "New Inquiries", value: "48", change: "+5%" },
          { label: "Projects", value: "24", change: "0%" },
          { label: "Active Blogs", value: "156", change: "+8%" },
        ].map((stat, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
            <p className="text-sm text-white/50">{stat.label}</p>
            <div className="flex items-end justify-between mt-2">
                <h3 className="text-3xl font-bold text-saddle-brown">{stat.value}</h3>
                <span className="text-emerald-400 text-sm font-medium">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="w-full h-96 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center border-dashed">
          <p className="text-white/30">Analytics Chart Placeholder</p>
      </div>
    </div>
  );
}

