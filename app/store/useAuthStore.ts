import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  isRateLimited: boolean;
  rateLimitReset: number | null;
  setAccessToken: (token: string | null) => void;
  setRateLimited: (limited: boolean, resetTime?: number) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      isRateLimited: false,
      rateLimitReset: null,

      setAccessToken: (token: string | null) =>
        set({ accessToken: token, isRateLimited: false, rateLimitReset: null }),

      setRateLimited: (limited: boolean, resetTime?: number) =>
        set({
          isRateLimited: limited,
          rateLimitReset: resetTime || null,
        }),

      logout: () =>
        set({
          accessToken: null,
          isRateLimited: false,
          rateLimitReset: null,
        }),
    }),
    {
      name: "github-auth",
      skipHydration: true,
    }
  )
);
