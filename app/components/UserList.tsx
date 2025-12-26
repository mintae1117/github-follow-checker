"use client";

import styled from "styled-components";
import { useGithubStore } from "../store/useGithubStore";
import UserCard from "./UserCard";
import Pagination from "./Pagination";

const ListContainer = styled.div`
  width: 100%;
  max-width: 600px;
`;

const Grid = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: var(--text-secondary);
  font-size: 16px;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #fca5a5;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 12px;
  font-weight: 500;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 40px 20px;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid var(--border-color);
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.div`
  color: var(--text-secondary);
  font-size: 14px;
  text-align: center;
`;

const LoadingProgress = styled.div`
  display: flex;
  gap: 24px;
  color: var(--text-primary);
  font-size: 14px;
`;

const ProgressItem = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: ${(props) => (props.$active ? 1 : 0.5)};
`;

const ProgressDot = styled.span<{ $active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${(props) => (props.$active ? "#3b82f6" : "var(--text-secondary)")};
`;

export default function UserList() {
  const {
    activeTab,
    followers,
    following,
    unfollowers,
    notMutuals,
    isLoading,
    loadingProgress,
    error,
    getCurrentPageUsers,
  } = useGithubStore();

  if (isLoading) {
    const { status, followersCount, followingCount } = loadingProgress;

    return (
      <LoadingContainer>
        <LoadingSpinner />
        <LoadingText>
          {status === "fetching_followers" && "Fetching followers..."}
          {status === "fetching_following" && "Fetching following..."}
        </LoadingText>
        <LoadingProgress>
          <ProgressItem $active={status === "fetching_followers"}>
            <ProgressDot $active={status === "fetching_followers"} />
            Followers: {followersCount}
          </ProgressItem>
          <ProgressItem $active={status === "fetching_following"}>
            <ProgressDot $active={status === "fetching_following"} />
            Following: {followingCount}
          </ProgressItem>
        </LoadingProgress>
      </LoadingContainer>
    );
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  const users = getCurrentPageUsers();

  const getEmptyMessage = () => {
    switch (activeTab) {
      case "followers":
        return "No followers found";
      case "following":
        return "Not following anyone";
      case "unfollowers":
        return "Everyone you follow follows you back!";
      case "notMutuals":
        return "You follow back everyone who follows you!";
    }
  };

  const getTotalCount = () => {
    switch (activeTab) {
      case "followers":
        return followers.length;
      case "following":
        return following.length;
      case "unfollowers":
        return unfollowers.length;
      case "notMutuals":
        return notMutuals.length;
    }
  };

  const totalCount = getTotalCount();

  if (totalCount === 0 && (followers.length > 0 || following.length > 0)) {
    return <EmptyState>{getEmptyMessage()}</EmptyState>;
  }

  if (totalCount === 0) {
    return <EmptyState>Enter a GitHub username to get started</EmptyState>;
  }

  return (
    <ListContainer>
      <Grid>
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </Grid>
      <Pagination />
    </ListContainer>
  );
}
