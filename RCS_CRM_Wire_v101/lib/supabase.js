// lib/supabase.js — resilient env loader
export async function getSupabase(){
  function hasGlobals(){
    return (window.env && window.env.VITE_SUPABASE_URL && window.env.VITE_SUPABASE_ANON_KEY)
        || (window.VITE_SUPABASE_URL && window.VITE_SUPABASE_ANON_KEY);
  }
  async function loadEnv(){
    try{
      const res = await fetch("/.netlify/functions/env", { cache: "no-store" });
      const js = await res.json();
      window.VITE_SUPABASE_URL = js.VITE_SUPABASE_URL;
      window.VITE_SUPABASE_ANON_KEY = js.VITE_SUPABASE_ANON_KEY;
    }catch(e){ console.warn("Env fetch failed", e); }
  }
  if(!hasGlobals()){ await loadEnv(); }
  const url = (window.env && window.env.VITE_SUPABASE_URL) || window.VITE_SUPABASE_URL;
  const key = (window.env && window.env.VITE_SUPABASE_ANON_KEY) || window.VITE_SUPABASE_ANON_KEY;
  if (!url || !key || !window.supabase){
    console.warn("Supabase not configured or CDN not loaded.");
    return null;
  }
  return window.supabase.createClient(url, key);
}