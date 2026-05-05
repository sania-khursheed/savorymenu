import { Link } from "react-router-dom";
import { Utensils, Instagram, Twitter, Facebook, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-stone-400 pt-20 pb-10 px-6 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <div className="bg-brand-500 p-2 rounded-xl">
                <Utensils className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-2xl font-bold tracking-tight text-white">SavoryMenu</span>
            </Link>
            <p className="text-stone-500 leading-relaxed max-w-xs">
              Crafting unforgettable culinary experiences since 2010. We combine tradition with modern innovation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Navigation</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="hover:text-brand-500 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-brand-500 transition-colors">Our Story</Link></li>
              <li><Link to="/contact" className="hover:text-brand-500 transition-colors">Contact Us</Link></li>
              <li><Link to="/login" className="hover:text-brand-500 transition-colors">Admin Login</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-brand-500" />
                123 Culinary Ave, SF
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-500" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-500" />
                hello@savorymenu.com
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Follow Us</h4>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 bg-stone-800 rounded-xl flex items-center justify-center hover:bg-brand-500 hover:text-white transition-all"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <div className="mt-8">
              <p className="text-xs text-stone-600 font-medium uppercase tracking-widest mb-2">Subscribe to News</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email..." 
                  className="bg-stone-800 border-none rounded-lg px-3 py-2 text-sm w-full focus:ring-1 focus:ring-brand-500 outline-none" 
                />
                <button className="bg-brand-500 text-white px-3 py-2 rounded-lg text-sm font-bold">Ok</button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium uppercase tracking-[0.2em]">
          <p>© {currentYear} SavoryMenu Management. All Rights Reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-stone-200">Privacy Policy</a>
            <a href="#" className="hover:text-stone-200">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
