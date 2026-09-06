import { useState, useEffect } from 'react';
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
import AdminPage from './components/Admin/AdminPage';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const hostname = window.location.hostname.toLowerCase();
  const isSubdomainAdmin = hostname.startsWith('paneladmin.') || hostname === 'paneladmin.origenmedfuncional.com';
  const isAdminPath = currentPath.startsWith('/admin');

  if (isSubdomainAdmin || isAdminPath) {
    return <AdminPage />;
  }

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
