


import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-saddle-brown text-warm-cream pt-24 pb-12 font-sans relative overflow-hidden">
      
      {/* Decorative SVG Pattern Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
         <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="footer-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
               <path d="M0 100 C 20 0 50 0 100 100 Z" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#footer-pattern)"/>
            {/* Organic curve overlay */}
            <circle cx="90%" cy="10%" r="40%" fill="url(#footer-gradient)"  />
            <defs>
              <radialGradient id="footer-gradient" cx="0.5" cy="0.5" r="0.5">
                  <stop offset="0%" stopColor="white" stopOpacity="0.2"/>
                  <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
              </radialGradient>
            </defs>
         </svg>
      </div>

      {/* Main Decorative Blur */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-warm-cream/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Column 1: Contact Info (Wide) */}
          <div className="lg:col-span-4 space-y-10 pr-0 lg:pr-12">
            <div>
                 <span className="text-warm-cream/60 text-xs font-bold tracking-widest uppercase mb-2 block">Phone Number</span>
                 <p className="text-3xl font-serif text-warm-cream tracking-tight hover:text-white transition-colors cursor-pointer">+1 800 551 3247</p>
            </div>
            
            <div>
                 <span className="text-warm-cream/60 text-xs font-bold tracking-widest uppercase mb-2 block">Headquarters Address</span>
                 <p className="text-warm-cream/80 leading-relaxed max-w-xs text-lg">
                    5050 Westway Park Blvd #150, <br />
                    Houston, TX 77041, USA
                 </p>
            </div>

            <div>
                 <span className="text-warm-cream/60 text-xs font-bold tracking-widest uppercase mb-5 block">Social Media</span>
                 <div className="flex gap-4">
                    {[
                      { Icon: Facebook, href: "#" },
                      { Icon: Instagram, href: "#" },
                      { Icon: Linkedin, href: "#" },
                      { Icon: Twitter, href: "#" },
                      { Icon: Youtube, href: "#" }
                    ].map((item, i) => (
                        <a key={i} href={item.href} className="w-10 h-10 flex items-center justify-center border border-warm-cream/20 text-warm-cream/80 hover:text-saddle-brown hover:bg-warm-cream hover:border-warm-cream rounded-full transition-all duration-300 transform hover:-translate-y-1">
                          <item.Icon className="w-5 h-5" />
                        </a>
                    ))}
                 </div>
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="lg:col-span-2">
            <h3 className="text-warm-cream text-sm font-bold tracking-widest uppercase mb-8 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-warm-cream/30">Company</h3>
            <ul className="space-y-4 text-sm text-warm-cream/70 font-medium">
                {["Our Company", "Our Mission/Goal", "Environment", "Careers", "Contact"].map((link) => (
                    <li key={link}>
                        <a href="#" className="hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center gap-2">
                          <span className="w-1 h-1 bg-warm-cream/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                          {link}
                        </a>
                    </li>
                ))}
            </ul>
          </div>

          {/* Column 3: Stone Collection */}
          <div className="lg:col-span-3">
            <h3 className="text-warm-cream text-sm font-bold tracking-widest uppercase mb-8 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-warm-cream/30">Collections</h3>
            <ul className="space-y-4 text-sm text-warm-cream/70 font-medium">
                 {["Exotic Collection", "Projects Gallery", "Virtual Visualizer", "New Arrivals"].map((link) => (
                    <li key={link}>
                        <a href="#" className="hover:text-white hover:translate-x-1 transition-all duration-300 block">{link}</a>
                    </li>
                ))}
            </ul>
          </div>

          {/* Column 4: News */}
          <div className="lg:col-span-3">
             <h3 className="text-warm-cream text-sm font-bold tracking-widest uppercase mb-8 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-warm-cream/30">Updates</h3>
             <ul className="space-y-4 text-sm text-warm-cream/70 font-medium">
                 {["Latest Products", "Stone Blogs", "Upcoming Trade Shows", "Press Releases"].map((link) => (
                    <li key={link}>
                        <a href="#" className="hover:text-white hover:translate-x-1 transition-all duration-300 block">{link}</a>
                    </li>
                ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-warm-cream/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs text-warm-cream/40 uppercase tracking-wider font-semibold">
           <div className="flex flex-col md:flex-row gap-4 md:gap-8">
               <span className="text-warm-cream/20">Resources:</span>
               <a href="#" className="hover:text-warm-cream transition-colors">What is Frac Sand</a>
               <a href="#" className="hover:text-warm-cream transition-colors">Proppant Guide</a>
           </div>
           
           <div className="flex flex-col md:flex-row gap-6 md:gap-12 md:items-center">
                <p>© {new Date().getFullYear()} Maitrii Stone. Crafted by Nature.</p>
           </div>
        </div>
      </div>
    </footer>
  );
}
