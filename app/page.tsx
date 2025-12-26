"use client";

import styled from "styled-components";
import UserInput from "./components/UserInput";
import TabButton from "./components/TabButton";
import UserList from "./components/UserList";
import Favorites from "./components/Favorites";
import { useGithubStore } from "./store/useGithubStore";

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
  margin-top: -16px;
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

export default function Home() {
  const { followers, following, unfollowers, notMutuals, username } =
    useGithubStore();
  const hasData = followers.length > 0 || following.length > 0;

  return (
    <Container>
      <Content>
        <Title>GitHub Follow Checker</Title>
        <Subtitle>Find out who is not following you back</Subtitle>

        <Card>
          <UserInput />

          <Divider />

          <Favorites />

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

        <Footer>Searching for: @{username || "Enter a username above"}</Footer>
      </Content>
    </Container>
  );
}
