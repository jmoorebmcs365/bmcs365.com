import Header from '../components/Header';
import Footer from '../components/Footer';

export default function About() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-6 section">
        <h1 className="text-3xl font-bold text-[var(--bm-navy)]">About B&amp;M Commercial Services</h1>
        <p className="mt-4 text-gray-700">
          We deliver high-reliability facility services, rehab & restoration, and mobile mechanic solutions.
          Our teams operate with precision, safety, and speed — 365 days a year.
        </p>
      </main>
      <Footer />
    </>
  )
}
