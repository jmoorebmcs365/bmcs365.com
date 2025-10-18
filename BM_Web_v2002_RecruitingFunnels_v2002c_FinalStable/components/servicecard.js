import Link from 'next/link';

export default function ServiceCard({ title, href, children }) {
  return (
    <div className="card hover:shadow-md transition">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-700 mb-4">{children}</p>
      <Link className="underline text-[var(--bm-navy)]" href={href}>Learn more →</Link>
    </div>
  )
}
