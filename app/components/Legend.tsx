"use client";

import styled from "styled-components";
import { TAB_DESCRIPTIONS, TAB_META } from "../types/github";

const LegendContainer = styled.dl`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
  padding: 14px 18px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--card-bg-secondary);
`;

const LegendItem = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  font-size: 13px;
`;

const Dot = styled.span<{ $color: string }>`
  width: 10px;
  height: 10px;
  flex-shrink: 0;
  align-self: center;
  border-radius: 50%;
  background: ${(props) => props.$color};
`;

const Term = styled.dt`
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
`;

const Description = styled.dd`
  margin: 0;
  color: var(--text-secondary);
`;

/** 4개 지표가 각각 무엇을 뜻하는지 보여주는 색상 범례. */
export default function Legend() {
  return (
    <LegendContainer>
      {TAB_META.map(({ type, label, color }) => (
        <LegendItem key={type}>
          <Dot $color={color} />
          <Term>{label}</Term>
          <Description>{TAB_DESCRIPTIONS[type]}</Description>
        </LegendItem>
      ))}
    </LegendContainer>
  );
}
