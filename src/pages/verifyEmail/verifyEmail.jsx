import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api, { apiError } from "../../utils/api";
import { getUser, setUser } from "../../utils/auth";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [busy, setBusy] = useState(false);
  const sentOnce = useRef(false);

  async function sendCode() {
    try {
      await api.get("/api/users/sendOTP");
      toast.success("Verification code sent to your email");
      setCooldown(30);
    } catch (err) {
      toast.error(apiError(err, "Could not send the code"));
    }
  }

  useEffect(() => {
    if (!getUser()) {
      navigate("/login");
      return;
    }
    if (sentOnce.current) return; // avoid a double send in React StrictMode
    sentOnce.current = true;
    sendCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  async function handleVerifyEmail(e) {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await api.post("/api/users/verifyEmail", { code: parseInt(otp, 10) });
      setUser(res.data.user);
      if (res.data.csrfToken) sessionStorage.setItem("csrfToken", res.data.csrfToken);
      toast.success("Email verified");
      navigate("/");
    } catch (err) {
      toast.error(apiError(err, "Invalid OTP"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-slate-50 px-4">
      <form onSubmit={handleVerifyEmail} className="w-full max-w-[400px] bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-800">Verify your email</h1>
        <p className="text-slate-500 text-center text-sm">Enter the 6-digit code we sent to your email. It expires in 10 minutes.</p>
        <input
          inputMode="numeric"
          maxLength={6}
          placeholder="123456"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          className="input text-center text-2xl tracking-[0.4em]"
          required
        />
        <button className="btn btn-accent w-full" disabled={busy || otp.length < 6}>{busy ? "Verifying..." : "Verify"}</button>
        <button type="button" className="text-sm text-accent disabled:text-slate-400" disabled={cooldown > 0} onClick={sendCode}>
          {cooldown > 0 ? `Resend code in ${cooldown}s` : "Resend code"}
        </button>
      </form>
    </div>
  );
}
