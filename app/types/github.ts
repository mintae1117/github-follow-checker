export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

export interface GitHubProfile {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  bio: string | null;
  company: string | null;
  location: string | null;
  blog: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
}

export type TabType = "followers" | "following" | "unfollowers" | "notMutuals";

// 각 탭/통계가 의미하는 바 (mouseover 툴팁 문구).
// unfollowers = getUnfollowers(내 following 중 나를 팔로우하지 않는 사람),
// notMutuals = getNotMutuals(내 follower 중 내가 팔로우하지 않는 사람) 정의와 일치해야 한다.
export const TAB_DESCRIPTIONS: Record<TabType, string> = {
  followers: "People who follow you",
  following: "People you follow",
  unfollowers: "Who's not following you back (you follow them, they don't follow you)",
  notMutuals: "Who you're not following back (they follow you, you don't follow them)",
};
