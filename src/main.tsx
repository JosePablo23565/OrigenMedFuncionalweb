import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LanguageProvider } from './i18n/LanguageContext';
import { ModalProvider } from './context/ModalContext';
import { AuthProvider } from './context/AuthContext';
import './styles/global.css';
import App from './App';

if (import.meta.env.PROD) {
  console.log = () => {};
  console.info = () => {};
  console.warn = () => {};
  console.debug = () => {};
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
