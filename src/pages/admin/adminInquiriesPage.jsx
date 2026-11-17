import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api, { apiError } from "../../utils/api";
import { fmtDateTime } from "../../utils/format";
import Spinner from "../../components/spinner";

function InquiryCard({ inquiry, onChanged }) {
  const [reply, setReply] = useState(inquiry.response || "");
  const [saving, setSaving] = useState(false);

  async function save(extra = {}) {
    setSaving(true);
    try {
      await api.put(`/api/inquiries/${inquiry.id}`, { response: reply, isResolved: true, ...extra });
      toast.success("Saved");
      onChanged();
    } catch (err) {
      toast.error(apiError(err));
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!window.confirm("Delete this inquiry?")) return;
    try {
      await api.delete(`/api/inquiries/${inquiry.id}`);
      onChanged();
    } catch (err) {
      toast.error(apiError(err));
    }
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-semibold text-slate-800">
          #{inquiry.id} {inquiry.name && <span>· {inquiry.name}</span>}
          <span className="font-normal text-slate-500"> · {inquiry.email} · {inquiry.phone}</span>
        </p>
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${inquiry.isResolved ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-800"}`}>
          {inquiry.isResolved ? "Resolved" : "Open"}
        </span>
      </div>
      <p className="text-xs text-slate-500">{fmtDateTime(inquiry.date)}</p>
      <p className="mt-2 text-slate-700 whitespace-pre-line break-words">{inquiry.message}</p>

      <textarea className="input mt-3 min-h-[70px]" placeholder="Write a reply (the customer is notified by email)" value={reply} onChange={(e) => setReply(e.target.value)} />
      <div className="mt-2 flex flex-wrap gap-2">
        <button className="btn btn-accent !py-1 text-sm" disabled={saving || !reply.trim()} onClick={() => save()}>Send reply & resolve</button>
        {!inquiry.isResolved && <button className="btn btn-outline !py-1 text-sm" disabled={saving} onClick={() => save({ response: inquiry.response || "" })}>Mark resolved</button>}
        <button className="btn bg-red-600 text-white !py-1 text-sm" onClick={remove}>Delete</button>
      </div>
    </div>
  );
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState(null);

  const load = () => api.get("/api/inquiries").then((res) => setInquiries(res.data)).catch((err) => { toast.error(apiError(err)); setInquiries([]); });
  useEffect(() => { load(); }, []);

  if (!inquiries) return <Spinner />;

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold text-slate-800">Inquiries</h1>
      {inquiries.length === 0 && <p className="mt-4 text-slate-500">No inquiries yet.</p>}
      <div className="mt-4 flex flex-col gap-3">
        {inquiries.map((i) => <InquiryCard key={i.id} inquiry={i} onChanged={load} />)}
      </div>
    </div>
  );
}
