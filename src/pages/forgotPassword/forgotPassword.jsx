import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api, { apiError } from "../../utils/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await api.post("/api/users/forgot-password", { email });
      setSent(true);
      toast.success(res.data.message);
    } catch (err) {
      toast.error(apiError(err, "Could not request a password reset"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="bg-picture w-full min-h-screen flex justify-center items-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-[400px] rounded-3xl border border-white/15 bg-slate-950/55 p-8 shadow-2xl backdrop-blur-xl">
        <div className="text-center">
          <img src="/logo.png" alt="logo" className="mx-auto h-[82px] w-[82px] rounded-full border-2 border-accent object-cover" />
          <h1 className="mt-4 text-2xl font-bold text-white">Forgot password?</h1>
          <p className="mt-2 text-sm text-slate-300">Enter your email and we will send a reset link.</p>
        </div>
        {sent ? (
          <p className="mt-6 rounded-xl bg-white/10 p-4 text-center text-sm text-slate-200">
            If an account exists for that email, a reset link has been sent.
          </p>
        ) : (
          <>
            <input type="email" placeholder="Email" className="mt-6 h-12 w-full rounded-xl border border-white/20 bg-white/10 px-4 text-white outline-none placeholder:text-slate-300 focus:border-accent focus:ring-4 focus:ring-accent/20" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button className="btn btn-accent mt-4 w-full !h-12" disabled={busy}>{busy ? "Sending..." : "Send reset link"}</button>
          </>
        )}
        <Link to="/login" className="mt-6 block text-center text-sm text-accent hover:underline">Back to login</Link>
      </form>
    </div>
  );
}
