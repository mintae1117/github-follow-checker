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

// 탭/통계/legend가 공유하는 메타데이터 (라벨·색상 단일 소스).
export const TAB_META: { type: TabType; label: string; color: string }[] = [
  { type: "followers", label: "Followers", color: "#22c55e" },
  { type: "following", label: "Following", color: "#3b82f6" },
  { type: "unfollowers", label: "Unfollowers", color: "#ef4444" },
  { type: "notMutuals", label: "Not Mutuals", color: "#f59e0b" },
];

// 각 항목이 의미하는 바 (legend 설명 + mouseover 툴팁 문구).
// unfollowers = getUnfollowers(내 following 중 나를 팔로우하지 않는 사람),
// notMutuals = getNotMutuals(내 follower 중 내가 팔로우하지 않는 사람) 정의와 일치해야 한다.
export const TAB_DESCRIPTIONS: Record<TabType, string> = {
  followers: "People who follow you",
  following: "People you follow",
  unfollowers: "You follow them, but they don't follow you back",
  notMutuals: "They follow you, but you don't follow them back",
};
