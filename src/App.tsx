import Navbar from './components/Navbar/Navbar';
import Hero from './components/hero/hero';
import HeroBridge from './components/herobridge/herobridge';
import Stats from './components/stats/stats';
import Experience from './components/experience/experience';
import Conditions from './components/conditions/conditions';
import Pricing from './components/pricing/pricing';
import FAQ from './components/faq/faq';
import Footer from './components/footer/footer';
import AppointmentModal from './components/appointmentModal/appointmentmodal';
import BookingModal from './components/BookingModal/BookingModal';
import MyAppointmentsModal from './components/MyAppointmentsModal/MyAppointmentsModal';

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
      <AppointmentModal />
      <BookingModal />
      <MyAppointmentsModal />
    </>
  );
}

export default App;
