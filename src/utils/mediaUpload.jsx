import { createClient } from "@supabase/supabase-js"

const anon_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlybWVwc2dveWR0c2thdGVydGt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1MzA2MTQsImV4cCI6MjA4NTEwNjYxNH0.hzu_--ajIlZFCWwSfbV-soDRP3wKb-97j61z1Mkyl1U"
const supabase_url = "https://irmepsgoydtskatertku.supabase.co"
const supabase = createClient(supabase_url, anon_key)

export default function mediaUpload(file) {

    return new Promise((resolve, reject) => {
        if(file == null){
            reject("No file selected")
        }

        const timestamp = new Date().getTime();
        const fileName = timestamp + file.name

        supabase.storage.from("images").upload(fileName, file, {
            cacheControl: '3600',
            upset: false,

        }).then(() => {
            const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
            resolve(publicUrl)
        }).catch(()=>{
            reject("Error uploading file")
        })
    });


}