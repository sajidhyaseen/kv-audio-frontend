import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { addToCart } from "../utils/cart";
import { money } from "../utils/format";

export default function ProductCard({ item }) {
  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-white hover:shadow-xl transition-shadow duration-300 flex flex-col group">
      <Link to={`/product/${item.key}`} className="block w-full aspect-[4/3] relative overflow-hidden bg-slate-100">
        <img
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
          src={item.image?.[0] || "/logo.png"}
          alt={item.name}
          loading="lazy"
        />
        <span className="absolute top-3 left-3 rounded-full bg-ink/80 px-3 py-1 text-xs font-medium text-white capitalize">
          {item.category}
        </span>
      </Link>

      <div className="p-4 flex flex-col flex-grow gap-2">
        <h2 className="text-lg font-semibold text-slate-800">{item.name}</h2>
        <p className="text-sm text-slate-600 line-clamp-2">{item.description}</p>
        <div className="mt-auto pt-2 flex items-end justify-between">
          <div>
            <span className="text-xl font-bold text-accent">{money(item.price)}</span>
            <span className="text-xs text-slate-500"> / day</span>
          </div>
          <span className={`rounded-full px-2 py-1 text-xs font-medium ${item.availability ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {item.availability ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>

      <div className="px-4 pb-4 flex gap-2">
        <Link to={`/product/${item.key}`} className="btn btn-outline flex-1 text-sm">Details</Link>
        <button
          className="btn btn-accent flex-1 text-sm"
          disabled={!item.availability}
          onClick={() => {
            addToCart(item.key, 1);
            toast.success("Added to cart");
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
