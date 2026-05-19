'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth';

const DEV_SESSION_KEY = 'lotoks_dev_preview';

const DEV_USER = {
  id: 'dev-0001',
  name: 'Developer',
  email: 'dev@lotoks.com',
  role: 'admin' as const,
};

/** Call this on app startup to rehydrate dev auth from sessionStorage */
export function useDevAuthRestore() {
  const { login, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated && typeof window !== 'undefined') {
      const isUnlocked = sessionStorage.getItem(DEV_SESSION_KEY) === '1';
      if (isUnlocked) login(DEV_USER);
    }
  }, [isAuthenticated, login]);
}

/** Grant dev access — stores to sessionStorage + logs into Zustand */
export function grantDevAccess() {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(DEV_SESSION_KEY, '1');
  }
  useAuthStore.getState().login(DEV_USER);
}

/** Revoke dev access */
export function revokeDevAccess() {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(DEV_SESSION_KEY);
  }
  useAuthStore.getState().logout();
}

export const DEV_PIN = '091344';
