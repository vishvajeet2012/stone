


export default function Footer() {
  return (
    <footer className="bg-saddle-brown text-warm-cream pt-20 pb-10 font-sans border-t border-warm-cream/20 relative overflow-hidden">
      
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Column 1: Contact Info (Wide) */}
          <div className="lg:col-span-4 space-y-10 pr-0 lg:pr-12">
            <div>
                 <span className="text-saddle-brown/60 text-xs font-bold tracking-widest uppercase mb-2 block">Phone Number</span>
                 <p className="text-2xl font-serif text-warm-cream">+1 800 551 3247</p>
            </div>
            
            <div>
                 <span className="text-saddle-brown/60 text-xs font-bold tracking-widest uppercase mb-2 block">Headquarters Address</span>
                 <p className="text-warm-cream/80 leading-relaxed max-w-xs">
                    5050 Westway Park Blvd #150, <br />
                    Houston, TX 77041, USA
                 </p>
            </div>

            <div>
                 <span className="text-saddle-brown/60 text-xs font-bold tracking-widest uppercase mb-4 block">Social Media</span>
                 <div className="flex gap-4">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                        <div key={i} className="w-10 h-10 border border-saddle-brown/30 hover:border-saddle-brown hover:bg-saddle-brown/10 rounded-sm transition-all duration-300 cursor-pointer"></div>
                    ))}
                 </div>
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="lg:col-span-2">
            <h3 className="text-saddle-brown text-sm font-bold tracking-widest uppercase mb-6">Company</h3>
            <ul className="space-y-4 text-sm text-warm-cream/60 font-medium">
                {["Our Company", "Our Mission/Goal", "Environment"].map((link) => (
                    <li key={link}>
                        <a href="#" className="hover:text-warm-cream hover:pl-2 transition-all duration-300 block">{link}</a>
                    </li>
                ))}
            </ul>
          </div>

          {/* Column 3: Stone Collection */}
          <div className="lg:col-span-3">
            <h3 className="text-saddle-brown text-sm font-bold tracking-widest uppercase mb-6">Stone Collection</h3>
            <ul className="space-y-4 text-sm text-warm-cream/60 font-medium">
                 {["Exotic color", "Projects"].map((link) => (
                    <li key={link}>
                        <a href="#" className="hover:text-warm-cream hover:pl-2 transition-all duration-300 block">{link}</a>
                    </li>
                ))}
            </ul>
          </div>

          {/* Column 4: News */}
          <div className="lg:col-span-3">
             <h3 className="text-saddle-brown text-sm font-bold tracking-widest uppercase mb-6">News</h3>
             <ul className="space-y-4 text-sm text-warm-cream/60 font-medium">
                 {["Latest Products", "Blogs", "Upcoming Trade Shows"].map((link) => (
                    <li key={link}>
                        <a href="#" className="hover:text-warm-cream hover:pl-2 transition-all duration-300 block">{link}</a>
                    </li>
                ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-saddle-brown/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs text-warm-cream/40 uppercase tracking-wider font-semibold">
           <div className="flex flex-col md:flex-row gap-6 md:gap-12">
               <span>Also of Interest</span>
               <a href="#" className="hover:text-warm-cream transition-colors text-white/60">What is Frac Sand</a>
               <a href="#" className="hover:text-warm-cream transition-colors text-white/60">How to define proppant</a>
           </div>
           
           <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                <p>© Copyright {new Date().getFullYear()} Maitrii Stone. All rights reserved.</p>
                {/* <span>Designed by Valmax</span> */}
           </div>
        </div>
      </div>
    </footer>
  );
}
