import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, UserRole } from '@/api/mock';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  language: 'en' | 'ru' | 'uz';
  login: (user: User) => void;
  logout: () => void;
  setLanguage: (lang: 'en' | 'ru' | 'uz') => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      language: 'en',
      login: (user: User) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'iftixor-auth',
    }
  )
);

export const getRoleDashboardPath = (role: UserRole): string => {
  switch (role) {
    case 'admin':
      return '/admin';
    case 'teacher':
      return '/teacher';
    case 'finance':
      return '/finance';
    case 'kitchen':
      return '/kitchen';
    case 'parent':
      return '/parent';
    case 'student':
      return '/student';
    default:
      return '/dashboard';
  }
};
