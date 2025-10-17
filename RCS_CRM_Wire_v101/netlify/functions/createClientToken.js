
const jwt = require("jsonwebtoken");
exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: {
      "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }};
  }
  const { invoiceId, clientEmail } = JSON.parse(event.body || "{}");
  const secret = process.env.PORTAL_SECRET_KEY;
  const base = process.env.PORTAL_BASE_URL || "/portal.html";
  if (!secret || !invoiceId) return { statusCode: 400, body: "Missing invoiceId or secret" };
  const token = jwt.sign({ invoiceId, clientEmail }, secret, { noTimestamp: true });
  return { statusCode: 200, headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ url: `${base}?id=${invoiceId}&token=${token}` }) };
};
