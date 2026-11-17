import "./login.css";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import api, { apiError } from "../../utils/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function finishLogin(data) {
    localStorage.setItem("token", data.token);
    toast.success("Successfully logged in");
    const user = data.user;
    if (user.emailVerified === false) navigate("/verify-email");
    else if (user.role === "admin") navigate("/admin");
    else navigate("/");
  }

  const googleLogin = useGoogleLogin({
    onSuccess: (res) => {
      api
        .post("/api/users/google", { accessToken: res.access_token })
        .then((r) => finishLogin(r.data))
        .catch((err) => toast.error(apiError(err, "Google login failed")));
    },
    onError: () => toast.error("Google login failed"),
  });

  async function handleOnSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/api/users/login", { email, password });
      finishLogin(res.data);
    } catch (err) {
      toast.error(apiError(err, "Login failed"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-picture w-full h-screen flex justify-center items-center px-4">
      <form onSubmit={handleOnSubmit} autoComplete="off" className="w-full max-w-[400px]">
        <div className="w-full rounded-3xl border border-white/15 bg-slate-950/55 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl flex justify-center items-center flex-col gap-6">
          <div className="text-center">
            <img src="/logo.png" alt="logo" className="mx-auto h-[82px] w-[82px] rounded-full border-2 border-accent object-cover" />
            <p className="mt-4 text-sm font-medium uppercase tracking-[0.2em] text-slate-300">Welcome back</p>
          </div>

          <input
            type="email"
            placeholder="Email"
            className="h-12 w-full rounded-xl border border-white/20 bg-white/10 px-4 text-white outline-none transition placeholder:text-slate-300 focus:border-accent focus:ring-4 focus:ring-accent/20"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="h-12 w-full rounded-xl border border-white/20 bg-white/10 px-4 text-white outline-none transition placeholder:text-slate-300 focus:border-accent focus:ring-4 focus:ring-accent/20"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />

          <button className="btn btn-accent w-full !h-12 text-base" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <button type="button" onClick={() => googleLogin()} className="w-full !h-12 rounded-xl bg-white text-base font-semibold text-slate-800 transition hover:bg-slate-100">
            Continue with Google
          </button>

          <p className="text-sm text-slate-200">
            New here? <Link to="/register" className="text-accent font-semibold hover:underline">Create an account</Link>
            {" · "}
            <Link to="/" className="hover:underline">Home</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
