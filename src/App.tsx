import Navbar from './components/navbar/navbar';
import Hero from './components/hero/hero';
import HeroBridge from './components/herobridge/herobridge';
import Stats from './components/stats/stats';
import Experience from './components/experience/experience';
import Conditions from './components/conditions/conditions';
import Pricing from './components/pricing/pricing';
import FAQ from './components/faq/faq';
import Footer from './components/footer/footer';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <HeroBridge />
      <Stats />
      <Experience />
      <Conditions />
      <Pricing />
      <FAQ />
      <Footer />
    </>
  );
}

export default App;
