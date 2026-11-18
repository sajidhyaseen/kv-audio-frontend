import { useEffect, useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import api, { apiError } from "../../utils/api";
import ProductCard from "../../components/productCard";
import Spinner from "../../components/spinner";

const SORTS = {
  default: "Featured",
  price_asc: "Price: low to high",
  price_desc: "Price: high to low",
  name: "Name A-Z",
};

export default function Items() {
  const [state, setState] = useState("loading"); // loading | success | error
  const [errorMessage, setErrorMessage] = useState("");
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const loadItems = () => {
    setState("loading");
    setErrorMessage("");
    api
      .get("/api/products")
      .then((res) => {
        setItems(res.data);
        setState("success");
      })
      .catch((err) => {
        setErrorMessage(apiError(err, "Failed to load products"));
        setState("error");
      });
  };

  useEffect(() => {
    loadItems();
  }, []);

  const categories = useMemo(() => ["all", ...new Set(items.map((i) => i.category))], [items]);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = items.filter(
      (i) =>
        (category === "all" || i.category === category) &&
        (!q || i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q))
    );
    if (sort === "price_asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price_desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [items, search, category, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-800">Equipment</h1>
      <p className="text-slate-500">Everything available for rent.</p>

      <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative md:w-80">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <label className="sr-only" htmlFor="equipment-search">Search equipment</label>
          <input id="equipment-search" className="input !pl-10" placeholder="Search equipment" value={search} onChange={(e) => setSearch(e.target.value)} />
          {search && (
            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 hover:text-slate-800" onClick={() => setSearch("")}>
              Clear
            </button>
          )}
        </div>
        <label className="sr-only" htmlFor="equipment-sort">Sort equipment</label>
        <select id="equipment-sort" className="input md:w-56" value={sort} onChange={(e) => setSort(e.target.value)}>
          {Object.entries(SORTS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full px-4 py-1 text-sm font-medium capitalize transition ${
              category === c ? "bg-accent text-white" : "bg-white border border-slate-300 text-slate-600 hover:bg-slate-100"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {state === "loading" && <Spinner />}
        {state === "error" && (
          <div className="mx-auto max-w-md rounded-2xl border border-red-100 bg-red-50 p-6 text-center">
            <p className="font-medium text-red-700">{errorMessage}</p>
            <button type="button" className="btn btn-outline mt-4" onClick={loadItems}>Try again</button>
          </div>
        )}
        {state === "success" &&
          (visible.length === 0 ? (
            <div className="text-center text-slate-500 py-16">No equipment matches your search.</div>
          ) : (
            <>
              <p className="mb-4 text-sm text-slate-500">{visible.length} item{visible.length > 1 ? "s" : ""}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {visible.map((item) => <ProductCard key={item.key} item={item} />)}
              </div>
            </>
          ))}
      </div>
    </div>
  );
}
