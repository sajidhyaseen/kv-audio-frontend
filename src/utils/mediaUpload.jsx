import { createClient } from "@supabase/supabase-js";

// Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel / .env for your project.
// (The anon key is public by design; storage rules are enforced by the policies in Supabase.)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !anonKey) {
  throw new Error("VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are required.");
}
const BUCKET = "images";
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

const supabase = createClient(supabaseUrl, anonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});

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
    contentType: file.type,
  });
  if (error) {
    const details = {
      name: error.name,
      message: error.message,
      status: error.status,
      statusCode: error.statusCode,
    };
    console.error("Supabase upload error:", details);

    if (error.statusCode === "404" || error.statusCode === 404 || error.message?.includes("Bucket not found")) {
      throw new Error('Supabase storage bucket "images" does not exist. Create it in Supabase Storage and enable public access.');
    }
    if (error.statusCode === "403" || error.statusCode === 403 || error.message?.toLowerCase().includes("not authorized")) {
      throw new Error('Supabase rejected the upload. Add an upload policy for the "images" bucket.');
    }
    if (error.message?.toLowerCase().includes("signature verification failed")) {
      throw new Error("The Supabase browser key is invalid or outdated. Update VITE_SUPABASE_ANON_KEY with the current publishable or anon key.");
    }
    throw new Error(error.message || "Error uploading file");
  }
  return supabase.storage.from(BUCKET).getPublicUrl(fileName).data.publicUrl;
}
