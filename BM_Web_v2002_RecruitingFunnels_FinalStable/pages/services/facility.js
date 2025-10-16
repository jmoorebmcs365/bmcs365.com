import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Facility() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-6 section">
        <h1 className="text-3xl font-bold text-[var(--bm-navy)]">Facility Services</h1>
        <ul className="mt-4 list-disc pl-5 text-gray-700 space-y-2">
          <li>Janitorial & Day Porter</li>
          <li>Floor Care (VCT, LVT, Tile/Grout, Carpet)</li>
          <li>Disinfection & High-Touch Protocols</li>
          <li>Post-Construction Cleaning</li>
        </ul>
      </main>
      <Footer />
    </>
  )
}
