import { useState, useId } from 'react';
import { AlertCircle, Eye, EyeOff, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { isUserAdmin } from '../../lib/admin';
import mobileLogo from '../../assets/mobilelogo.png';
import styles from './AdminLogin.module.css';

const BackIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.8}
    stroke="currentColor"
    width={size}
    height={size}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
    />
  </svg>
);

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

const AdminLogin = ({ onLoginSuccess }: AdminLoginProps) => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const emailId = useId();
  const passwordId = useId();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await signIn(email, password);
      if (res.error) {
        setError(res.error);
        setLoading(false);
        return;
      }

      if (!isUserAdmin(email)) {
        setError('Acceso denegado. Este correo no cuenta con permisos de administrador.');
        setLoading(false);
        return;
      }

      onLoginSuccess();
    } catch {
      setError('Ocurrió un error inesperado al conectar con el servidor.');
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="admin-login-title">
        <div className={styles.topBar}>
          <a href="/" className={styles.navIconBtn} aria-label="Volver al inicio" title="Volver al inicio">
            <BackIcon size={20} />
          </a>
          <h1 id="admin-login-title" className={styles.topBarTitle}>
            Acceso Administrativo
          </h1>
          <a href="/" className={styles.navIconBtn} aria-label="Cerrar" title="Cerrar">
            <X size={20} />
          </a>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.header}>
            <img src={mobileLogo} alt="Origen Med" className={styles.logo} />
          </div>

          {error && (
            <div className={styles.errorAlert} role="alert" aria-live="polite">
              <AlertCircle size={18} className={styles.errorIcon} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form} noValidate={false}>
            <div className={styles.field}>
              <label htmlFor={emailId} className={styles.label}>
                Correo Electrónico
              </label>
              <input
                id={emailId}
                type="email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
                disabled={loading}
                autoComplete="email"
                aria-invalid={!!error}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor={passwordId} className={styles.label}>
                Contraseña
              </label>
              <div className={styles.passwordWrapper}>
                <input
                  id={passwordId}
                  type={showPassword ? 'text' : 'password'}
                  className={styles.input}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  autoComplete="current-password"
                  aria-invalid={!!error}
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  tabIndex={0}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? (
                <>
                  <span className={styles.spinner} aria-hidden="true" />
                  <span>Verificando...</span>
                </>
              ) : (
                <span>Iniciar Sesión</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
