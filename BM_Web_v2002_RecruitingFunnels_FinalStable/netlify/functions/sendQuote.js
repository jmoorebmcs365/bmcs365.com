const sgMail = require('@sendgrid/mail');

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return { headers: { 'Content-Type': 'application/json' }, statusCode: 405, body: JSON.stringify('Method Not Allowed' )};
    }
    const data = JSON.parse(event.body || '{}');
    const { name, email, phone, service, message } = data;

    const apiKey = process.env.SENDGRID_API_KEY;
    const to = process.env.SENDGRID_TO || 'info@bmcs365.com';
    const from = process.env.SENDGRID_FROM || 'no-reply@bmcs365.com';
    if (!apiKey) {
      return { headers: { 'Content-Type': 'application/json' }, statusCode: 500, body: JSON.stringify('Missing SENDGRID_API_KEY' )};
    }
    sgMail.setApiKey(apiKey);

    const html = `
      <h2>New Quote Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Message:</strong> ${message || ''}</p>
    `;

    await sgMail.send({
      to, from,
      subject: `New Quote Request — ${service}`,
      html
    });

    return { headers: { 'Content-Type': 'application/json' }, statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
return { headers: { 'Content-Type': 'application/json' }, statusCode: 500, body: JSON.stringify('Error sending email' )};
  }
};
