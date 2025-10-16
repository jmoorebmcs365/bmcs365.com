import Header from '../components/Header';
import Footer from '../components/Footer';
import QuoteForm from '../components/QuoteForm';

export default function Contact() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl px-6 section">
        <h1 className="text-3xl font-bold text-[var(--bm-navy)]">Request a Quote</h1>
        <p className="mt-3 text-gray-700">Tell us about your facility and service needs.</p>
        <div className="mt-6">
          <QuoteForm />
        </div>
      </main>
      <Footer />
    </>
  )
}
