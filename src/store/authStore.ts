import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, UserRole } from '@/api/mock';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  language: 'en' | 'ru' | 'uz';
  hasHydrated: boolean;
  login: (user: User) => void;
  logout: () => void;
  setLanguage: (lang: 'en' | 'ru' | 'uz') => void;
  setHasHydrated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      language: 'en',
      hasHydrated: false,
      login: (user: User) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      setLanguage: (language) => set({ language }),
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: 'iftixor-auth',
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true);
        }
      },
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
