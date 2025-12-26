"use client";

import { useEffect } from "react";
import styled from "styled-components";
import { IoSunny, IoMoon } from "react-icons/io5";
import { useThemeStore } from "../store/useThemeStore";

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--hover-bg);
    transform: scale(1.05);
  }
`;

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    useThemeStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ToggleButton
      onClick={toggleTheme}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? <IoSunny size={20} /> : <IoMoon size={20} />}
    </ToggleButton>
  );
}
