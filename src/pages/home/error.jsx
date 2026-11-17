import { Link } from "react-router-dom";

export default function ErrorNotFound() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <p className="text-7xl font-extrabold text-accent">404</p>
      <h1 className="mt-2 text-2xl font-bold text-slate-800">Page not found</h1>
      <p className="mt-1 text-slate-500">The page you are looking for does not exist or was moved.</p>
      <Link to="/" className="btn btn-accent mt-6">Back to home</Link>
    </div>
  );
}
