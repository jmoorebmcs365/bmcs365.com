import Header from '../components/Header';
import Footer from '../components/Footer';
import MelioPayButton from '../components/MelioPayButton.jsx';

export default function Portal() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl px-6 section">
        <h1 className="text-3xl font-bold text-[var(--bm-navy)]">Client Portal</h1>
        <p className="mt-3 text-gray-700">Login to your CRM account to view invoices and project status.</p>

        <div className="mt-8 card">
          <h2 className="text-xl font-semibold mb-2">Quick Pay</h2>
          <p className="mb-4 text-gray-700">Pay an invoice securely with Melio.</p>
          <MelioPayButton amount={199.99} invoiceId="INV-DEMO-1001" />
          <p className="mt-3 text-sm text-gray-500">* Replace with live invoice data from your CRM.</p>
        </div>

        <div className="mt-10">
          <a className="btn btn-primary" href="https://your-crm-domain.example.com">Go to CRM Login</a>
        </div>
      </main>
      <Footer />
    </>
  )
}
