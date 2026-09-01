import { useState, useId, useEffect } from "react";
import { useModal } from "../../context/ModalContext";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../i18n/LanguageContext";
import styles from "./appointmentModal.module.css";

const EyeIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const BackIcon = ({ size = 20, className }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.8}
    stroke="currentColor"
    width={size}
    height={size}
    className={className}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
    />
  </svg>
);

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const AppointmentModal = () => {
  const { isModalOpen, closeModal } = useModal();
  const { user, signIn, signUp, signInWithGoogle } = useAuth();
  const { t } = useLanguage();

  useEffect(() => {
    if (isModalOpen && user) {
      closeModal();
    }
  }, [isModalOpen, user, closeModal]);

  const [mode, setMode] = useState<"signup" | "login">("login");
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const id = useId();

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setShowPassword(false);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleClose = () => {
    resetForm();
    closeModal();
  };

  const toggleMode = () => {
    resetForm();
    setMode((prev) => (prev === "signup" ? "login" : "signup"));
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const getAuthErrorMessage = (error: string) => {
    return error;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!email.trim() || !password) {
      setErrorMessage("Por favor completa todos los campos.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setLoading(true);

    try {
      if (mode === "signup") {
        const { error, confirmationRequired } = await signUp(email, password);

        if (error) {
          setErrorMessage(getAuthErrorMessage(error));
          setLoading(false);
          return;
        }

        if (confirmationRequired) {
          setSuccessMessage(
            "Cuenta creada. Revisa tu correo electrónico para confirmar tu registro."
          );
          setLoading(false);
          return;
        }

        setSuccessMessage("Cuenta creada exitosamente.");
        setTimeout(() => {
          handleClose();
        }, 800);
        return;
      }

      const { error } = await signIn(email, password);

      if (error) {
        setErrorMessage(getAuthErrorMessage(error));
        setLoading(false);
        return;
      }

      handleClose();
    } catch (error) {
      setErrorMessage(getAuthErrorMessage(error as string));
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    try {
      const { error } = await signInWithGoogle();
      if (error) {
        setErrorMessage(getAuthErrorMessage(error));
        setLoading(false);
      }
    } catch {
      setErrorMessage("No fue posible conectar con Google.");
      setLoading(false);
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={handleClose}
          aria-label="Volver"
          disabled={loading}
        >
          <BackIcon size={20} />
        </button>

        <button
          type="button"
          className={styles.closeBtn}
          onClick={handleClose}
          aria-label="Cerrar"
          disabled={loading}
        >
          <CloseIcon />
        </button>

        <div className={styles.header}>
          <h2 className={styles.title}>
            {mode === "signup" ? t.modal.signupTitle : t.modal.loginTitle}
          </h2>

          <p className={styles.subtitle}>
            {mode === "signup" ? t.modal.signupSubtitle : t.modal.loginSubtitle}
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor={`${id}-email`} className={styles.label}>
              {t.modal.email}
            </label>

            <input
              id={`${id}-email`}
              type="email"
              placeholder={t.modal.emailPlaceholder}
              className={styles.input}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={loading}
              autoComplete="email"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor={`${id}-password`} className={styles.label}>
              {t.modal.password}
            </label>

            <div className={styles.passwordWrapper}>
              <input
                id={`${id}-password`}
                type={showPassword ? "text" : "password"}
                placeholder={t.modal.passwordPlaceholder}
                className={styles.input}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                disabled={loading}
                autoComplete={
                  mode === "signup" ? "new-password" : "current-password"
                }
                required
              />

              <button
                type="button"
                onClick={togglePassword}
                className={styles.passwordToggle}
                aria-label={
                  showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
                disabled={loading}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          {errorMessage && (
            <p
              role="alert"
              style={{
                margin: 0,
                color: "#b42318",
                fontSize: "0.8rem",
                lineHeight: 1.4,
              }}
            >
              {errorMessage}
            </p>
          )}

          {successMessage && (
            <p
              role="status"
              style={{
                margin: 0,
                color: "#2f6d7a",
                fontSize: "0.8rem",
                lineHeight: 1.4,
              }}
            >
              {successMessage}
            </p>
          )}

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading
              ? mode === "signup"
                ? "Creando cuenta..."
                : "Iniciando sesión..."
              : mode === "signup"
                ? t.modal.signupBtn
                : t.modal.loginBtn}
          </button>
        </form>

        <div className={styles.toggleText}>
          {mode === "signup" ? (
            <>
              {t.modal.hasAccount}{" "}
              <button
                type="button"
                className={styles.toggleLink}
                onClick={toggleMode}
                disabled={loading}
              >
                {t.modal.loginLink}
              </button>
            </>
          ) : (
            <>
              {t.modal.noAccount}{" "}
              <button
                type="button"
                className={styles.toggleLink}
                onClick={toggleMode}
                disabled={loading}
              >
                {t.modal.signupLink}
              </button>
            </>
          )}
        </div>

        <div className={styles.divider}>
          <span className={styles.dividerText}>{t.modal.or}</span>
        </div>

        <button
          type="button"
          className={styles.googleBtn}
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          <GoogleIcon />
          {t.modal.googleBtn}
        </button>

        {mode === "signup" && (
          <p className={styles.terms}>
            {t.modal.terms}{" "}
            <a href="#" className={styles.termsLink}>
              {t.modal.termsLink}
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default AppointmentModal;