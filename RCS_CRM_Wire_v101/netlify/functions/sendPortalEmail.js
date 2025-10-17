
exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: {
      "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }};
  }
  const { to, portalUrl } = JSON.parse(event.body || "{}");
  const from = process.env.SENDGRID_FROM || "no-reply@bmcs365.com";
  const key = process.env.SENDGRID_API_KEY;
  const subject = "Your Invoice from B&M Commercial Services";
  const html = `<div style="font-family:system-ui,Segoe UI,Roboto,Arial;">
    <h2 style="color:#0A2342">B&M Commercial Services</h2>
    <p>Please view, pay, or download your invoice securely at the link below:</p>
    <p><a href="${portalUrl}" style="background:#0A2342;color:#fff;padding:10px 14px;border-radius:10px;text-decoration:none;">Open Client Portal</a></p>
    <p style="color:#6b7280">If you did not request this, ignore this email.</p>
  </div>`;
  if(key){
    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(key);
    await sgMail.send({ to, from, subject, html });
    return { statusCode:200, headers:{"Access-Control-Allow-Origin":"*"}, body: JSON.stringify({ ok:true, provider:"sendgrid" }) };
  }else{
    console.log("sendPortalEmail stub:", { to, portalUrl });
    return { statusCode:200, headers:{"Access-Control-Allow-Origin":"*"}, body: JSON.stringify({ ok:true, stub:true }) };
  }
};
