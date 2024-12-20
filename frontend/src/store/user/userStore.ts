import { create } from "zustand";

interface UserState {
  isLoggedIn: boolean;
  nearAccount: string | null;
  login: (account: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  isLoggedIn: false,
  nearAccount: null,
  login: (account: string) => set({ isLoggedIn: true, nearAccount: account }),
  logout: () => set({ isLoggedIn: false, nearAccount: null }),
}));
