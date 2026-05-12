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
- `pnpm build`: 전체 빌드 (사전 `db:generate` 포함)
- `pnpm lint`: 전체 lint/정적 검사
- `pnpm typecheck`: 전체 타입 검사 (사전 `db:generate` 포함)
- `pnpm test`: 전체 테스트 (사전 `db:generate` 포함)
- `pnpm db:generate`: Prisma Client 생성
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
정식 admin은 아직 미구현입니다.

## 환경변수 보안 주의
- `NAVER_CLIENT_SECRET`, `ADMIN_API_TOKEN`은 브라우저에 노출하면 안 됩니다.
- `NEXT_PUBLIC_*` 변수에는 절대 비밀값을 넣지 않습니다.


## API 예시
- `curl "http://localhost:4000/products/search?query=유모차&sort=relevance&page=1&limit=20"`

- `curl "http://localhost:4000/products/<PRODUCT_ID>"`


## 11) 비교 기능
- 검색 결과 카드와 상품 상세에서 **비교 추가/제거**가 가능합니다.
- 비교 목록은 브라우저 `localStorage`의 `babycompare:compare` 키에 저장됩니다.
- 비교 목록은 최대 **5개**까지 담을 수 있습니다.
- 비교함 페이지(`/compare`)에서 empty/1개/2개 이상 상태에 따라 비교 UI를 제공합니다.
- 비교함에서 상품별 제거/전체 비우기 동작을 지원합니다.
- 새로고침 후에도 localStorage 기반으로 비교 목록이 유지됩니다.
- 비교함에서 유효 가격(숫자이며 0보다 큰 값) 기준 최저가 배지와 최저가 대비 차액을 표시합니다.
- 가격이 0이거나 유효하지 않은 상품은 "가격 정보 없음"으로 표시되며 최저가 계산에서 제외됩니다.


## 12) 검색 결과 카드 UX
- 카드에는 출처(데모/네이버/수동), 브랜드/제조사, 판매처, 카테고리, 가격, 평점, 리뷰 수를 표시합니다.
- 비교 추가/제거, 상세보기(내부 링크), 구매하기(외부 링크) 버튼을 제공합니다.
- 구매하기 링크는 항상 새 탭으로 열리며 `target="_blank"`, `rel="noopener noreferrer"` 정책을 적용합니다.
- 데모 도메인 링크는 `(데모 링크)`로 표시해 실제 구매 링크와 구분합니다.


## Admin (MVP 확인용)
- 접속 경로: `/admin`, `/admin/products`
- 보호 방식: HTTP Basic Auth (`ADMIN_USER`, `ADMIN_PASSWORD`) + 서버 프록시 토큰(`ADMIN_API_TOKEN`)
- web/.env: `ADMIN_USER`, `ADMIN_PASSWORD`, `ADMIN_API_TOKEN`, `NEXT_PUBLIC_API_BASE_URL`
- api/.env: `ADMIN_API_TOKEN`
- 중요: `ADMIN_API_TOKEN`은 `NEXT_PUBLIC_*`로 노출 금지
- 운영 배포 시 `ADMIN_PASSWORD=change-me` 기본값을 반드시 변경하세요.


## QA 체크리스트
- 수동 QA/릴리즈 체크리스트: `docs/08-release-checklist.md`

## Prisma 및 Codex 환경 주의
- clean install 직후에는 Prisma Client가 없을 수 있으므로 `pnpm db:generate` 또는 `pnpm test/typecheck/build`를 먼저 실행해 Client를 생성하세요.
- Codex 환경에서는 네트워크/프록시 정책으로 Prisma engine/pnpm 다운로드 403이 발생할 수 있습니다. 이 경우 코드 이슈와 인프라 이슈를 분리해서 판단하세요.
