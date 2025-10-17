
const { createClient } = require("@supabase/supabase-js");
async function updateInvoiceStatus(payload){
  try{
    const url=process.env.SUPABASE_URL; const key=process.env.SUPABASE_SERVICE_ROLE;
    if(!url||!key){ return {ok:false,skipped:true,reason:"No SUPABASE_URL or SUPABASE_SERVICE_ROLE"}; }
    const s=createClient(url,key);
    if(!payload.invoice_id){ return {ok:false,skipped:true,reason:"No invoice_id in payload"}; }
    const { data, error } = await s.from("invoices").update({ status: payload.status||"paid" }).eq("id", payload.invoice_id).select("*");
    if(error) return { ok:false, error: error.message };
    return { ok:true, updated: data };
  }catch(e){ return { ok:false, error: e.message }; }
}
exports.handler = async (event) => {
  
if (event.httpMethod === "OPTIONS") {
  return { statusCode: 200, headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, x-melio-signature"
  }};
}
if (event.httpMethod !== "POST") { return { statusCode: 405, body: "Method Not Allowed" }; }
  const secret=process.env.MELIO_WEBHOOK_SECRET||"stub-secret";
  const provided=event.headers["x-melio-signature"]||"";
  if(secret && provided && provided!==secret){ return { statusCode: 401, body: "Invalid signature" }; }
  try{
    const payload=JSON.parse(event.body||"{}");
    const supaRes = await updateInvoiceStatus(payload);
    return { statusCode: 200, body: JSON.stringify({ ok: true, received: true, supabase: supaRes }) };
  }catch(e){ return { statusCode: 400, body: JSON.stringify({ ok:false, error: e.message }) }; }
};
