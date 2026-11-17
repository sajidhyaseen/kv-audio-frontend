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
        <div className="w-full backdrop-blur-xl bg-black/30 rounded-2xl flex justify-center items-center flex-col p-8 gap-6">
          <img src="/logo.png" alt="logo" className="w-[90px] h-[90px] object-cover rounded-full" />

          <input
            type="email"
            placeholder="Email"
            className="w-full h-[34px] bg-transparent border-b-2 border-white text-white text-lg outline-none placeholder:text-slate-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full h-[34px] bg-transparent border-b-2 border-white text-white text-lg outline-none placeholder:text-slate-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />

          <button className="w-full h-[46px] bg-accent text-white text-xl font-bold rounded-lg disabled:opacity-60" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <button type="button" onClick={() => googleLogin()} className="w-full h-[46px] bg-white text-slate-800 text-lg font-semibold rounded-lg">
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
