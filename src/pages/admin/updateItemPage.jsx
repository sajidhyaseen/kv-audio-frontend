import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import api, { apiError } from "../../utils/api";
import mediaUpload from "../../utils/mediaUpload";

export default function UpdateItemPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;

  const [form, setForm] = useState({
    name: product?.name ?? "",
    price: product?.price ?? "",
    category: product?.category ?? "audio",
    dimensions: product?.dimensions ?? "",
    description: product?.description ?? "",
    stock: product?.stock ?? 1,
    availability: product?.availability ?? true,
  });
  const [files, setFiles] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // opened directly (e.g. page refresh) without an item to edit
    if (!product) navigate("/admin/items", { replace: true });
  }, [product, navigate]);

  if (!product) return null;

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  async function handleUpdateItem(e) {
    e.preventDefault();
    setSaving(true);
    try {
      let image = product.image;
      if (files.length > 0) image = await Promise.all(files.map((f) => mediaUpload(f)));

      const res = await api.put(`/api/products/${product.key}`, {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        image,
      });
      toast.success(res.data.message);
      navigate("/admin/items");
    } catch (err) {
      toast.error(err?.response ? apiError(err) : err.message || "Failed to update product");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="w-full p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Update item</h1>
      <form onSubmit={handleUpdateItem} className="w-full max-w-lg bg-white border border-slate-200 p-6 flex flex-col gap-3 rounded-2xl shadow-sm">
        <label className="text-sm font-medium text-slate-700">Key
          <input className="input mt-1 bg-slate-100" value={product.key} disabled />
        </label>
        <label className="text-sm font-medium text-slate-700">Name
          <input className="input mt-1" value={form.name} onChange={set("name")} required />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-sm font-medium text-slate-700">Price per day (Rs.)
            <input type="number" min="0" className="input mt-1" value={form.price} onChange={set("price")} required />
          </label>
          <label className="text-sm font-medium text-slate-700">Units owned (stock)
            <input type="number" min="1" className="input mt-1" value={form.stock} onChange={set("stock")} required />
          </label>
        </div>
        <label className="text-sm font-medium text-slate-700">Category
          <input list="categories" className="input mt-1" value={form.category} onChange={set("category")} required />
          <datalist id="categories"><option value="audio" /><option value="lights" /></datalist>
        </label>
        <label className="text-sm font-medium text-slate-700">Dimensions
          <input className="input mt-1" value={form.dimensions} onChange={set("dimensions")} required />
        </label>
        <label className="text-sm font-medium text-slate-700">Description
          <textarea className="input mt-1 min-h-[100px]" value={form.description} onChange={set("description")} required />
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <input type="checkbox" checked={form.availability} onChange={(e) => setForm((f) => ({ ...f, availability: e.target.checked }))} />
          Available for rent
        </label>

        <div>
          <p className="text-sm font-medium text-slate-700">Current images</p>
          <div className="mt-1 flex gap-2 flex-wrap">
            {product.image.map((src) => <img key={src} src={src} alt="" className="w-16 h-16 rounded-lg object-cover" />)}
          </div>
        </div>
        <label className="text-sm font-medium text-slate-700">Replace images (optional, max 5 MB each)
          <input type="file" accept="image/*" multiple className="input mt-1" onChange={(e) => setFiles([...e.target.files])} />
        </label>

        <div className="flex gap-3 mt-2">
          <button className="btn btn-accent flex-1" disabled={saving}>{saving ? "Saving..." : "Update"}</button>
          <button type="button" className="btn btn-outline flex-1" onClick={() => navigate("/admin/items")}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
