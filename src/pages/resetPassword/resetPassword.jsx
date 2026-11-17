import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import api, { apiError } from "../../utils/api";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [complete, setComplete] = useState(false);
  const navigate = useNavigate();
  const token = params.get("token") || "";

  async function handleSubmit(e) {
    e.preventDefault();
    if (password.length < 6) return toast.error("Password must be at least 6 characters");
    if (password !== confirmPassword) return toast.error("Passwords do not match");
    setBusy(true);
    try {
      const res = await api.post("/api/users/reset-password", { token, password });
      toast.success(res.data.message);
      setComplete(true);
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      toast.error(apiError(err, "Could not reset your password"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="bg-picture w-full min-h-screen flex justify-center items-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-[400px] rounded-3xl border border-white/15 bg-slate-950/55 p-8 shadow-2xl backdrop-blur-xl">
        <div className="text-center">
          <img src="/logo.png" alt="logo" className="mx-auto h-[82px] w-[82px] rounded-full border-2 border-accent object-cover" />
          <h1 className="mt-4 text-2xl font-bold text-white">Set a new password</h1>
        </div>
        {!token ? (
          <p className="mt-6 text-center text-sm text-slate-200">This reset link is invalid or incomplete.</p>
        ) : complete ? (
          <p className="mt-6 text-center text-sm text-slate-200">Password updated. Redirecting to login...</p>
        ) : (
          <>
            <input type="password" placeholder="New password" minLength={6} className="mt-6 h-12 w-full rounded-xl border border-white/20 bg-white/10 px-4 text-white outline-none placeholder:text-slate-300 focus:border-accent focus:ring-4 focus:ring-accent/20" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <input type="password" placeholder="Confirm password" minLength={6} className="mt-3 h-12 w-full rounded-xl border border-white/20 bg-white/10 px-4 text-white outline-none placeholder:text-slate-300 focus:border-accent focus:ring-4 focus:ring-accent/20" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            <button className="btn btn-accent mt-4 w-full !h-12" disabled={busy}>{busy ? "Updating..." : "Update password"}</button>
          </>
        )}
        <Link to="/login" className="mt-6 block text-center text-sm text-accent hover:underline">Back to login</Link>
      </form>
    </div>
  );
}
