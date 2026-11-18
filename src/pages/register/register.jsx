import { useState } from "react";
import "./register.css";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import api, { apiError } from "../../utils/api";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleOnSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/api/users/", {
        email: email,
        firstName : firstName,
        lastName : lastName,
        password: password,
        address: address,
        phone: phone
      });
      toast.success("Registration successful!");
      navigate("/login");
    } catch (err) {
      toast.error(apiError(err, "Registration failed"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-shell">
      <main className="register-card" aria-labelledby="register-title">
        <header className="register-heading">
          <img src="/logo.png" alt="KV Audio" className="register-logo" />
          <div>
            <p>Create your account</p>
            <h1 id="register-title">Join KV Audio</h1>
          </div>
        </header>

        <form onSubmit={handleOnSubmit} className="register-form" autoComplete="on">
          <div className="register-grid">
            <label>
              <span>First name</span>
              <input type="text" className="input-field" value={firstName} onChange={(e) => setFirstName(e.target.value)} autoComplete="given-name" required />
            </label>
            <label>
              <span>Last name</span>
              <input type="text" className="input-field" value={lastName} onChange={(e) => setLastName(e.target.value)} autoComplete="family-name" required />
            </label>
            <label className="register-span-full">
              <span>Email address</span>
              <input type="email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
            </label>
            <label className="register-span-full">
              <span>Password</span>
              <input type="password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" minLength={6} required />
            </label>
            <label>
              <span>Address</span>
              <input type="text" className="input-field" value={address} onChange={(e) => setAddress(e.target.value)} autoComplete="street-address" />
            </label>
            <label>
              <span>Phone</span>
              <input type="tel" className="input-field" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
            </label>
          </div>

          <button className="submit-button" disabled={loading} aria-busy={loading}>
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="register-footer">
          Already have an account? <Link to="/login">Sign in</Link>
          <span aria-hidden="true"> · </span>
          <Link to="/">Home</Link>
        </p>
      </main>
    </div>
  );
}
