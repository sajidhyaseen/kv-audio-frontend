import { CiHome, CiSpeaker } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { MdOutlineContactMail } from "react-icons/md";
import { RiGalleryLine } from "react-icons/ri";
import { BsCalendar2Check } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

export default function MobileNavPanel({ isOpen, setOpen, user }) {
  const navigate = useNavigate();

  function goTo(route) {
    navigate(route);
    setOpen(false);
  }

  const row = "text-[20px] text-ink px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-slate-100";

  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen bg-[#00000070] z-[1000] transition-opacity duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={() => setOpen(false)}
    >
      <div
        className={`h-full bg-white w-[300px] transform transition-transform duration-300 text-left ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-ink w-full h-[70px] flex relative justify-center items-center">
          <img src="/logo.png" className="w-[46px] h-[46px] object-cover border-2 border-accent absolute left-3 rounded-full" alt="logo" />
          <IoMdClose className="absolute right-3 text-3xl cursor-pointer text-white" onClick={() => setOpen(false)} />
        </div>

        <div onClick={() => goTo("/")} className={row}><CiHome /> Home</div>
        <div onClick={() => goTo("/items")} className={row}><CiSpeaker /> Items</div>
        <div onClick={() => goTo("/gallery")} className={row}><RiGalleryLine /> Gallery</div>
        <div onClick={() => goTo("/contact")} className={row}><MdOutlineContactMail /> Contact</div>
        <div onClick={() => goTo("/booking")} className={row}><BsCalendar2Check /> Cart</div>
        {user && <div onClick={() => goTo("/my-orders")} className={row}><BsCalendar2Check /> My Bookings</div>}
        {user?.role === "admin" && <div onClick={() => goTo("/admin")} className={row}><CiSpeaker /> Admin</div>}

        <div className="border-t mt-2 pt-2">
          {user ? (
            <div onClick={logout} className={row}>Logout</div>
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
