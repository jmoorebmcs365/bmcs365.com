// Placeholder webhook to receive Melio payment status updates
exports.handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') return { headers: { 'Content-Type': 'application/json' }, statusCode: 405, body: JSON.stringify('Method Not Allowed' )};
    const secret = process.env.MELIO_WEBHOOK_SECRET;
    // In production verify signature from headers against secret

    const payload = JSON.parse(event.body || '{}');
    // TODO: Upsert payment status into Supabase based on payload.invoiceId
return { headers: { 'Content-Type': 'application/json' }, statusCode: 200, body: JSON.stringify({ received: true }) };
  } catch (e) {
return { headers: { 'Content-Type': 'application/json' }, statusCode: 500, body: JSON.stringify('Webhook error' )};
  }
};
