import { Hero } from '../components/Hero';
import { Services } from '../components/Services';
import { About } from '../components/About';
import { BlogSection } from '../components/BlogSection';
import { FAQ } from '../components/FAQ';
import { Contact } from '../components/Contact';
import { SEO } from '../components/SEO';

export function Home() {
  return (
    <>
      <SEO />
      <main>
        <Hero />
        <Services />
        <About />
        <FAQ />
        <BlogSection />
        <Contact />
      </main>
    </>
  );
}
