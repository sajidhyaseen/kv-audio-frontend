import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import MobileNavPanel from "./mobileNavPanel";
import { cartCount } from "../utils/cart";
import { getUser, logout } from "../utils/auth";
import { navLinks, siteConfig } from "../config/site";
import api from "../utils/api";
import UserAvatar from "./userAvatar";

export default function Header() {
  const [navPanelOpen, setNavPanelOpen] = useState(false);
  const [count, setCount] = useState(cartCount());
  const user = getUser();

  useEffect(() => {
    const update = () => setCount(cartCount());
    window.addEventListener("cart:updated", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("cart:updated", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  const linkClass = ({ isActive }) =>
    `relative px-3 py-2 text-sm font-medium transition ${isActive ? "text-white after:absolute after:inset-x-3 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-accent" : "text-slate-300 hover:text-white"}`;

  return (
    <header className="sticky top-0 z-40 w-full h-[74px] max-md:h-[64px] border-b border-white/10 bg-ink/95 text-white shadow-lg shadow-slate-950/10 backdrop-blur-md">
      <div className="mx-auto h-full max-w-7xl px-4 max-md:px-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 max-md:gap-2">
          <img src="/logo.png" alt="logo" className="w-[46px] h-[46px] max-md:w-10 max-md:h-10 object-cover rounded-full border-2 border-accent" />
          <span className="text-lg max-md:text-[15px] font-bold tracking-tight">{siteConfig.name}<span className="text-accent">.</span></span>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>{l.label}</NavLink>
          ))}
          {user && <NavLink to="/my-orders" className={linkClass}>My Bookings</NavLink>}
          {user?.role === "admin" && <NavLink to="/admin" className={linkClass}>Admin</NavLink>}
        </nav>

        <div className="flex items-center gap-4 max-md:gap-1">
          <Link
            to="/booking"
            className="relative rounded-lg p-2 max-md:p-2 text-xl max-md:text-lg text-slate-200 transition hover:bg-white/10 hover:text-white"
            aria-label={`Cart${count > 0 ? `, ${count} item${count === 1 ? "" : "s"}` : ""}`}
          >
            <FaCartShopping />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-accent text-white text-[10px] font-bold flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                {user.profilePicture ? (
                  <UserAvatar src={user.profilePicture} firstName={user.firstName} lastName={user.lastName} email={user.email} size="sm" />
                ) : (
                  <UserAvatar firstName={user.firstName} lastName={user.lastName} email={user.email} size="sm" />
                )}
                <button className="text-sm text-slate-300 transition hover:text-white" onClick={async () => {
                  try { await api.post("/api/users/logout"); } finally { logout(); }
                }}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm text-slate-200 hover:text-white">Login</Link>
                <Link to="/register" className="btn btn-accent !py-1 text-sm">Sign up</Link>
              </>
            )}
          </div>

          <button className="md:hidden h-10 w-10 rounded-lg flex items-center justify-center text-[22px] transition hover:bg-white/10" onClick={() => setNavPanelOpen(true)} aria-label="Open menu" aria-expanded={navPanelOpen} aria-controls="mobile-navigation">
            <GiHamburgerMenu />
          </button>
        </div>
      </div>
      <MobileNavPanel isOpen={navPanelOpen} setOpen={setNavPanelOpen} user={user} />
    </header>
  );
}
