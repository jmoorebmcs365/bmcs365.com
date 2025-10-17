// netlify/functions/melioCallback.js
// Receives Melio webhook, verifies signature, updates invoice status in Supabase.
const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE);

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, x-melio-signature"
    }};
  }
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const sig = event.headers["x-melio-signature"] || "";
  if (sig !== (process.env.MELIO_WEBHOOK_SECRET || "")) {
    return { statusCode: 401, body: "Invalid signature" };
  }

  try{
    const payload = JSON.parse(event.body || "{}");
    const invoiceId = (payload.metadata && payload.metadata.invoiceId) || payload.invoice_id;
    const status = payload.status || (payload.event === "payment.succeeded" ? "paid" : "sent");

    if(!invoiceId){
      return { statusCode: 400, body: "Missing invoiceId" };
    }

    const { data, error } = await supabase.from("invoices").update({ status }).eq("id", invoiceId).select("*");
    if(error) return { statusCode: 400, body: JSON.stringify({ ok:false, error: error.message }) };

    return { statusCode: 200, headers: { "Access-Control-Allow-Origin": "*" }, body: JSON.stringify({ ok:true, updated: data }) };
  }catch(e){
    return { statusCode: 400, headers: { "Access-Control-Allow-Origin": "*" }, body: JSON.stringify({ ok:false, error: e.message }) };
  }
};
