/**
 * Melio Pay Button (placeholder)
 * Usage:
 *  <MelioPayButton amount={199.99} invoiceId="INV-1234" />
 *
 * In production, replace checkout URL creation with Melio's official flow and keys.
 */
export default function MelioPayButton({ amount = 0, invoiceId }) {
  const handleClick = async () => {
    try {
      // Create or fetch a checkout link from your backend (placeholder)
      const res = await fetch('/.netlify/functions/melioCheckout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, invoiceId })
      });
      const { checkoutUrl } = await res.json();
      if (checkoutUrl) window.location.href = checkoutUrl;
      else alert('Melio checkout not configured yet.');
    } catch (e) {
alert('Payment init failed.');
    }
  };

  return (
    <button className="btn btn-primary" onClick={handleClick}>
      Pay with Melio
    </button>
  );
}
