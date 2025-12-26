# GitHub Follow Checker

GitHub 사용자의 팔로워/팔로잉 관계를 분석하는 웹 애플리케이션입니다.

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

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

[http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

## GitHub OAuth 설정 (선택)

API 요청 한도를 늘리려면 GitHub OAuth App을 설정하세요.

1. [GitHub Developer Settings](https://github.com/settings/developers)에서 OAuth App 생성
2. **Authorization callback URL**: `http://localhost:3000/api/auth/callback`
3. `.env.local` 파일 생성:

```env
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## API 제한

| 상태 | 요청 한도 |
|------|----------|
| 비로그인 | 60회/시간 |
| GitHub 로그인 | 5,000회/시간 |
