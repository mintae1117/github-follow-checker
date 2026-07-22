"use client";

import { ReactNode } from "react";
import styled from "styled-components";

const Wrapper = styled.span`
  position: relative;
  display: inline-flex;
  cursor: help;

  &::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    width: max-content;
    max-width: 240px;
    padding: 6px 10px;
    border-radius: 6px;
    background: var(--foreground);
    color: var(--background);
    font-size: 12px;
    font-weight: 500;
    line-height: 1.4;
    text-align: center;
    white-space: normal;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.15s;
  }

  &:hover::after,
  &:focus-within::after {
    opacity: 1;
  }
`;

/** mouseover(또는 내부 포커스) 시 위쪽에 말풍선을 띄우는 순수 CSS 툴팁. */
export default function Tooltip({
  children,
  text,
}: {
  children: ReactNode;
  text: string;
}) {
  return <Wrapper data-tooltip={text}>{children}</Wrapper>;
}
