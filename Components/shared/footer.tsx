import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-saddle-brown text-warm-cream pt-16 pb-8 border-t border-modern-earthy/20 font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-serif font-bold tracking-tight">Maitrii.</h2>
            <p className="text-warm-cream/80 text-sm leading-relaxed max-w-xs">
              Crafting timeless spaces with the world's finest natural and engineered stone surfaces. Experience elegance in every detail.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 rounded-full bg-warm-cream/10 hover:bg-warm-cream/20 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-warm-cream/10 hover:bg-warm-cream/20 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-warm-cream/10 hover:bg-warm-cream/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-warm-cream/10 hover:bg-warm-cream/20 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-6">Quick Links</h3>
            <ul className="flex flex-col gap-4 text-sm text-warm-cream/80">
              {["About Us", "Collections", "Projects", "Journal", "Careers"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-warm-cream transition-colors flex items-center gap-2 group">
                    <span className="h-px w-0 bg-warm-cream group-hover:w-4 transition-all duration-300"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-6">Collections</h3>
            <ul className="flex flex-col gap-4 text-sm text-warm-cream/80">
              {["Granite", "Marble", "Quartzite", "Onyx", "Semi-Precious"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-warm-cream transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-6">Contact Us</h3>
            <ul className="flex flex-col gap-6 text-sm text-warm-cream/80">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 shrink-0" />
                <span>123 Stone Gallery Avenue,<br />Design District, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 shrink-0" />
                <span>hello@maitriistone.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-warm-cream/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-warm-cream/60">
          <p>© {new Date().getFullYear()} Maitrii Stone Gallery. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-warm-cream transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-warm-cream transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-warm-cream transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
