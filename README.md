# GitHub Follow Checker

A web application that displays follower/following relationships for GitHub users. [Visit Site](https://github-follow-checker-beta.vercel.app/)

## Features

- **Followers**: List of users who follow you
- **Following**: List of users you follow
- **Unfollowers**: Users you follow but don't follow you back
- **Not Mutuals**: Users who follow you but you don't follow back
- **Favorites**: Save frequently searched users to favorites (localStorage)
- **GitHub OAuth**: Increase API rate limit from 60 → 5,000 requests/hour when logged in

## Tech Stack

- **Framework**: Next.js 16
- **State Management**: Zustand
- **Styling**: Styled Components + Tailwind CSS
- **Icons**: React Icons
- **Language**: TypeScript

## Project Structure

```
app/
├── api/
│   └── auth/          # GitHub OAuth routes
├── components/        # UI components
├── services/          # API call functions
├── store/             # Zustand store
├── types/             # TypeScript type definitions
└── lib/               # Utilities (styled-components SSR)
```

## API Rate Limits

| Status           | Rate Limit          |
| ---------------- | ------------------- |
| Not logged in    | 60 requests/hour    |
| GitHub logged in | 5,000 requests/hour |


# korean version

GitHub 사용자의 아이디로 팔로워/팔로잉 관계를 보여주는 웹 애플리케이션입니다. [방문하기](https://github-follow-checker-beta.vercel.app/)

## 기능

- **Followers**: 나를 팔로우하는 사용자 목록
- **Following**: 내가 팔로우하는 사용자 목록
- **Unfollowers**: 내가 팔로우하지만 나를 팔로우하지 않는 사용자
- **Not Mutuals**: 나를 팔로우하지만 내가 팔로우하지 않는 사용자
- **Favorites**: 자주 검색하는 사용자를 즐겨찾기에 저장 (localStorage)
- **GitHub OAuth**: 로그인 시 API 요청 한도 60 → 5,000/시간으로 증가

## 기술 스택

- **Framework**: Next.js 16
- **상태관리**: Zustand
- **스타일링**: Styled Components + Tailwind CSS
- **아이콘**: React Icons
- **언어**: TypeScript

## 프로젝트 구조

```
app/
├── api/
│   └── auth/          # GitHub OAuth 라우트
├── components/        # UI 컴포넌트
├── services/          # API 호출 함수
├── store/             # Zustand 스토어
├── types/             # TypeScript 타입 정의
└── lib/               # 유틸리티 (styled-components SSR)
```

## API 제한

| 상태          | 요청 한도    |
| ------------- | ------------ |
| 비로그인      | 60회/시간    |
| GitHub 로그인 | 5,000회/시간 |
