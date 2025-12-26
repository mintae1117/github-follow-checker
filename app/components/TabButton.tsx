"use client";

import styled from "styled-components";
import { TabType } from "../types/github";
import { useGithubStore } from "../store/useGithubStore";

const TabContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
`;

const Tab = styled.button<{ $active: boolean; $color: string }>`
  padding: 10px 20px;
  border: 2px solid ${(props) => props.$color};
  border-radius: 25px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  background: ${(props) => (props.$active ? props.$color : "transparent")};
  color: ${(props) => (props.$active ? "white" : props.$color)};

  &:hover {
    background: ${(props) => props.$color};
    color: white;
  }
`;

const Badge = styled.span`
  margin-left: 6px;
  padding: 2px 8px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  font-size: 12px;
`;

const tabConfig: { type: TabType; label: string; color: string }[] = [
  { type: "followers", label: "Followers", color: "#22c55e" },
  { type: "following", label: "Following", color: "#3b82f6" },
  { type: "unfollowers", label: "Unfollowers", color: "#ef4444" },
  { type: "notMutuals", label: "Not Mutuals", color: "#f59e0b" },
];

export default function TabButton() {
  const {
    activeTab,
    setActiveTab,
    followers,
    following,
    unfollowers,
    notMutuals,
  } = useGithubStore();

  const getCounts = (type: TabType): number => {
    switch (type) {
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

  return (
    <TabContainer>
      {tabConfig.map(({ type, label, color }) => (
        <Tab
          key={type}
          $active={activeTab === type}
          $color={color}
          onClick={() => setActiveTab(type)}
        >
          {label}
          <Badge>{getCounts(type)}</Badge>
        </Tab>
      ))}
    </TabContainer>
  );
}
