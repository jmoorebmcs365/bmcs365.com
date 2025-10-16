import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Mechanic() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-6 section">
        <h1 className="text-3xl font-bold text-[var(--bm-navy)]">Mobile Mechanic</h1>
        <ul className="mt-4 list-disc pl-5 text-gray-700 space-y-2">
          <li>On-site Diagnostics & Repair</li>
          <li>Fleet Maintenance Schedules</li>
          <li>Emergency Roadside Support</li>
        </ul>
      </main>
      <Footer />
    </>
  )
}
