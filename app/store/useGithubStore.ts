import { create } from "zustand";
import { GitHubUser, TabType } from "../types/github";
import {
  fetchFollowers,
  fetchFollowing,
  getUnfollowers,
  getNotMutuals,
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
  setUsername: (username: string) => void;
  setActiveTab: (tab: TabType) => void;
  fetchData: () => Promise<void>;
  reset: () => void;
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

  setUsername: (username: string) => set({ username }),

  setActiveTab: (tab: TabType) => set({ activeTab: tab }),

  fetchData: async () => {
    const { username } = get();
    if (!username.trim()) return;

    set({ isLoading: true, error: null });

    try {
      const [followers, following] = await Promise.all([
        fetchFollowers(username),
        fetchFollowing(username),
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
      set({
        error: error instanceof Error ? error.message : "Failed to fetch data",
        isLoading: false,
      });
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
    }),
}));
