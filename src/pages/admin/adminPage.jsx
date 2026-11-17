import { BsSpeakerFill } from "react-icons/bs";
import { FaEnvelope, FaPeopleGroup, FaStar } from "react-icons/fa6";
import { MdBookmarkAdded } from "react-icons/md";
import { TbGraphFilled } from "react-icons/tb";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { getUser } from "../../utils/auth";
import Spinner from "../../components/spinner";
import AdminDashboard from "./adminDashboard";
import AdminItemsPage from "./adminItemsPage";
import AddItemPage from "./addItemPage";
import UpdateItemPage from "./updateItemPage";
import AdminUsersPage from "./adminUsersPage";
import AdminOrdersPage from "./adminBookingPage";
import AdminReviewsPage from "./adminReviewsPage";
import AdminInquiriesPage from "./adminInquiriesPage";

const LINKS = [
  { to: "/admin", label: "Dashboard", icon: TbGraphFilled, end: true },
  { to: "/admin/orders", label: "Orders", icon: MdBookmarkAdded },
  { to: "/admin/items", label: "Items", icon: BsSpeakerFill },
  { to: "/admin/users", label: "Users", icon: FaPeopleGroup },
  { to: "/admin/reviews", label: "Reviews", icon: FaStar },
  { to: "/admin/inquiries", label: "Inquiries", icon: FaEnvelope },
];

export default function AdminPage() {
  const [userValidated, setUserValidated] = useState(false);

  useEffect(() => {
    if (!getUser()) {
      window.location.href = "/login";
      return;
    }
    api
      .get("/api/users/")
      .then((res) => {
        if (res.data.role === "admin") setUserValidated(true);
        else window.location.href = "/";
      })
      .catch(() => {
        sessionStorage.removeItem("user");
        window.location.href = "/login";
      });
  }, []);

  return (
    <div className="w-full h-screen flex bg-[#f7f8fb]">
      <aside className="w-16 md:w-60 h-full bg-ink text-slate-200 flex flex-col shrink-0 shadow-xl shadow-slate-950/10">
        <Link to="/" className="h-[70px] flex items-center justify-center md:justify-start md:px-4 gap-3 border-b border-slate-700">
          <img src="/logo.png" alt="" className="w-9 h-9 rounded-full object-cover border-2 border-accent" />
          <span className="hidden md:block font-bold tracking-tight text-white">KV Admin<span className="text-accent">.</span></span>
        </Link>
        <nav className="flex-1 py-2">
          {LINKS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              title={label}
              className={({ isActive }) =>
                `mx-2 flex items-center justify-center rounded-xl md:justify-start gap-3 px-4 py-3 text-lg transition ${isActive ? "bg-accent text-white shadow-lg shadow-accent/20" : "text-slate-400 hover:bg-white/10 hover:text-white"}`
              }
            >
              <Icon />
              <span className="hidden md:block text-base">{label}</span>
            </NavLink>
          ))}
        </nav>
        <Link to="/" className="px-4 py-3 text-sm text-center md:text-left text-slate-400 hover:text-white border-t border-slate-700">
          ← <span className="hidden md:inline">Back to site</span>
        </Link>
      </aside>

      <main className="flex-1 h-full overflow-y-auto">
        {userValidated ? (
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/orders" element={<AdminOrdersPage />} />
            <Route path="/users" element={<AdminUsersPage />} />
            <Route path="/items" element={<AdminItemsPage />} />
            <Route path="/items/add" element={<AddItemPage />} />
            <Route path="/items/edit" element={<UpdateItemPage />} />
            <Route path="/reviews" element={<AdminReviewsPage />} />
            <Route path="/inquiries" element={<AdminInquiriesPage />} />
          </Routes>
        ) : (
          <Spinner className="h-full" />
        )}
      </main>
    </div>
  );
}
