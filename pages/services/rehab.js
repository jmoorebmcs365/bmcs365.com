import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Rehab() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-6 section">
        <h1 className="text-3xl font-bold text-[var(--bm-navy)]">Rehab & Restoration</h1>
        <ul className="mt-4 list-disc pl-5 text-gray-700 space-y-2">
          <li>Turns & Punch Lists</li>
          <li>Water & Fire Restoration (non-licensed demo/clean scope)</li>
          <li>Fixture & Finish Replacements</li>
        </ul>
      </main>
      <Footer />
    </>
  )
}
