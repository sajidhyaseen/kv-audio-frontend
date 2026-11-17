import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api, { apiError } from "../../utils/api";
import { fmtDateTime, stars } from "../../utils/format";
import Spinner from "../../components/spinner";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState(null);

  const load = () => api.get("/api/reviews").then((res) => setReviews(res.data)).catch((err) => { toast.error(apiError(err)); setReviews([]); });
  useEffect(() => { load(); }, []);

  async function act(fn, success) {
    try {
      await fn();
      toast.success(success);
      load();
    } catch (err) {
      toast.error(apiError(err));
    }
  }

  if (!reviews) return <Spinner />;

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold text-slate-800">Reviews</h1>
      {reviews.length === 0 && <p className="mt-4 text-slate-500">No reviews yet.</p>}
      <div className="mt-4 flex flex-col gap-3">
        {reviews.map((r) => (
          <div key={r.email} className="bg-white rounded-xl border border-slate-200 p-4 flex gap-4">
            <img src={r.profilePicture} alt="" className="w-12 h-12 rounded-full object-cover" referrerPolicy="no-referrer" />
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-slate-800">{r.name}</span>
                <span className="text-amber-500">{stars(r.rating)}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${r.isApproved ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-800"}`}>
                  {r.isApproved ? "Approved" : "Pending"}
                </span>
              </div>
              <p className="text-xs text-slate-500">{r.email} · {fmtDateTime(r.date)}</p>
              <p className="mt-2 text-slate-700 break-words">{r.comment}</p>
              <div className="mt-3 flex gap-2">
                {!r.isApproved && (
                  <button className="btn bg-green-600 text-white !py-1 text-sm" onClick={() => act(() => api.put(`/api/reviews/approve/${encodeURIComponent(r.email)}`), "Review approved")}>Approve</button>
                )}
                <button className="btn bg-red-600 text-white !py-1 text-sm" onClick={() => window.confirm("Delete this review?") && act(() => api.delete(`/api/reviews/${encodeURIComponent(r.email)}`), "Review deleted")}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
