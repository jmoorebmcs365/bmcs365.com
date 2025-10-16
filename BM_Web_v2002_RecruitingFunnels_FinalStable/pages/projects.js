import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Projects() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-6 section">
        <h1 className="text-3xl font-bold text-[var(--bm-navy)]">Recent Projects</h1>
        <p className="mt-4 text-gray-700">Add before/after galleries and client testimonials here.</p>
      </main>
      <Footer />
    </>
  )
}
