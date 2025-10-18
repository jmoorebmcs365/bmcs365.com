import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/assets/logo.png" alt="B&M Commercial Services" className="h-9 w-auto" onError={(e)=>{e.currentTarget.style.display='none'}}/>
          <span className="text-lg font-semibold tracking-wide">B&amp;M Commercial Services</span>
        </div>
        <nav className="flex items-center gap-6">
          <Link className="nav-link" href="/">Home</Link>
          <Link className="nav-link" href="/about">About</Link>
          <Link className="nav-link" href="/services/facility">Services</Link>
          <Link className="nav-link" href="/projects">Projects</Link>
          <Link className="nav-link" href="/contact">Contact</Link>
          <Link className="btn btn-primary" href="/portal">Client Portal</Link>
        </nav>
      </div>
    </header>
  )
}
