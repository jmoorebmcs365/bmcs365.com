exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  try {
    const { to, subject, text, html } = JSON.parse(event.body || "{}");
    // Placeholder: simulate SendGrid send
    // In production, set SENDGRID_API_KEY and uncomment the code below.
    // const sgMail = require('@sendgrid/mail');
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // await sgMail.send({ to, from: process.env.SENDGRID_FROM, subject, text, html });
    console.log("SendGrid stub called", { to, subject });
    return { statusCode: 200, body: JSON.stringify({ ok: true, stub: true }) };
  } catch (e) {
    console.error(e);
    return { statusCode: 400, body: JSON.stringify({ ok: false, error: e.message }) };
  }
};
