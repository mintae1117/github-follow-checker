import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  favorites: string[];
  addFavorite: (username: string) => void;
  removeFavorite: (username: string) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (username: string) => {
        const { favorites } = get();
        if (!favorites.includes(username)) {
          set({ favorites: [...favorites, username] });
        }
      },

      removeFavorite: (username: string) => {
        const { favorites } = get();
        set({ favorites: favorites.filter((f) => f !== username) });
      },
    }),
    {
      name: "github-favorites",
      skipHydration: true,
    }
  )
);
