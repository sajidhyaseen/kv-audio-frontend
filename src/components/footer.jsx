import { Link } from "react-router-dom";
import { navLinks, siteConfig } from "../config/site";

export default function Footer() {
  const { contact } = siteConfig;
  return (
    <footer className="mt-16 border-t border-slate-800/80 bg-ink text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr]">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src="/logo.png" alt="" className="w-10 h-10 rounded-full object-cover border-2 border-accent" />
            <span className="text-xl font-bold text-white">{siteConfig.name}</span>
          </div>
          <p className="max-w-sm text-sm leading-6 text-slate-400">
            {siteConfig.tagline}. Browse the catalogue, check availability for your dates and book online.
          </p>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-white">Quick links</h3>
          <ul className="space-y-2.5 text-sm">
            {navLinks.map((l) => (
              <li key={l.to}><Link to={l.to} className="text-slate-400 transition-colors hover:text-accent">{l.label}</Link></li>
            ))}
            <li><Link to="/my-orders" className="text-slate-400 transition-colors hover:text-accent">My Bookings</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-white">Contact</h3>
          <ul className="space-y-2.5 text-sm text-slate-400">
            {contact.email && <li className="break-all">{contact.email}</li>}
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
