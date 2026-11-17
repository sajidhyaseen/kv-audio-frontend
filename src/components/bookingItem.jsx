import { useEffect, useState } from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import api from "../utils/api";
import { addToCart, removeFromCart } from "../utils/cart";
import { money } from "../utils/format";

export default function BookingItem({ itemKey, qty }) {
  const [item, setItem] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;
    api
      .get(`/api/products/${itemKey}`)
      .then((res) => {
        if (cancelled) return;
        setItem(res.data);
        setStatus("success");
      })
      .catch(() => {
        if (cancelled) return;
        // product no longer exists: drop it from the cart
        setStatus("error");
        removeFromCart(itemKey);
      });
    return () => {
      cancelled = true;
    };
  }, [itemKey]);

  if (status === "loading") {
    return <div className="w-full max-w-3xl h-28 rounded-xl bg-slate-200 animate-pulse" />;
  }
  if (status === "error" || !item) return null;

  return (
    <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl p-3 shadow-sm w-full max-w-3xl">
      <img src={item.image[0]} alt={item.name} className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg" />

      <div className="flex-grow min-w-0">
        <h2 className="text-base sm:text-lg font-semibold text-slate-800 truncate">{item.name}</h2>
        <p className="text-sm text-slate-500">{money(item.price)} / day</p>
        <div className="mt-2 inline-flex items-center rounded-lg border border-slate-300">
          <button className="px-3 py-2 hover:text-accent" onClick={() => addToCart(itemKey, -1)} aria-label="Decrease">
            <FaMinus />
          </button>
          <span className="w-8 text-center font-medium">{qty}</span>
          <button className="px-3 py-2 hover:text-accent" onClick={() => addToCart(itemKey, 1)} aria-label="Increase">
            <FaPlus />
          </button>
        </div>
      </div>

      <div className="text-right">
        <p className="text-sm text-slate-500">per day</p>
        <p className="text-lg font-semibold text-accent">{money(item.price * qty)}</p>
        <button className="mt-1 text-slate-400 hover:text-red-600" onClick={() => removeFromCart(itemKey)} aria-label="Remove">
          <FaTrash />
        </button>
      </div>
    </div>
  );
}
