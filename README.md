# BabyCompare

## 1) 프로젝트 소개
BabyCompare는 유모차, 카시트, 분유, 기저귀 등 육아용품을 검색하고 최대 5개까지 비교할 수 있도록 돕는 서비스입니다.

## 2) 기술 스택
- Monorepo: pnpm workspaces
- Language: TypeScript (strict)
- Web: Next.js App Router + Tailwind CSS
- API: NestJS REST API
- DB: Prisma ORM v6 + SQLite

## 3) 요구 사항
- Node.js 22.x
- pnpm

## 4) 로컬 실행 방법
1. `nvm use`
2. `corepack enable`
3. `pnpm install`
4. `cp .env.example .env`
5. `pnpm db:migrate`
6. `pnpm dev`

## 5) 앱 URL
- web: http://localhost:3000
- api health: http://localhost:4000/health
- web home: http://localhost:3000/
- web search: http://localhost:3000/search?q=유모차&sort=relevance
- web product detail: http://localhost:3000/products/<PRODUCT_ID>

## 6) 스크립트 설명
- `pnpm dev`: web/api 동시 실행
- `pnpm dev:web`: web 실행
- `pnpm dev:api`: api 실행
- `pnpm build`: 전체 빌드
- `pnpm lint`: 전체 lint/정적 검사
- `pnpm typecheck`: 전체 타입 검사
- `pnpm test`: 전체 테스트
- `pnpm db:migrate`: prisma 마이그레이션
- `pnpm db:seed`: prisma seed
- `pnpm db:studio`: prisma studio

## 7) 네이버 API 키
네이버 API 키 설정/연동은 추후 작업에서 진행합니다.

## 8) Docker
Docker는 선택 사항입니다. 2017년 인텔맥에서는 Docker 없이 로컬 Node 실행을 권장합니다.

## 9) MVP 제외 범위
회원가입/로그인, 찜 목록 서버 저장, 리뷰 크롤링, 가격 추적, 알림, 결제, 정식 관리자 페이지, 모바일 앱

## 10) Known limitations
비교 기능, 최저가 표시, 정식 admin은 아직 미구현입니다.

## 환경변수 보안 주의
- `NAVER_CLIENT_SECRET`, `ADMIN_API_TOKEN`은 브라우저에 노출하면 안 됩니다.
- `NEXT_PUBLIC_*` 변수에는 절대 비밀값을 넣지 않습니다.


## API 예시
- `curl "http://localhost:4000/products/search?query=유모차&sort=relevance&page=1&limit=20"`

- `curl "http://localhost:4000/products/<PRODUCT_ID>"`


## 11) 비교 기능(초안)
- 검색 결과 카드와 상품 상세에서 **비교 추가/제거**가 가능합니다.
- 비교 목록은 브라우저 `localStorage`의 `babycompare:compare` 키에 저장됩니다.
- 비교 목록은 최대 **5개**까지 담을 수 있습니다.
- 비교함 페이지(` /compare `)는 현재 placeholder이며 상세 비교 테이블은 다음 단계에서 구현됩니다.
