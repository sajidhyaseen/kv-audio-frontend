import { useCallback, useEffect, useMemo, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import Spinner from "../../components/spinner";

export default function Gallery() {
  const [products, setProducts] = useState(null);
  const [category, setCategory] = useState("all");
  const [active, setActive] = useState(null); // index inside `photos`

  useEffect(() => {
    api.get("/api/products").then((res) => setProducts(res.data)).catch(() => setProducts([]));
  }, []);

  const categories = useMemo(() => ["all", ...new Set((products || []).map((p) => p.category))], [products]);

  const photos = useMemo(
    () =>
      (products || [])
        .filter((p) => category === "all" || p.category === category)
        .flatMap((p) => p.image.map((src) => ({ src, name: p.name, key: p.key }))),
    [products, category]
  );

  const close = useCallback(() => setActive(null), []);
  const step = useCallback((d) => setActive((i) => (i === null ? i : (i + d + photos.length) % photos.length)), [photos.length]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close, step]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-800">Gallery</h1>
      <p className="text-slate-500">A look at our equipment.</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full px-4 py-1 text-sm font-medium capitalize ${
              category === c ? "bg-accent text-white" : "bg-white border border-slate-300 text-slate-600 hover:bg-slate-100"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {products === null ? (
        <Spinner />
      ) : photos.length === 0 ? (
        <p className="py-16 text-center text-slate-500">No photos yet.</p>
      ) : (
        <div className="mt-6 columns-2 md:columns-3 lg:columns-4 gap-4 [&>*]:mb-4">
          {photos.map((p, i) => (
            <button key={p.src} onClick={() => setActive(i)} className="block w-full overflow-hidden rounded-xl group relative">
              <img src={p.src} alt={p.name} loading="lazy" className="w-full object-cover transition duration-300 group-hover:scale-105" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-left text-sm text-white opacity-0 group-hover:opacity-100 transition">
                {p.name}
              </span>
            </button>
          ))}
        </div>
      )}

      {active !== null && photos[active] && (
        <div className="fixed inset-0 z-[1100] bg-black/90 flex items-center justify-center p-4" onClick={close}>
          <button className="absolute top-4 right-4 text-white text-3xl" onClick={close} aria-label="Close"><FaTimes /></button>
          <button className="absolute left-3 md:left-8 text-white text-3xl p-2" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous"><FaChevronLeft /></button>
          <div className="max-w-4xl w-full text-center" onClick={(e) => e.stopPropagation()}>
            <img src={photos[active].src} alt={photos[active].name} className="max-h-[75vh] mx-auto rounded-lg object-contain" />
            <p className="mt-3 text-white font-medium">{photos[active].name}</p>
            <Link to={`/product/${photos[active].key}`} className="text-accent text-sm hover:underline" onClick={close}>View details</Link>
          </div>
          <button className="absolute right-3 md:right-8 text-white text-3xl p-2" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next"><FaChevronRight /></button>
        </div>
      )}
    </div>
  );
}
