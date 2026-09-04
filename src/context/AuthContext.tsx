import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string) => Promise<{ error: string | null; confirmationRequired?: boolean }>;
  signInWithGoogle: () => Promise<{ error: string | null }>;
  signInWithGoogleIdToken: (token: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setUser(s?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      if (error.message.includes('Email not confirmed')) {
        return { error: 'Debes confirmar tu correo electrónico antes de iniciar sesión.' };
      }
      if (error.message.includes('Invalid login credentials')) {
        return { error: 'Correo o contraseña incorrectos.' };
      }
      return { error: 'No fue posible completar la acción. Inténtalo nuevamente.' };
    }

    if (!data.session) {
      return { error: 'No fue posible completar la acción. Inténtalo nuevamente.' };
    }

    return { error: null };
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      if (error.message.includes('already registered') || error.message.includes('already been registered')) {
        return { error: 'Ya existe una cuenta con este correo electrónico.' };
      }
      return { error: 'No fue posible completar la acción. Inténtalo nuevamente.' };
    }

    if (data.user && !data.session) {
      return { error: null, confirmationRequired: true };
    }

    return { error: null };
  }, []);

  const signInWithGoogle = useCallback(async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      return { error: 'No fue posible iniciar sesión con Google.' };
    }

    return { error: null };
  }, []);

  const signInWithGoogleIdToken = useCallback(async (token: string) => {
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token,
    });

    if (error) {
      return { error: error.message || 'No fue posible iniciar sesión con Google.' };
    }

    if (!data.session) {
      return { error: 'No fue posible completar la sesión con Google.' };
    }

    return { error: null };
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signUp, signInWithGoogle, signInWithGoogleIdToken, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
