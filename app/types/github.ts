export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

export type TabType = "followers" | "following" | "unfollowers" | "notMutuals";
