import { create } from "zustand";
import { GitHubUser, TabType } from "../types/github";
import {
  fetchFollowers,
  fetchFollowing,
  getUnfollowers,
  getNotMutuals,
  RateLimitError,
} from "../services/github";

interface GithubState {
  username: string;
  followers: GitHubUser[];
  following: GitHubUser[];
  unfollowers: GitHubUser[];
  notMutuals: GitHubUser[];
  activeTab: TabType;
  isLoading: boolean;
  error: string | null;
  rateLimitReset: number | null;
  setUsername: (username: string) => void;
  setActiveTab: (tab: TabType) => void;
  fetchData: (token?: string | null) => Promise<void>;
  reset: () => void;
  clearRateLimit: () => void;
}

export const useGithubStore = create<GithubState>((set, get) => ({
  username: "",
  followers: [],
  following: [],
  unfollowers: [],
  notMutuals: [],
  activeTab: "followers",
  isLoading: false,
  error: null,
  rateLimitReset: null,

  setUsername: (username: string) => set({ username }),

  setActiveTab: (tab: TabType) => set({ activeTab: tab }),

  fetchData: async (token?: string | null) => {
    const { username } = get();
    if (!username.trim()) return;

    set({ isLoading: true, error: null, rateLimitReset: null });

    try {
      const [followers, following] = await Promise.all([
        fetchFollowers(username, token),
        fetchFollowing(username, token),
      ]);

      const unfollowers = getUnfollowers(followers, following);
      const notMutuals = getNotMutuals(followers, following);

      set({
        followers,
        following,
        unfollowers,
        notMutuals,
        isLoading: false,
      });
    } catch (error) {
      if (error instanceof RateLimitError) {
        set({
          error: "API rate limit exceeded",
          rateLimitReset: error.resetTime,
          isLoading: false,
        });
      } else {
        set({
          error: error instanceof Error ? error.message : "Failed to fetch data",
          isLoading: false,
        });
      }
    }
  },

  reset: () =>
    set({
      username: "",
      followers: [],
      following: [],
      unfollowers: [],
      notMutuals: [],
      activeTab: "followers",
      error: null,
      rateLimitReset: null,
    }),

  clearRateLimit: () => set({ rateLimitReset: null, error: null }),
}));
