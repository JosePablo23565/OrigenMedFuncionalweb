import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LanguageProvider } from './i18n/LanguageContext';
import { ModalProvider } from './context/ModalContext';
import { AuthProvider } from './context/AuthContext';
import './styles/global.css';
import App from './App';

// Silenciar ruido y advertencias de scripts de terceros (Google Identity, Permissions-Policy, PWA residual)
const filterThirdPartyNoise = () => {
  const isNoise = (args: any[]) => {
    const text = args.map(a => (typeof a === 'string' ? a : (a?.message || ''))).join(' ');
    return (
      text.includes('GSI_LOGGER') ||
      text.includes('google.accounts.id') ||
      text.includes('Permissions-Policy') ||
      text.includes('attribution-reporting') ||
      text.includes('private-aggregation') ||
      text.includes('browsing-topics') ||
      text.includes('run-ad-auction') ||
      text.includes('origin is not allowed') ||
      text.includes('pwa-entry-point')
    );
  };

  const origWarn = console.warn;
  console.warn = (...args: any[]) => {
    if (isNoise(args)) return;
    origWarn.apply(console, args);
  };

  const origError = console.error;
  console.error = (...args: any[]) => {
    if (isNoise(args)) return;
    origError.apply(console, args);
  };
};

filterThirdPartyNoise();

if (import.meta.env.PROD) {
  console.log = () => {};
  console.info = () => {};
  console.warn = () => {};
  console.debug = () => {};
  console.error = () => {};
  try {
    console.clear();
  } catch {
    // Ignore in unsupported environments
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <ModalProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ModalProvider>
    </LanguageProvider>
  </StrictMode>
);
