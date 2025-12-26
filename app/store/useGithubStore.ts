import { create } from "zustand";
import { GitHubUser, TabType } from "../types/github";
import {
  fetchFollowers,
  fetchFollowing,
  getUnfollowers,
  getNotMutuals,
  RateLimitError,
} from "../services/github";

const ITEMS_PER_PAGE = 100;

interface LoadingProgress {
  followersCount: number;
  followingCount: number;
  status: "idle" | "fetching_followers" | "fetching_following" | "done";
}

interface GithubState {
  username: string;
  followers: GitHubUser[];
  following: GitHubUser[];
  unfollowers: GitHubUser[];
  notMutuals: GitHubUser[];
  activeTab: TabType;
  currentPage: number;
  isLoading: boolean;
  loadingProgress: LoadingProgress;
  error: string | null;
  rateLimitReset: number | null;
  setUsername: (username: string) => void;
  setActiveTab: (tab: TabType) => void;
  setCurrentPage: (page: number) => void;
  fetchData: (token?: string | null) => Promise<void>;
  reset: () => void;
  clearRateLimit: () => void;
  getCurrentPageUsers: () => GitHubUser[];
  getTotalPages: () => number;
}

export const useGithubStore = create<GithubState>((set, get) => ({
  username: "",
  followers: [],
  following: [],
  unfollowers: [],
  notMutuals: [],
  activeTab: "followers",
  currentPage: 1,
  isLoading: false,
  loadingProgress: {
    followersCount: 0,
    followingCount: 0,
    status: "idle",
  },
  error: null,
  rateLimitReset: null,

  setUsername: (username: string) => set({ username }),

  setActiveTab: (tab: TabType) => set({ activeTab: tab, currentPage: 1 }),

  setCurrentPage: (page: number) => set({ currentPage: page }),

  fetchData: async (token?: string | null) => {
    const { username } = get();
    if (!username.trim()) return;

    set({
      isLoading: true,
      error: null,
      rateLimitReset: null,
      currentPage: 1,
      loadingProgress: {
        followersCount: 0,
        followingCount: 0,
        status: "fetching_followers",
      },
    });

    try {
      const followers = await fetchFollowers(username, token, (count) => {
        set((state) => ({
          loadingProgress: {
            ...state.loadingProgress,
            followersCount: count,
          },
        }));
      });

      set((state) => ({
        loadingProgress: {
          ...state.loadingProgress,
          status: "fetching_following",
        },
      }));

      const following = await fetchFollowing(username, token, (count) => {
        set((state) => ({
          loadingProgress: {
            ...state.loadingProgress,
            followingCount: count,
          },
        }));
      });

      const unfollowers = getUnfollowers(followers, following);
      const notMutuals = getNotMutuals(followers, following);

      set({
        followers,
        following,
        unfollowers,
        notMutuals,
        isLoading: false,
        loadingProgress: {
          followersCount: followers.length,
          followingCount: following.length,
          status: "done",
        },
      });
    } catch (error) {
      if (error instanceof RateLimitError) {
        set({
          error: "API rate limit exceeded",
          rateLimitReset: error.resetTime,
          isLoading: false,
          loadingProgress: {
            followersCount: 0,
            followingCount: 0,
            status: "idle",
          },
        });
      } else {
        set({
          error:
            error instanceof Error ? error.message : "Failed to fetch data",
          isLoading: false,
          loadingProgress: {
            followersCount: 0,
            followingCount: 0,
            status: "idle",
          },
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
      currentPage: 1,
      error: null,
      rateLimitReset: null,
      loadingProgress: {
        followersCount: 0,
        followingCount: 0,
        status: "idle",
      },
    }),

  clearRateLimit: () => set({ rateLimitReset: null, error: null }),

  getCurrentPageUsers: () => {
    const { activeTab, followers, following, unfollowers, notMutuals, currentPage } =
      get();

    let users: GitHubUser[];
    switch (activeTab) {
      case "followers":
        users = followers;
        break;
      case "following":
        users = following;
        break;
      case "unfollowers":
        users = unfollowers;
        break;
      case "notMutuals":
        users = notMutuals;
        break;
    }

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return users.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  },

  getTotalPages: () => {
    const { activeTab, followers, following, unfollowers, notMutuals } = get();

    let total: number;
    switch (activeTab) {
      case "followers":
        total = followers.length;
        break;
      case "following":
        total = following.length;
        break;
      case "unfollowers":
        total = unfollowers.length;
        break;
      case "notMutuals":
        total = notMutuals.length;
        break;
    }

    return Math.ceil(total / ITEMS_PER_PAGE);
  },
}));
