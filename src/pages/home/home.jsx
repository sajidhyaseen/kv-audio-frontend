import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaCalendarCheck, FaHeadset, FaMusic, FaShieldAlt } from "react-icons/fa";
import api, { apiError } from "../../utils/api";
import { getUser } from "../../utils/auth";
import { stars } from "../../utils/format";
import ProductCard from "../../components/productCard";
import Spinner from "../../components/spinner";
import { siteConfig } from "../../config/site";

const FEATURES = [
  { icon: FaMusic, title: "Quality equipment", text: "Speakers, mixers, microphones and lighting that are ready for the stage." },
  { icon: FaCalendarCheck, title: "Flexible dates", text: "Pick your start and end date and see live availability before you book." },
  { icon: FaShieldAlt, title: "Simple booking", text: "Add gear to your cart, get an instant quote and send your request in minutes." },
  { icon: FaHeadset, title: "Friendly support", text: "Not sure what you need? Send us a message and we will help you choose." },
];

const STEPS = [
  { n: 1, title: "Choose your gear", text: "Browse the catalogue and add what you need to your cart." },
  { n: 2, title: "Pick your dates", text: "See the total price and availability for your rental period." },
  { n: 3, title: "Send your booking", text: "We review your request and confirm it by email." },
];

export default function Home() {
  const [featured, setFeatured] = useState(null);
  const [reviews, setReviews] = useState([]);
  const user = getUser();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    api.get("/api/products").then((res) => setFeatured(res.data.slice(0, 4))).catch(() => setFeatured([]));
    api.get("/api/reviews").then((res) => setReviews(res.data.slice(0, 6))).catch(() => {});
  }, []);

  async function submitReview(e) {
    e.preventDefault();
    setSending(true);
    try {
      const res = await api.post("/api/reviews", { rating, comment });
      toast.success(res.data.message);
      setComment("");
    } catch (err) {
      toast.error(apiError(err, "Could not submit your review"));
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(225,106,84,0.28),transparent_34%),linear-gradient(120deg,#0f172a_0%,#172033_55%,#26364f_100%)]" />
        <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full border-[36px] border-white/[0.03]" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 md:py-36 text-center md:text-left">
          <p className="inline-flex rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">{siteConfig.tagline}</p>
          <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight md:text-6xl">
            Sound and lighting that make your event unforgettable.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
            Rent professional audio gear for weddings, parties, concerts and conferences. Check availability and book online.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center md:justify-start">
            <Link to="/items" className="btn btn-accent !px-6 !py-3 text-lg">Browse equipment</Link>
            <Link to="/contact" className="btn !px-6 !py-3 text-lg border border-white/40 hover:bg-white/10">Talk to us</Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 mx-auto -mt-12 max-w-7xl px-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-lg shadow-slate-900/5">
              <div className="w-11 h-11 rounded-xl bg-accent/10 text-accent flex items-center justify-center text-xl"><Icon /></div>
              <h3 className="mt-3 font-semibold text-slate-800">{title}</h3>
              <p className="mt-1 text-sm text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured items */}
      <section className="mx-auto max-w-7xl px-4 mt-16">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-800">Popular equipment</h2>
            <p className="text-slate-500">A taste of what you can rent.</p>
          </div>
          <Link to="/items" className="text-accent font-semibold hover:underline">View all →</Link>
        </div>
        {featured === null ? (
          <Spinner className="h-[200px]" />
        ) : featured.length === 0 ? (
          <p className="text-slate-500">Equipment will appear here soon.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((item) => <ProductCard key={item.key} item={item} />)}
          </div>
        )}
      </section>

      {/* How it works */}
      <section className="mt-16 bg-white border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <h2 className="text-3xl font-bold tracking-tight text-slate-800 text-center">How it works</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="text-center px-4">
                <div className="mx-auto w-14 h-14 rounded-full bg-ink text-white text-2xl font-bold flex items-center justify-center">{s.n}</div>
                <h3 className="mt-4 text-lg font-semibold text-slate-800">{s.title}</h3>
                <p className="mt-1 text-slate-600">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="mx-auto max-w-7xl px-4 mt-16">
        <h2 className="text-3xl font-bold tracking-tight text-slate-800 text-center">What customers say</h2>
        {reviews.length === 0 ? (
          <p className="mt-4 text-center text-slate-500">No reviews yet. Be the first to share your experience!</p>
        ) : (
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <figure key={r.email} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <div className="flex items-center gap-3">
                  <img src={r.profilePicture} alt="" className="w-11 h-11 rounded-full object-cover" referrerPolicy="no-referrer" />
                  <div>
                    <figcaption className="font-semibold text-slate-800">{r.name}</figcaption>
                    <div className="text-amber-500 text-sm" aria-label={`${r.rating} out of 5`}>{stars(r.rating)}</div>
                  </div>
                </div>
                <blockquote className="mt-3 text-slate-600">{r.comment}</blockquote>
              </figure>
            ))}
          </div>
        )}

        <div className="mt-10 mx-auto max-w-xl bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-800">Leave a review</h3>
          {user ? (
            <form onSubmit={submitReview} className="mt-3 flex flex-col gap-3">
              <div className="flex gap-1 text-3xl" role="radiogroup" aria-label="Rating">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} type="button" onClick={() => setRating(n)} className={n <= rating ? "text-amber-500" : "text-slate-300"} aria-label={`${n} stars`}>★</button>
                ))}
              </div>
              <textarea className="input min-h-[96px]" placeholder="Tell us about your experience" value={comment} onChange={(e) => setComment(e.target.value)} maxLength={1000} required />
              <button className="btn btn-accent" disabled={sending}>{sending ? "Sending..." : "Submit review"}</button>
              <p className="text-xs text-slate-500">Reviews appear on the site after approval.</p>
            </form>
          ) : (
            <p className="mt-2 text-slate-600">
              <Link to="/login" className="text-accent font-semibold hover:underline">Log in</Link> to share your experience.
            </p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 mt-16">
        <div className="rounded-3xl bg-gradient-to-r from-accent to-orange-500 p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold tracking-tight">Planning an event?</h2>
          <p className="mt-2 text-white/90">Tell us what you need and we will help you pick the right setup.</p>
          <Link to="/contact" className="btn bg-white !text-accent mt-6 !px-6 !py-3 hover:bg-slate-100">Contact us</Link>
        </div>
      </section>
    </div>
  );
}
