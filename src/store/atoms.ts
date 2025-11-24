import { atom } from 'jotai';

// UI State
export const isMobileMenuOpenAtom = atom(false);

// User State (Mock)
export const userAtom = atom<{ name: string; email: string } | null>(null);
