import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api, { apiError } from "../../utils/api";
import mediaUpload from "../../utils/mediaUpload";

export default function AddItemPage() {
  const [form, setForm] = useState({ key: "", name: "", price: "", category: "audio", dimensions: "", description: "", stock: 1 });
  const [files, setFiles] = useState([]);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  async function handleAddItem(e) {
    e.preventDefault();
    if (files.length === 0) {
      toast.error("Please choose at least one image");
      return;
    }
    setSaving(true);
    try {
      const imageUrls = await Promise.all(files.map((f) => mediaUpload(f)));
      const res = await api.post("/api/products", {
        ...form,
        key: form.key.trim(),
        price: Number(form.price),
        stock: Number(form.stock),
        image: imageUrls,
      });
      toast.success(res.data.message);
      navigate("/admin/items");
    } catch (err) {
      toast.error(err?.response ? apiError(err) : err.message || "Failed to add product");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="w-full p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Add item</h1>
      <form onSubmit={handleAddItem} className="w-full max-w-lg bg-white border border-slate-200 p-6 flex flex-col gap-3 rounded-2xl shadow-sm">
        <label className="text-sm font-medium text-slate-700">Key (unique, e.g. speaker-01)
          <input className="input mt-1" value={form.key} onChange={set("key")} required />
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
        <label className="text-sm font-medium text-slate-700">Images (max 5 MB each)
          <input type="file" accept="image/*" multiple className="input mt-1" onChange={(e) => setFiles([...e.target.files])} />
        </label>
        {files.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {files.map((f) => <img key={f.name + f.size} src={URL.createObjectURL(f)} alt="" className="w-16 h-16 rounded-lg object-cover" />)}
          </div>
        )}
        <div className="flex gap-3 mt-2">
          <button className="btn btn-accent flex-1" disabled={saving}>{saving ? "Saving..." : "Add item"}</button>
          <button type="button" className="btn btn-outline flex-1" onClick={() => navigate("/admin/items")}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
