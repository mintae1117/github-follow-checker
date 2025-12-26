"use client";

import { useEffect } from "react";
import styled from "styled-components";
import { FaGithub } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { useAuthStore } from "../store/useAuthStore";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StatusBadge = styled.div<{ $authenticated: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: ${(props) =>
    props.$authenticated ? "rgba(34, 197, 94, 0.2)" : "rgba(107, 114, 128, 0.2)"};
  border: 1px solid
    ${(props) =>
      props.$authenticated ? "rgba(34, 197, 94, 0.4)" : "rgba(107, 114, 128, 0.4)"};
  border-radius: 20px;
  font-size: 12px;
  color: ${(props) => (props.$authenticated ? "#22c55e" : "var(--text-secondary)")};
`;

const Dot = styled.span<{ $authenticated: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${(props) => (props.$authenticated ? "#22c55e" : "#6b7280")};
`;

const SignInButton = styled.a`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  font-size: 12px;
  color: var(--text-primary);
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    border-color: #3b82f6;
    background: var(--hover-bg);
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #ef4444;
    color: #ef4444;
    background: rgba(239, 68, 68, 0.1);
  }
`;

export default function AuthStatus() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    useAuthStore.persist.rehydrate();
  }, []);

  return (
    <Container>
      <StatusBadge $authenticated={!!accessToken}>
        <Dot $authenticated={!!accessToken} />
        {accessToken ? "5,000 req/hr" : "60 req/hr"}
      </StatusBadge>

      {accessToken ? (
        <LogoutButton onClick={logout} title="Sign out">
          <IoLogOut size={16} />
        </LogoutButton>
      ) : (
        <SignInButton href="/api/auth/github">
          <FaGithub size={14} />
          Sign in
        </SignInButton>
      )}
    </Container>
  );
}
