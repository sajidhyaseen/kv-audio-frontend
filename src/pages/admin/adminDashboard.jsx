import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api, { apiError } from "../../utils/api";
import { fmtDate, money } from "../../utils/format";
import StatusBadge from "../../components/statusBadge";
import Spinner from "../../components/spinner";

function Card({ label, value, to, tone = "text-slate-800" }) {
  const body = (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition">
      <p className="text-sm text-slate-500">{label}</p>
      <p className={`mt-1 text-3xl font-bold ${tone}`}>{value}</p>
    </div>
  );
  return to ? <Link to={to}>{body}</Link> : body;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/api/admin/stats").then((res) => setStats(res.data)).catch((err) => setError(apiError(err, "Could not load stats")));
  }, []);

  if (error) return <p className="p-6 text-red-600">{error}</p>;
  if (!stats) return <Spinner />;

  return (
    <div className="p-6 max-w-6xl">
      <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card label="Pending bookings" value={stats.ordersByStatus.Pending} to="/admin/orders" tone="text-amber-600" />
        <Card label="Approved bookings" value={stats.ordersByStatus.Approved} to="/admin/orders" tone="text-green-600" />
        <Card label="Approved revenue" value={money(stats.revenue)} tone="text-accent" />
        <Card label="Items" value={stats.products} to="/admin/items" />
        <Card label="Users" value={stats.users} to="/admin/users" />
        <Card label="Reviews to approve" value={stats.pendingReviews} to="/admin/reviews" />
        <Card label="Open inquiries" value={stats.openInquiries} to="/admin/inquiries" />
        <Card label="Rejected / cancelled" value={stats.ordersByStatus.Rejected + stats.ordersByStatus.Cancelled} />
      </div>

      <h2 className="mt-8 mb-3 text-lg font-semibold text-slate-800">Recent bookings</h2>
      <div className="bg-white rounded-2xl border border-slate-200 divide-y">
        {stats.recentOrders.length === 0 && <p className="p-4 text-slate-500">No bookings yet.</p>}
        {stats.recentOrders.map((o) => (
          <div key={o._id} className="p-4 flex flex-wrap items-center justify-between gap-2 text-sm">
            <div>
              <p className="font-semibold text-slate-800">{o.orderId} <span className="font-normal text-slate-500">· {o.email}</span></p>
              <p className="text-slate-500">{fmtDate(o.startingDate)} → {fmtDate(o.endingDate)}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold">{money(o.totalAmount)}</span>
              <StatusBadge status={o.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
