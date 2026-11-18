import { useEffect } from "react";
import { CiHome, CiSpeaker } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { MdOutlineContactMail } from "react-icons/md";
import { RiGalleryLine } from "react-icons/ri";
import { BsCalendar2Check } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import api from "../utils/api";

export default function MobileNavPanel({ isOpen, setOpen, user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, setOpen]);

  function goTo(route) {
    navigate(route);
    setOpen(false);
  }

  async function handleLogout() {
    try {
      await api.post("/api/users/logout");
    } finally {
      logout();
    }
  }

  const row = "text-[15px] font-medium text-slate-200 px-4 py-3 flex items-center gap-3 cursor-pointer rounded-lg mx-2 hover:bg-white/10";

  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen bg-[#00000070] z-[1000] transition-opacity duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={() => setOpen(false)}
      aria-hidden={!isOpen}
    >
      <div
        id="mobile-navigation"
        className={`h-full bg-[#151c2b] w-[300px] max-w-[85vw] transform transition-transform duration-300 text-left ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="bg-ink w-full h-[70px] flex relative justify-center items-center">
          <img src="/logo.png" className="w-[46px] h-[46px] object-cover border-2 border-accent absolute left-3 rounded-full" alt="logo" />
          <button type="button" className="absolute right-3 h-10 w-10 rounded-lg flex items-center justify-center text-2xl text-white transition hover:bg-white/10" onClick={() => setOpen(false)} aria-label="Close menu">
            <IoMdClose />
          </button>
        </div>

        <div onClick={() => goTo("/")} className={row}><CiHome /> Home</div>
        <div onClick={() => goTo("/items")} className={row}><CiSpeaker /> Items</div>
        <div onClick={() => goTo("/gallery")} className={row}><RiGalleryLine /> Gallery</div>
        <div onClick={() => goTo("/contact")} className={row}><MdOutlineContactMail /> Contact</div>
        <div onClick={() => goTo("/booking")} className={row}><BsCalendar2Check /> Cart</div>
        {user && <div onClick={() => goTo("/my-orders")} className={row}><BsCalendar2Check /> My Bookings</div>}
        {user?.role === "admin" && <div onClick={() => goTo("/admin")} className={row}><CiSpeaker /> Admin</div>}

        <div className="border-t border-slate-700 mt-2 pt-2">
          {user ? (
            <div onClick={handleLogout} className={row}>Logout</div>
          ) : (
            <>
              <div onClick={() => goTo("/login")} className={row}>Login</div>
              <div onClick={() => goTo("/register")} className={row}>Sign up</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
