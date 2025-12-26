"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import styled from "styled-components";
import UserInput from "./components/UserInput";
import TabButton from "./components/TabButton";
import UserList from "./components/UserList";
import Favorites from "./components/Favorites";
import AuthStatus from "./components/AuthStatus";
import RateLimitBanner from "./components/RateLimitBanner";
import ThemeToggle from "./components/ThemeToggle";
import UserProfile from "./components/UserProfile";
import { useGithubStore } from "./store/useGithubStore";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";

const getLogoSrc = (theme: string) =>
  theme === "dark"
    ? "/github-mark/github-mark-white.svg"
    : "/github-mark/github-mark.svg";

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    var(--gradient-start) 0%,
    var(--gradient-end) 100%
  );
  padding: 40px 20px;
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
  position: relative;
`;

const HeaderActions = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  gap: 8px;
`;

const Logo = styled.img`
  width: 72px;
  height: 72px;

  @media (max-width: 640px) {
    width: 56px;
    height: 56px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  text-align: center;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);

  @media (max-width: 640px) {
    font-size: 1.75rem;
  }
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  text-align: center;
  font-size: 1.1rem;
  margin-top: -8px;
`;

const Card = styled.div`
  width: 100%;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const Stats = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div<{ $color: string }>`
  font-size: 2rem;
  font-weight: 700;
  color: ${(props) => props.$color};
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: var(--text-secondary);
`;

const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid var(--border-color);
  margin: 8px 0;
`;

const Footer = styled.p`
  color: var(--text-secondary);
  font-size: 0.875rem;
  text-align: center;
`;

function AuthHandler() {
  const searchParams = useSearchParams();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  useEffect(() => {
    const accessToken = searchParams.get("access_token");
    const authError = searchParams.get("auth_error");

    if (accessToken) {
      setAccessToken(accessToken);
      window.history.replaceState({}, "", "/");
    }

    if (authError) {
      console.error("Auth error:", authError);
      window.history.replaceState({}, "", "/");
    }
  }, [searchParams, setAccessToken]);

  return null;
}

function HomeContent() {
  const {
    followers,
    following,
    unfollowers,
    notMutuals,
    username,
    userProfile,
    rateLimitReset,
  } = useGithubStore();
  const theme = useThemeStore((state) => state.theme);
  const hasData = followers.length > 0 || following.length > 0;

  useEffect(() => {
    useAuthStore.persist.rehydrate();
    useThemeStore.persist.rehydrate();
  }, []);

  return (
    <Container>
      <Content>
        <Header>
          <HeaderActions>
            <ThemeToggle />
          </HeaderActions>
          <Logo src={getLogoSrc(theme)} alt="GitHub Logo" />
          <Title>GitHub Follow Checker</Title>
          <Subtitle>Find out who is not following you back</Subtitle>
          <AuthStatus />
        </Header>

        <Card>
          <UserInput />

          {rateLimitReset && <RateLimitBanner />}

          <Divider />

          <Favorites />

          {userProfile && (
            <>
              <Divider />
              <UserProfile />
            </>
          )}

          {hasData && (
            <>
              <Divider />

              <Stats>
                <StatItem>
                  <StatValue $color="#22c55e">{followers.length}</StatValue>
                  <StatLabel>Followers</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue $color="#3b82f6">{following.length}</StatValue>
                  <StatLabel>Following</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue $color="#ef4444">{unfollowers.length}</StatValue>
                  <StatLabel>Unfollowers</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue $color="#f59e0b">{notMutuals.length}</StatValue>
                  <StatLabel>Not Mutuals</StatLabel>
                </StatItem>
              </Stats>

              <TabButton />
            </>
          )}

          <UserList />
        </Card>

        <Footer>
          Made by{" "}
          <a
            href="https://github.com/mintae1117"
            target="_blank"
            rel="noopener noreferrer"
          >
            @mintae1117
          </a>
        </Footer>
      </Content>
    </Container>
  );
}

export default function Home() {
  return (
    <>
      <Suspense fallback={null}>
        <AuthHandler />
      </Suspense>
      <HomeContent />
    </>
  );
}
