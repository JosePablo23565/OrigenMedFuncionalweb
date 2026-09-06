import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { isUserAdmin } from '../../lib/admin';
import AdminLogin from './AdminLogin';
import AdminLayout from './AdminLayout';
import AdminDashboard from './AdminDashboard';

const AdminPage = () => {
  const { user, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [checkingRole, setCheckingRole] = useState(true);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'today' | 'appointments'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [forceLoginView, setForceLoginView] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const checkAdminStatus = async () => {
      if (!user?.email) {
        if (isMounted) {
          setIsAdmin(false);
          setCheckingRole(false);
        }
        return;
      }

      setCheckingRole(true);
      const adminStatus = await isUserAdmin(user.email);

      if (isMounted) {
        setIsAdmin(adminStatus);
        setCheckingRole(false);
      }
    };

    if (!authLoading) {
      checkAdminStatus();
    }

    return () => {
      isMounted = false;
    };
  }, [user, authLoading]);

  if (authLoading || checkingRole) {
    return (
      <div
        style={{
          display: 'flex',
          height: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f7f6f0',
          color: '#6A6950',
          fontFamily: 'sans-serif',
        }}
      >
        Cargando Panel Administrativo...
      </div>
    );
  }

  if (!user || !isAdmin || forceLoginView) {
    return (
      <AdminLogin
        onLoginSuccess={() => {
          setForceLoginView(false);
          setIsAdmin(true);
        }}
      />
    );
  }

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <AdminDashboard
        activeTab={activeTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </AdminLayout>
  );
};

export default AdminPage;