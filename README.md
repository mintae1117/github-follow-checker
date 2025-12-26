# GitHub Follow Checker

GitHub 사용자의 팔로워/팔로잉 관계를 분석하는 웹 애플리케이션입니다.

## 기능

- **Followers**: 나를 팔로우하는 사용자 목록
- **Following**: 내가 팔로우하는 사용자 목록
- **Unfollowers**: 내가 팔로우하지만 나를 팔로우하지 않는 사용자
- **Not Mutuals**: 나를 팔로우하지만 내가 팔로우하지 않는 사용자
- **Favorites**: 자주 검색하는 사용자를 즐겨찾기에 저장 (localStorage)

## 기술 스택

- **Framework**: Next.js 16
- **상태관리**: Zustand
- **스타일링**: Styled Components + Tailwind CSS
- **아이콘**: React Icons
- **언어**: TypeScript

## 프로젝트 구조

```
app/
├── components/      # UI 컴포넌트
├── services/        # API 호출 함수
├── store/           # Zustand 스토어
├── types/           # TypeScript 타입 정의
└── lib/             # 유틸리티 (styled-components SSR)
```
