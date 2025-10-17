// netlify/functions/melioCreateLink.js
// Creates a Melio payment link for an invoice and returns the URL.
exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }};
  }
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  try{
    const { invoiceId, amount } = JSON.parse(event.body || "{}");
    if(!invoiceId || !amount){ return { statusCode: 400, body: "Missing invoiceId or amount" }; }

    const MELIO_KEY = process.env.MELIO_API_KEY;
    const siteUrl = process.env.URL || "";
    const callbackUrl = `${siteUrl}/.netlify/functions/melioCallback`;

    // Use native fetch in Netlify functions (Node 18+)
    const payload = {
      amount,
      currency: "USD",
      description: `Invoice #${invoiceId}`,
      metadata: { invoiceId },
      callbackUrl
    };

    const res = await fetch("https://api.meliopayments.com/v1/paylinks", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${MELIO_KEY}` },
      body: JSON.stringify(payload)
    });
    const data = await res.json();

    if(!res.ok){
      return { statusCode: res.status, body: JSON.stringify({ ok:false, error: data }) };
    }

    return { statusCode: 200, headers: { "Access-Control-Allow-Origin": "*" }, body: JSON.stringify({ ok:true, link: data.payLinkUrl }) };
  }catch(e){
    return { statusCode: 400, headers: { "Access-Control-Allow-Origin": "*" }, body: JSON.stringify({ ok:false, error: e.message }) };
  }
};
