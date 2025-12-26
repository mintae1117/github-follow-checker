"use client";

import { useEffect } from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useFavoritesStore } from "../store/useFavoritesStore";
import { useGithubStore } from "../store/useGithubStore";
import { useAuthStore } from "../store/useAuthStore";

const FavoritesContainer = styled.div`
  width: 100%;
  max-width: 500px;
`;

const FavoritesHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 500;
`;

const StarIcon = styled.span`
  color: #f59e0b;
  display: flex;
  align-items: center;
`;

const FavoritesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const FavoriteChip = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  font-size: 14px;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #3b82f6;
    background: var(--hover-bg);
  }
`;

const RemoveButton = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--remove-bg);
  color: var(--text-secondary);
  font-size: 12px;
  transition: all 0.2s;

  &:hover {
    background: #ef4444;
    color: white;
  }
`;

const EmptyMessage = styled.p`
  color: var(--text-secondary);
  font-size: 14px;
  text-align: center;
  padding: 12px;
`;

export default function Favorites() {
  const favorites = useFavoritesStore((state) => state.favorites);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
  const { setUsername, fetchData } = useGithubStore();
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    useFavoritesStore.persist.rehydrate();
    useAuthStore.persist.rehydrate();
  }, []);

  const handleSelect = (username: string) => {
    setUsername(username);
    fetchData(accessToken);
  };

  const handleRemove = (e: React.MouseEvent, username: string) => {
    e.stopPropagation();
    removeFavorite(username);
  };

  if (favorites.length === 0) {
    return (
      <FavoritesContainer>
        <FavoritesHeader>
          <StarIcon>
            <FaStar size={14} />
          </StarIcon>
          Favorites
        </FavoritesHeader>
        <EmptyMessage>
          No favorites yet. Search for a user and add them!
        </EmptyMessage>
      </FavoritesContainer>
    );
  }

  return (
    <FavoritesContainer>
      <FavoritesHeader>
        <StarIcon>
          <FaStar size={14} />
        </StarIcon>
        Favorites ({favorites.length})
      </FavoritesHeader>
      <FavoritesList>
        {favorites.map((username) => (
          <FavoriteChip key={username} onClick={() => handleSelect(username)}>
            @{username}
            <RemoveButton onClick={(e) => handleRemove(e, username)}>
              <IoClose size={14} />
            </RemoveButton>
          </FavoriteChip>
        ))}
      </FavoritesList>
    </FavoritesContainer>
  );
}
