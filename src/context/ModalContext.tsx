import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface ModalContextType {
  isModalOpen: boolean;
  modalMode: 'login' | 'signup';
  openModal: (mode?: 'login' | 'signup') => void;
  closeModal: () => void;
  isBookingModalOpen: boolean;
  openBookingModal: () => void;
  closeBookingModal: () => void;
  isMyAppointmentsOpen: boolean;
  openMyAppointments: () => void;
  closeMyAppointments: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'login' | 'signup'>('login');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isMyAppointmentsOpen, setIsMyAppointmentsOpen] = useState(false);

  const openModal = useCallback((mode: 'login' | 'signup' = 'login') => {
    setModalMode(mode);
    setIsModalOpen(true);
  }, []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);
  const openBookingModal = useCallback(() => setIsBookingModalOpen(true), []);
  const closeBookingModal = useCallback(() => setIsBookingModalOpen(false), []);
  const openMyAppointments = useCallback(() => setIsMyAppointmentsOpen(true), []);
  const closeMyAppointments = useCallback(() => setIsMyAppointmentsOpen(false), []);

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        modalMode,
        openModal,
        closeModal,
        isBookingModalOpen,
        openBookingModal,
        closeBookingModal,
        isMyAppointmentsOpen,
        openMyAppointments,
        closeMyAppointments,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
