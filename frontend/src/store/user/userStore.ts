import { create } from "zustand";

export const useUserStore = create((set) => ({
  isLoggedIn: false,
  nearAccount: null,
  login: (account: string) => set({ isLoggedIn: true, nearAccount: account }),
  logout: () => set({ isLoggedIn: false, nearAccount: null }),
}));
