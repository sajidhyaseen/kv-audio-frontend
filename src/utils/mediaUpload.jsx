import { createClient } from "@supabase/supabase-js";

// Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel / .env for your project.
// (The anon key is public by design; storage rules are enforced by the policies in Supabase.)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://irmepsgoydtskatertku.supabase.co";
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlybWVwc2dveWR0c2thdGVydGt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1MzA2MTQsImV4cCI6MjA4NTEwNjYxNH0.hzu_--ajIlZFCWwSfbV-soDRP3wKb-97j61z1Mkyl1U";
const BUCKET = "images";
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

const supabase = createClient(supabaseUrl, anonKey);

/** Uploads one image to Supabase Storage and resolves with its public URL. Rejects with an Error. */
export default async function mediaUpload(file) {
  if (!file) throw new Error("No file selected");
  if (!file.type.startsWith("image/")) throw new Error(`${file.name} is not an image`);
  if (file.size > MAX_SIZE) throw new Error(`${file.name} is larger than 5 MB`);

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeName}`;

  const { error } = await supabase.storage.from(BUCKET).upload(fileName, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) {
    console.error("Supabase upload error:", error);
    throw new Error(error.message || "Error uploading file");
  }
  return supabase.storage.from(BUCKET).getPublicUrl(fileName).data.publicUrl;
}
