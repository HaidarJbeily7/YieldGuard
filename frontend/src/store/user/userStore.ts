import { create } from "zustand";

interface UserState {
  isLoggedIn: boolean;
  nearAccount: string | null;
  login: (account: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  nearAccount: null,
  login: (account: string) => {
    localStorage.setItem("isLoggedIn", "true");
    set({ isLoggedIn: true, nearAccount: account });
  },
  logout: () => {
    localStorage.setItem("isLoggedIn", "false");
    set({ isLoggedIn: false, nearAccount: null });
  },
}));
