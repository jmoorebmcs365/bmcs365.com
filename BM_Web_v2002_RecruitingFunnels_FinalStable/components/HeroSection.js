import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative section bg-white">
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 items-center gap-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--bm-navy)] leading-tight">
            Where Precision Meets Performance — 365 Days a Year.
          </h1>
          <p className="mt-5 text-lg text-gray-700">
            Facility services, rehab &amp; restoration, and mobile mechanic solutions for mission-critical properties.
          </p>
          <div className="mt-8 flex gap-4">
            <Link href="/contact" className="btn btn-primary">Request a Quote</Link>
            <a href="/services/facility" className="btn border border-gray-300">Explore Services</a>
          </div>
        </div>
        <div className="card">
          <ul className="space-y-3 text-gray-800">
            <li>• Janitorial &amp; Day Porter</li>
            <li>• Floor Care &amp; Restoration</li>
            <li>• Post-Construction Cleaning</li>
            <li>• Rehab &amp; Turn Services</li>
            <li>• Mobile Mechanic Fleet Support</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
