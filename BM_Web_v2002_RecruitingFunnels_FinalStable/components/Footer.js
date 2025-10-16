export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-6 py-8 text-sm text-gray-600 flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} B&amp;M Commercial Services — All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a className="underline" href="mailto:info@bmcs365.com">info@bmcs365.com</a>
          <a className="underline" href="/privacy">Privacy</a>
          <a className="underline" href="/terms">Terms</a>
        </div>
      </div>
    </footer>
  )
}
