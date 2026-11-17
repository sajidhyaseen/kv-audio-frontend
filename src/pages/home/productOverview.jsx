import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api, { apiError } from "../../utils/api";
import ImageSlider from "../../components/imageSlider";
import Spinner from "../../components/spinner";
import { addToCart, formatDate, loadCart, setCartDates } from "../../utils/cart";
import { money } from "../../utils/format";

const DAY = 24 * 60 * 60 * 1000;

export default function ProductOverview() {
  const { key } = useParams();
  const [status, setStatus] = useState("loading");
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  const today = formatDate(new Date());
  const saved = loadCart();
  const [start, setStart] = useState(saved.startingDate >= today ? saved.startingDate : today);
  const [end, setEnd] = useState(saved.endingDate > saved.startingDate && saved.startingDate >= today ? saved.endingDate : formatDate(new Date(Date.now() + DAY)));
  const [avail, setAvail] = useState(null);
  const [availError, setAvailError] = useState("");

  useEffect(() => {
    setStatus("loading");
    api
      .get(`/api/products/${key}`)
      .then((res) => {
        setProduct(res.data);
        setStatus("loaded");
      })
      .catch(() => setStatus("error"));
  }, [key]);

  useEffect(() => {
    if (status !== "loaded") return;
    setAvail(null);
    setAvailError("");
    api
      .get(`/api/products/${key}/availability`, { params: { start, end } })
      .then((res) => {
        setAvail(res.data);
        setQty((q) => Math.max(1, Math.min(q, res.data.available || 1)));
      })
      .catch((err) => setAvailError(apiError(err, "Could not check availability")));
  }, [status, key, start, end]);

  const days = Math.max(Math.round((new Date(end) - new Date(start)) / DAY), 1);
  const canBook = product?.availability && avail && avail.available > 0;

  if (status === "loading") return <Spinner className="h-[60vh]" />;

  if (status === "error" || !product) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-bold text-slate-800">We could not find that item</h1>
        <Link to="/items" className="btn btn-accent mt-4">Browse equipment</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Link to="/items" className="text-sm text-slate-500 hover:text-accent">← Back to equipment</Link>

      <div className="mt-4 grid gap-8 md:grid-cols-2">
        <ImageSlider images={product.image} />

        <div>
          <span className="rounded-full bg-ink/90 px-3 py-1 text-xs font-medium text-white capitalize">{product.category}</span>
          <h1 className="mt-3 text-3xl font-bold text-slate-800">{product.name}</h1>
          <p className="mt-2 text-2xl font-semibold text-accent">
            {money(product.price)} <span className="text-sm font-normal text-slate-500">/ day</span>
          </p>
          <p className="mt-4 text-slate-600 whitespace-pre-line">{product.description}</p>
          <p className="mt-3 text-sm text-slate-500"><span className="font-medium text-slate-700">Dimensions:</span> {product.dimensions}</p>

          <div className="mt-6 rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
            <h2 className="font-semibold text-slate-800">Check availability</h2>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <label className="text-xs font-medium text-slate-600 flex flex-col gap-1">
                From
                <input type="date" className="input" min={today} value={start} onChange={(e) => {
                  setStart(e.target.value);
                  if (e.target.value >= end) setEnd(formatDate(new Date(new Date(e.target.value).getTime() + DAY)));
                }} />
              </label>
              <label className="text-xs font-medium text-slate-600 flex flex-col gap-1">
                To
                <input type="date" className="input" min={start} value={end} onChange={(e) => setEnd(e.target.value)} />
              </label>
            </div>

            <div className="mt-3 text-sm min-h-[24px]">
              {availError && <span className="text-red-600">{availError}</span>}
              {!availError && !avail && <span className="text-slate-400">Checking...</span>}
              {avail && avail.available > 0 && product.availability && (
                <span className="text-green-700 font-medium">{avail.available} of {avail.total} available for these dates</span>
              )}
              {avail && (avail.available === 0 || !product.availability) && (
                <span className="text-red-600 font-medium">Not available for these dates</span>
              )}
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center rounded-lg border border-slate-300">
                <button className="px-3 py-2 hover:text-accent" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">−</button>
                <span className="w-8 text-center font-medium">{qty}</span>
                <button className="px-3 py-2 hover:text-accent" onClick={() => setQty((q) => Math.min(avail?.available || 1, q + 1))} aria-label="Increase">+</button>
              </div>
              <button
                className="btn btn-accent flex-1"
                disabled={!canBook}
                onClick={() => {
                  setCartDates(start, end);
                  addToCart(product.key, qty);
                  toast.success("Added to cart");
                }}
              >
                Add to cart
              </button>
            </div>

            <p className="mt-3 text-sm text-slate-500">
              {days} day{days > 1 ? "s" : ""} · estimated {money(product.price * qty * days)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
