import { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/hero/hero';
import HeroBridge from './components/herobridge/herobridge';
import Stats from './components/stats/stats';
import Experience from './components/experience/experience';
import Conditions from './components/conditions/conditions';
import Pricing from './components/pricing/pricing';
import FAQ from './components/faq/faq';
import Footer from './components/footer/footer';

// Lazy-loaded routes & modals (loaded on demand, keeping initial bundle tiny)
const AppointmentModal = lazy(() => import('./components/appointmentModal/appointmentmodal'));
const BookingModal = lazy(() => import('./components/BookingModal/BookingModal'));
const MyAppointmentsModal = lazy(() => import('./components/MyAppointmentsModal/MyAppointmentsModal'));
const MyAppointmentsPage = lazy(() => import('./components/MyAppointments/MyAppointmentsPage'));
const AdminPage = lazy(() => import('./components/Admin/AdminPage'));

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
    return (
      <Suspense fallback={null}>
        <AdminPage />
      </Suspense>
    );
  }

  if (currentPath.startsWith('/mis-citas')) {
    return (
      <>
        <Navbar />
        <Suspense fallback={null}>
          <MyAppointmentsPage />
          <AppointmentModal />
          <BookingModal />
        </Suspense>
        <Footer />
      </>
    );
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
      <Suspense fallback={null}>
        <AppointmentModal />
        <BookingModal />
        <MyAppointmentsModal />
      </Suspense>
    </>
  );
}

export default App;
