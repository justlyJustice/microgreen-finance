import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Transaction = {};

export interface User {
  id: string;
  email: string;
  currency: string;
  bankInformation: {
    accountNumber: string;
    accountName: string;
    bankName: string;
  };
  isBlocked: boolean;
  fullName: string;
  phoneNumber: string;
  joinDate: string;
  accountBalance: number;
  transactions: Transaction[];
  profileImage?: string;
  role:
    | "beneficiary"
    | "state-coordinator"
    | "zonal-coordinator"
    | "lga-representative";
  usdtBalance: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  updateBalance: (amount: number) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user, token) =>
        set({ user, token, isAuthenticated: !!user && !!token }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
      updateUser: (userData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),
      updateBalance: (amount) =>
        set((state) => ({
          user: state.user ? { ...state.user, balance: amount } : null,
        })),
    }),
    {
      name: "auth-storage",
    }
  )
);

// Export a direct way to access the token without hooks
export const getToken = () => useAuthStore.getState().token;

export const getUser = () => useAuthStore.getState().user;

export const getTransactions = () =>
  useAuthStore.getState().user?.transactions || [];
