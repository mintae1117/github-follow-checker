"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { FaGithub } from "react-icons/fa";
import { IoWarning } from "react-icons/io5";
import { useGithubStore } from "../store/useGithubStore";
import { useAuthStore } from "../store/useAuthStore";

const Banner = styled.div`
  width: 100%;
  background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  color: white;
`;

const Title = styled.h3`
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.875rem;
  margin: 0;
  max-width: 400px;
`;

const ResetTime = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
  margin: 0;
`;

const AuthButton = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: white;
  color: #1f2937;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

const LoggedInInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const LoggedInText = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.875rem;
  margin: 0;
`;

const RetryButton = styled.button`
  padding: 10px 20px;
  background: white;
  color: #1f2937;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-1px);
  }
`;

function formatTimeRemaining(resetTime: number): string {
  const now = Date.now();
  const diff = resetTime - now;

  if (diff <= 0) return "now";

  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }
  return `${seconds}s`;
}

export default function RateLimitBanner() {
  const rateLimitReset = useGithubStore((state) => state.rateLimitReset);
  const fetchData = useGithubStore((state) => state.fetchData);
  const clearRateLimit = useGithubStore((state) => state.clearRateLimit);
  const accessToken = useAuthStore((state) => state.accessToken);
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  useEffect(() => {
    useAuthStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    if (!rateLimitReset) return;

    const updateTime = () => {
      setTimeRemaining(formatTimeRemaining(rateLimitReset));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [rateLimitReset]);

  if (!rateLimitReset) return null;

  const handleRetry = () => {
    clearRateLimit();
    fetchData(accessToken);
  };

  return (
    <Banner>
      <IconWrapper>
        <IoWarning size={24} />
      </IconWrapper>
      <Title>API Rate Limit Exceeded</Title>
      <Description>
        GitHub API has a limit of {accessToken ? "5,000" : "60"} requests per hour.
        {!accessToken && " Sign in with GitHub to increase your limit to 5,000 requests."}
      </Description>
      <ResetTime>Resets in: {timeRemaining}</ResetTime>

      {accessToken ? (
        <LoggedInInfo>
          <LoggedInText>You are signed in with GitHub</LoggedInText>
          <RetryButton onClick={handleRetry}>Retry Now</RetryButton>
        </LoggedInInfo>
      ) : (
        <AuthButton href="/api/auth/github">
          <FaGithub size={20} />
          Sign in with GitHub
        </AuthButton>
      )}
    </Banner>
  );
}
