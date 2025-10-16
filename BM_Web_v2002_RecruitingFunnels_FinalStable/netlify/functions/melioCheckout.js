// Placeholder: create/fetch a Melio checkout URL
exports.handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') return { headers: { 'Content-Type': 'application/json' }, statusCode: 405, body: JSON.stringify('Method Not Allowed' )};
    const { amount, invoiceId } = JSON.parse(event.body || '{}');
    // TODO: Replace with Melio Checkout creation using MELIO_PUBLIC_API_KEY
    // For now return a dummy URL (replace in production)
    const checkoutUrl = `https://dashboard.meliopayments.com/checkout?amount=${encodeURIComponent(amount)}&ref=${encodeURIComponent(invoiceId || 'INV')}`;
    return { headers: { 'Content-Type': 'application/json' }, statusCode: 200, body: JSON.stringify({ checkoutUrl }) };
  } catch (e) {
return { headers: { 'Content-Type': 'application/json' }, statusCode: 500, body: JSON.stringify('Melio not configured' )};
  }
};
