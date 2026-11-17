const STYLES = {
  Pending: "bg-amber-100 text-amber-800",
  Approved: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-700",
  Cancelled: "bg-slate-200 text-slate-600",
};

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${STYLES[status] || "bg-slate-100 text-slate-600"}`}>
      {status}
    </span>
  );
}
