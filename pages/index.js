import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import ServiceCard from '../components/ServiceCard';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <section className="section bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-3 gap-6">
            <ServiceCard title="Facility Services" href="/services/facility">
              Janitorial, day porter, and floor care programs for offices, schools, and industrial sites.
            </ServiceCard>
            <ServiceCard title="Rehab & Restoration" href="/services/rehab">
              Turn services, post-construction, water/fire restoration, and specialty cleaning.
            </ServiceCard>
            <ServiceCard title="Mobile Mechanic" href="/services/mechanic">
              Fleet maintenance and on-site repair to keep your operations running 24/7.
            </ServiceCard>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
