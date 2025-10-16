import Head from 'next/head'
import Link from 'next/link'
import '../styles/recruit.css'

export default function FacilityServices() {
  return (<>
    <Head>
      <title>Facility Services Contractors – B&M Commercial Services</title>
      <meta name="description" content="Facility Services Contractors jobs in Hillsborough County" />
    </Head>
    <header className="hero">
      <div className="kicker">Now Hiring – Hillsborough County</div>
      <h1>Facility Services Contractors</h1>
      <p>Join a vetted network serving Hillsborough County. Competitive pay, steady work, fast pay terms.</p>
      <div className="cta">
        <a className="button" href="#apply"><button>Start Application</button></a>
        <a className="button" href="tel:17276273669"><button>Call 727‑627‑3669</button></a>
      </div>
    </header>
    <main>
      <section className="section card">
        <h2>What You Get</h2>
        <ul>
          <li>Regular maintenance routes and work orders</li><li>Local jobs across Tampa, Brandon, Riverview, Plant City</li><li>Net 7–14 day pay on approved work</li>
        </ul>
      </section>
      <section id="apply" className="section card">
        <h2>Apply in 60 seconds</h2>
        
<form name="recruit-facility-services" method="POST" data-netlify="true" netlify-honeypot="bot-field" className="grid" action="/thanks">
  <input type="hidden" name="form-name" value="recruit-facility-services" />
  <p hidden>
    <label>Don’t fill this out: <input name="bot-field" /></label>
  </p>
  <div>
    <label>First name</label>
    <input name="firstName" required />
  </div>
  <div>
    <label>Last name</label>
    <input name="lastName" required />
  </div>
  <div>
    <label>Phone</label>
    <input name="phone" required />
  </div>
  <div>
    <label>Email</label>
    <input type="email" name="email" required />
  </div>
  <div className="grid" style={{ gridTemplateColumns: "1fr" }}>
    <label>City (Hillsborough County)</label>
    <input name="city" />
  </div>
  <div className="grid" style={{ gridTemplateColumns: "1fr" }}>
    <label>Years of experience</label>
    <select name="experience">
      <option value="0-1">0–1</option>
      <option value="2-4">2–4</option>
      <option value="5-9">5–9</option>
      <option value="10+">10+</option>
    </select>
  </div>
  <div className="grid" style={{ gridTemplateColumns: "1fr" }}>
    <label>Tell us about your skills</label>
    <textarea name="notes" rows="4" />
  </div>
  <div className="cta">
    <button type="submit">Apply Now</button>
    <a href="tel:17276273669" style={color:'var(--bm-navy)',fontWeight:700}>Call 727‑627‑3669</a>
  </div>
  <p className="small">Prefer email? <a href="mailto:info@bmcs365.com">info@bmcs365.com</a></p>
</form>

      </section>
    </main>
    <footer className="footer small">© {new Date().getFullYear()} B&M Commercial Services — bmcs365.com · 727‑627‑3669</footer>
  </>)
}
