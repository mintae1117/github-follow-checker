"use client";

import { Tooltip as ReactTooltip } from "react-tooltip";

/**
 * 앱 공통 툴팁(react-tooltip 단일 인스턴스). page.tsx가 한 번만 렌더링하고,
 * 트리거 요소는 `data-tooltip-id={TOOLTIP_ID}` + `data-tooltip-content`로
 * 연결한다. 색은 globals.css의 `.app-tooltip`에서 테마 변수로 매핑한다.
 */
export const TOOLTIP_ID = "app-tooltip";

export default function AppTooltip() {
  return <ReactTooltip className="app-tooltip" id={TOOLTIP_ID} />;
}
