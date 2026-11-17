import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api, { apiError } from "../../utils/api";
import { getUser } from "../../utils/auth";
import { fmtDate, fmtDateTime, money } from "../../utils/format";
import StatusBadge from "../../components/statusBadge";
import Spinner from "../../components/spinner";

export default function MyOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(null);

  function load() {
    api
      .get("/api/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => {
        toast.error(apiError(err, "Could not load your bookings"));
        setOrders([]);
      });
  }

  useEffect(() => {
    if (!getUser()) {
      navigate("/login");
      return;
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function cancel(orderId) {
    if (!window.confirm("Cancel this booking?")) return;
    try {
      await api.put(`/api/orders/cancel/${orderId}`);
      toast.success("Booking cancelled");
      load();
    } catch (err) {
      toast.error(apiError(err, "Could not cancel the booking"));
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-800">My bookings</h1>

      {orders === null ? (
        <Spinner />
      ) : orders.length === 0 ? (
        <div className="mt-10 text-center py-16 bg-white rounded-2xl border border-slate-100">
          <p className="text-slate-500">You have not made any bookings yet.</p>
          <Link to="/items" className="btn btn-accent mt-4">Browse equipment</Link>
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-4">
          {orders.map((o) => (
            <div key={o._id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-bold text-slate-800">{o.orderId}</p>
                  <p className="text-xs text-slate-500">Placed {fmtDateTime(o.orderDate)}</p>
                </div>
                <StatusBadge status={o.status} />
              </div>

              <p className="mt-3 text-sm text-slate-600">
                {fmtDate(o.startingDate)} → {fmtDate(o.endingDate)} · {o.days} day{o.days > 1 ? "s" : ""}
              </p>

              <ul className="mt-3 divide-y">
                {o.orderedItems.map((i) => (
                  <li key={i.product.key} className="py-2 flex items-center gap-3">
                    <img src={i.product.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                    <span className="flex-1 text-slate-800">{i.product.name}</span>
                    <span className="text-sm text-slate-500">× {i.quantity}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex items-center justify-between">
                <p className="text-lg font-bold text-accent">{money(o.totalAmount)}</p>
                {o.status === "Pending" && (
                  <button className="btn btn-outline !py-1 text-sm text-red-600" onClick={() => cancel(o.orderId)}>Cancel booking</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
