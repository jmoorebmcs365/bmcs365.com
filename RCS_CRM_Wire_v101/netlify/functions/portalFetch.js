
const jwt = require("jsonwebtoken");
const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE);

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: {
      "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }};
  }
  const { token, id } = JSON.parse(event.body || "{}");
  try{
    const secret = process.env.PORTAL_SECRET_KEY;
    const dec = jwt.verify(token, secret, { ignoreExpiration:true });
    if(!dec || dec.invoiceId !== id) return { statusCode:401, body:"Invalid token" };
    const { data: inv, error: e1 } = await supabase.from("invoices").select("*").eq("id", id).single();
    if(e1 || !inv) return { statusCode:404, headers:{"Access-Control-Allow-Origin":"*"}, body: JSON.stringify({ ok:false, error:"Invoice not found" }) };
    if(inv.status === "paid" || inv.status === "void"){
      return { statusCode:403, headers:{"Access-Control-Allow-Origin":"*"}, body: JSON.stringify({ ok:false, error:"Invoice closed" }) };
    }
    const { data: items } = await supabase.from("invoice_items").select("*").eq("invoice_id", id);
    const melioLink = inv.melio_link || null;
    return { statusCode:200, headers:{"Access-Control-Allow-Origin":"*"}, body: JSON.stringify({ ok:true, invoice:inv, items:items||[], melioLink }) };
  }catch(e){
    return { statusCode:400, headers:{"Access-Control-Allow-Origin":"*"}, body: JSON.stringify({ ok:false, error: e.message }) };
  }
};
