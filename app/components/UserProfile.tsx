"use client";

import styled from "styled-components";
import { IoLocationOutline, IoLinkOutline, IoBusiness } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { useGithubStore } from "../store/useGithubStore";

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 16px;
  background: var(--card-bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 16px;

  @media (max-width: 640px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Avatar = styled.a`
  flex-shrink: 0;
`;

const AvatarImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid var(--border-color);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 640px) {
    width: 72px;
    height: 72px;
  }
`;

const ProfileInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const NameRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    justify-content: center;
  }
`;

const Name = styled.a`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Username = styled.span`
  font-size: 0.875rem;
  color: var(--text-secondary);
`;

const Bio = styled.p`
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 6px 0 10px;
  line-height: 1.4;
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 0.8rem;
  color: var(--text-secondary);

  @media (max-width: 640px) {
    justify-content: center;
  }
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const MetaLink = styled.a`
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--text-secondary);
  text-decoration: none;

  &:hover {
    color: #3b82f6;
  }
`;

export default function UserProfile() {
  const userProfile = useGithubStore((state) => state.userProfile);

  if (!userProfile) return null;

  const {
    login,
    name,
    avatar_url,
    html_url,
    bio,
    company,
    location,
    blog,
    twitter_username,
  } = userProfile;

  const formatBlog = (url: string) => {
    return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  };

  return (
    <ProfileContainer>
      <Avatar href={html_url} target="_blank" rel="noopener noreferrer">
        <AvatarImage src={avatar_url} alt={`${login}'s avatar`} />
      </Avatar>
      <ProfileInfo>
        <NameRow>
          <Name href={html_url} target="_blank" rel="noopener noreferrer">
            {name || login}
          </Name>
          {name && <Username>@{login}</Username>}
        </NameRow>
        {bio && <Bio>{bio}</Bio>}
        <MetaRow>
          {company && (
            <MetaItem>
              <IoBusiness size={14} />
              {company}
            </MetaItem>
          )}
          {location && (
            <MetaItem>
              <IoLocationOutline size={14} />
              {location}
            </MetaItem>
          )}
          {blog && (
            <MetaLink
              href={blog.startsWith("http") ? blog : `https://${blog}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IoLinkOutline size={14} />
              {formatBlog(blog)}
            </MetaLink>
          )}
          {twitter_username && (
            <MetaLink
              href={`https://twitter.com/${twitter_username}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter size={12} />
              {twitter_username}
            </MetaLink>
          )}
        </MetaRow>
      </ProfileInfo>
    </ProfileContainer>
  );
}
