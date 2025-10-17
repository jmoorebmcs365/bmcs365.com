exports.handler = async () => {
  return {
    statusCode: 200,
    headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, x-melio-signature"
 "Content-Type": "application/json", "Cache-Control": "no-store" },
    body: JSON.stringify({
      VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL || null,
      VITE_SUPABASE_ANON_KEY: process.env.VITE_SUPABASE_ANON_KEY || null
    })
  };
};