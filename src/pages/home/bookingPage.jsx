import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api, { apiError } from "../../utils/api";
import { getUser } from "../../utils/auth";
import { clearCart, formatDate, loadCart, setCartDates } from "../../utils/cart";
import { money } from "../../utils/format";
import BookingItem from "../../components/bookingItem";

const DAY = 24 * 60 * 60 * 1000;

export default function BookingPage() {
  const navigate = useNavigate();
  const today = formatDate(new Date());

  const [cart, setCart] = useState(loadCart());
  const saved = loadCart();
  const [startingDate, setStartingDate] = useState(saved.startingDate >= today ? saved.startingDate : today);
  const [endingDate, setEndingDate] = useState(
    saved.startingDate >= today && saved.endingDate > saved.startingDate ? saved.endingDate : formatDate(new Date(Date.now() + DAY))
  );
  const [quote, setQuote] = useState(null);
  const [quoteError, setQuoteError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const days = Math.max(Math.round((new Date(endingDate) - new Date(startingDate)) / DAY), 1);
  const items = cart.orderedItems;
  const itemsKey = JSON.stringify(items);

  useEffect(() => {
    const refresh = () => setCart(loadCart());
    window.addEventListener("cart:updated", refresh);
    return () => window.removeEventListener("cart:updated", refresh);
  }, []);

  useEffect(() => {
    setCartDates(startingDate, endingDate);
  }, [startingDate, endingDate]);

  useEffect(() => {
    if (items.length === 0) {
      setQuote(null);
      setQuoteError("");
      return;
    }
    let cancelled = false;
    api
      .post("/api/orders/quote", { orderedItems: items, startingDate, endingDate })
      .then((res) => {
        if (cancelled) return;
        setQuote(res.data);
        setQuoteError("");
      })
      .catch((err) => {
        if (cancelled) return;
        setQuote(null);
        setQuoteError(apiError(err, "Could not calculate the price"));
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsKey, startingDate, endingDate]);

  async function handleBookingCreation() {
    if (!getUser()) {
      toast.error("Please log in to complete your booking");
      navigate("/login");
      return;
    }
    setSubmitting(true);
    try {
      await api.post("/api/orders", { orderedItems: items, startingDate, endingDate });
      clearCart();
      toast.success("Booking sent! We will confirm it by email.");
      navigate("/my-orders");
    } catch (err) {
      toast.error(apiError(err, "Failed to create booking"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-800">Your cart</h1>

      {items.length === 0 ? (
        <div className="mt-10 text-center py-16 bg-white rounded-2xl border border-slate-100">
          <p className="text-slate-500">Your cart is empty.</p>
          <Link to="/items" className="btn btn-accent mt-4">Browse equipment</Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 flex flex-col gap-3">
            {items.map((item) => <BookingItem key={item.key} itemKey={item.key} qty={item.qty} />)}
          </div>

          <aside className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 h-fit lg:sticky lg:top-24">
            <h2 className="font-semibold text-slate-800">Rental period</h2>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <label className="text-xs font-medium text-slate-600 flex flex-col gap-1">
                Start
                <input type="date" className="input" min={today} value={startingDate} onChange={(e) => {
                  setStartingDate(e.target.value);
                  if (e.target.value >= endingDate) setEndingDate(formatDate(new Date(new Date(e.target.value).getTime() + DAY)));
                }} />
              </label>
              <label className="text-xs font-medium text-slate-600 flex flex-col gap-1">
                End
                <input type="date" className="input" min={startingDate} value={endingDate} onChange={(e) => setEndingDate(e.target.value)} />
              </label>
            </div>
            <p className="mt-3 text-sm text-slate-600">Duration: <span className="font-semibold text-accent">{days} day{days > 1 ? "s" : ""}</span></p>

            <div className="mt-4 border-t pt-4">
              {quoteError ? (
                <p className="text-sm text-red-600">{quoteError}</p>
              ) : (
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Total</span>
                  <span className="text-2xl font-bold text-accent">{quote ? money(quote.total) : "..."}</span>
                </div>
              )}
            </div>

            <button className="btn btn-accent w-full mt-4" disabled={submitting || !!quoteError || !quote} onClick={handleBookingCreation}>
              {submitting ? "Sending..." : "Create booking"}
            </button>
            {!getUser() && <p className="mt-2 text-xs text-slate-500">You will be asked to log in before the booking is sent.</p>}
          </aside>
        </div>
      )}
    </div>
  );
}
