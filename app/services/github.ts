import { GitHubUser } from "../types/github";

const GITHUB_API_BASE = "https://api.github.com";

export class RateLimitError extends Error {
  resetTime: number;

  constructor(resetTime: number) {
    super("GitHub API rate limit exceeded");
    this.name = "RateLimitError";
    this.resetTime = resetTime;
  }
}

export interface FetchProgress {
  type: "followers" | "following";
  current: number;
  total: number | null;
}

async function fetchAllPages(
  url: string,
  token?: string | null,
  onProgress?: (count: number) => void
): Promise<GitHubUser[]> {
  const allUsers: GitHubUser[] = [];
  let page = 1;
  let hasMore = true;

  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  while (hasMore) {
    const response = await fetch(`${url}?per_page=100&page=${page}`, {
      headers,
    });

    if (response.status === 403 || response.status === 429) {
      const resetHeader = response.headers.get("X-RateLimit-Reset");
      const resetTime = resetHeader
        ? parseInt(resetHeader, 10) * 1000
        : Date.now() + 3600000;
      throw new RateLimitError(resetTime);
    }

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const users: GitHubUser[] = await response.json();

    if (users.length === 0) {
      hasMore = false;
    } else {
      allUsers.push(...users);
      onProgress?.(allUsers.length);
      page++;
    }
  }

  return allUsers;
}

export async function fetchFollowers(
  username: string,
  token?: string | null,
  onProgress?: (count: number) => void
): Promise<GitHubUser[]> {
  return fetchAllPages(
    `${GITHUB_API_BASE}/users/${username}/followers`,
    token,
    onProgress
  );
}

export async function fetchFollowing(
  username: string,
  token?: string | null,
  onProgress?: (count: number) => void
): Promise<GitHubUser[]> {
  return fetchAllPages(
    `${GITHUB_API_BASE}/users/${username}/following`,
    token,
    onProgress
  );
}

export function getUnfollowers(
  followers: GitHubUser[],
  following: GitHubUser[]
): GitHubUser[] {
  const followerIds = new Set(followers.map((f) => f.id));
  return following.filter((f) => !followerIds.has(f.id));
}

export function getNotMutuals(
  followers: GitHubUser[],
  following: GitHubUser[]
): GitHubUser[] {
  const followingIds = new Set(following.map((f) => f.id));
  return followers.filter((f) => !followingIds.has(f.id));
}
