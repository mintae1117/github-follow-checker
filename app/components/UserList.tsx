"use client";

import styled from "styled-components";
import { useGithubStore } from "../store/useGithubStore";
import UserCard from "./UserCard";

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

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px;

  &::after {
    content: "";
    width: 40px;
    height: 40px;
    border: 4px solid var(--border-color);
    border-top-color: #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default function UserList() {
  const {
    activeTab,
    followers,
    following,
    unfollowers,
    notMutuals,
    isLoading,
    error,
  } = useGithubStore();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  const getUsers = () => {
    switch (activeTab) {
      case "followers":
        return followers;
      case "following":
        return following;
      case "unfollowers":
        return unfollowers;
      case "notMutuals":
        return notMutuals;
    }
  };

  const users = getUsers();

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

  if (users.length === 0 && (followers.length > 0 || following.length > 0)) {
    return <EmptyState>{getEmptyMessage()}</EmptyState>;
  }

  if (users.length === 0) {
    return <EmptyState>Enter a GitHub username to get started</EmptyState>;
  }

  return (
    <ListContainer>
      <Grid>
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </Grid>
    </ListContainer>
  );
}
