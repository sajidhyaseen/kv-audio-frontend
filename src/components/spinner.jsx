export default function Spinner({ className = "h-[40vh]" }) {
  return (
    <div className={`w-full flex justify-center items-center ${className}`}>
      <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-accent animate-spin" />
    </div>
  );
}
