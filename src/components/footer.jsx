import { Link } from "react-router-dom";
import { navLinks, siteConfig } from "../config/site";

export default function Footer() {
  const { contact } = siteConfig;
  return (
    <footer className="bg-ink text-slate-300 mt-16">
      <div className="mx-auto max-w-7xl px-4 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <img src="/logo.png" alt="" className="w-10 h-10 rounded-full object-cover border-2 border-accent" />
            <span className="text-xl font-bold text-white">{siteConfig.name}</span>
          </div>
          <p className="text-sm">{siteConfig.tagline}. Browse the catalogue, check availability for your dates and book online.</p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3">Quick links</h3>
          <ul className="space-y-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.to}><Link to={l.to} className="hover:text-accent">{l.label}</Link></li>
            ))}
            <li><Link to="/my-orders" className="hover:text-accent">My Bookings</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            {contact.email && <li>{contact.email}</li>}
            {contact.phone && <li>{contact.phone}</li>}
            {contact.address && <li>{contact.address}</li>}
            {contact.hours && <li>{contact.hours}</li>}
            <li><Link to="/contact" className="text-accent hover:underline">Send us a message</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-700 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
