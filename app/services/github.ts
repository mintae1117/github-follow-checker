import { GitHubUser } from "../types/github";

const GITHUB_API_BASE = "https://api.github.com";

async function fetchAllPages(url: string): Promise<GitHubUser[]> {
  const allUsers: GitHubUser[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(`${url}?per_page=100&page=${page}`);

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const users: GitHubUser[] = await response.json();

    if (users.length === 0) {
      hasMore = false;
    } else {
      allUsers.push(...users);
      page++;
    }
  }

  return allUsers;
}

export async function fetchFollowers(username: string): Promise<GitHubUser[]> {
  return fetchAllPages(`${GITHUB_API_BASE}/users/${username}/followers`);
}

export async function fetchFollowing(username: string): Promise<GitHubUser[]> {
  return fetchAllPages(`${GITHUB_API_BASE}/users/${username}/following`);
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
