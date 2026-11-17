import { useState } from "react";
import toast from "react-hot-toast";
import api, { apiError } from "../../utils/api";
import { getUser } from "../../utils/auth";
import { siteConfig } from "../../config/site";

export default function Contact() {
  const user = getUser();
  const [name, setName] = useState(user ? `${user.firstName} ${user.lastName}` : "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone && user.phone !== "Not given" ? user.phone : "");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const { contact } = siteConfig;
  const details = [
    ["Email", contact.email],
    ["Phone", contact.phone],
    ["Address", contact.address],
    ["Hours", contact.hours],
  ].filter(([, v]) => v);

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    try {
      await api.post("/api/inquiries", { name, email, phone, message });
      setSent(true);
      setMessage("");
      toast.success("Message sent. We will get back to you soon.");
    } catch (err) {
      toast.error(apiError(err, "Could not send your message"));
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-800">Contact us</h1>
      <p className="text-slate-500">Questions about equipment or an event? Send us a message.</p>

      <div className="mt-8 grid gap-8 md:grid-cols-5">
        <form onSubmit={handleSubmit} className="md:col-span-3 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col gap-4">
          {sent && <div className="rounded-lg bg-green-50 text-green-700 px-4 py-3 text-sm">Thanks! Your message was sent.</div>}
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
              Name
              <input className="input" value={name} onChange={(e) => setName(e.target.value)} required={!user} readOnly={!!user} />
            </label>
            <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
              Email
              <input type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} required={!user} readOnly={!!user} />
            </label>
          </div>
          <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            Phone (optional)
            <input type="tel" className="input" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            Message
            <textarea className="input min-h-[140px]" value={message} onChange={(e) => setMessage(e.target.value)} maxLength={2000} required />
          </label>
          <button className="btn btn-accent" disabled={sending}>{sending ? "Sending..." : "Send message"}</button>
        </form>

        <aside className="md:col-span-2 bg-ink text-slate-200 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white">Get in touch</h2>
          {details.length === 0 ? (
            <p className="mt-3 text-sm">Use the form and we will reply by email.</p>
          ) : (
            <dl className="mt-4 space-y-4 text-sm">
              {details.map(([label, value]) => (
                <div key={label}>
                  <dt className="text-accent font-medium">{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          )}
        </aside>
      </div>
    </div>
  );
}
