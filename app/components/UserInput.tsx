"use client";

import { useEffect } from "react";
import styled from "styled-components";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useGithubStore } from "../store/useGithubStore";
import { useFavoritesStore } from "../store/useFavoritesStore";

const InputWrapper = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  max-width: 500px;
`;

const InputContainer = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  padding: 14px 44px 14px 16px;
  background: var(--input-bg);
  border: 2px solid var(--input-border);
  border-radius: 12px;
  font-size: 16px;
  color: var(--input-text);
  transition: border-color 0.2s, box-shadow 0.2s;

  &::placeholder {
    color: var(--input-placeholder);
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }

  &:disabled {
    opacity: 0.6;
  }
`;

const StarButton = styled.button<{ $isFavorite: boolean }>`
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) =>
    props.$isFavorite ? "#f59e0b" : "var(--text-secondary)"};
  transition: transform 0.2s, color 0.2s;

  &:hover {
    transform: scale(1.2);
    color: #f59e0b;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const Button = styled.button`
  padding: 14px 28px;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export default function UserInput() {
  const { username, setUsername, fetchData, isLoading } = useGithubStore();
  const favorites = useFavoritesStore((state) => state.favorites);
  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

  useEffect(() => {
    useFavoritesStore.persist.rehydrate();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData();
  };

  const isFavorite = favorites.includes(username);

  const handleToggleFavorite = () => {
    if (!username.trim()) return;
    if (isFavorite) {
      removeFavorite(username);
    } else {
      addFavorite(username);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputWrapper>
        <InputContainer>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username"
            disabled={isLoading}
          />
          <StarButton
            type="button"
            $isFavorite={isFavorite}
            onClick={handleToggleFavorite}
            disabled={!username.trim() || isLoading}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? <FaStar size={20} /> : <FaRegStar size={20} />}
          </StarButton>
        </InputContainer>
        <Button type="submit" disabled={isLoading || !username.trim()}>
          {isLoading ? "Loading..." : "Search"}
        </Button>
      </InputWrapper>
    </form>
  );
}
