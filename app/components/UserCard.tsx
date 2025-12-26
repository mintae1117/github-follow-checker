"use client";

import styled from "styled-components";
import { GitHubUser } from "../types/github";
import Image from "next/image";

const Card = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: var(--card-bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    border-color: #3b82f6;
    background: var(--hover-bg);
  }
`;

const AvatarWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 16px;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UserId = styled.span`
  font-size: 12px;
  color: var(--text-secondary);
`;

interface UserCardProps {
  user: GitHubUser;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <Card href={user.html_url} target="_blank" rel="noopener noreferrer">
      <AvatarWrapper>
        <Image
          src={user.avatar_url}
          alt={user.login}
          width={48}
          height={48}
          className="object-cover"
        />
      </AvatarWrapper>
      <UserInfo>
        <Username>{user.login}</Username>
        <UserId>ID: {user.id}</UserId>
      </UserInfo>
    </Card>
  );
}
