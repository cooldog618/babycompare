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

## 4) 빠른 시작 (로컬 실행)
1. `nvm use`
2. `corepack enable`
3. `pnpm install`
4. `cp .env.example .env`
5. `pnpm db:migrate`
6. `pnpm db:seed`
7. `pnpm dev`

### 실행 확인 URL
- web home: http://localhost:3000/
- web search: http://localhost:3000/search?q=유모차&sort=relevance
- web compare: http://localhost:3000/compare
- web admin: http://localhost:3000/admin
- api health: http://localhost:4000/health

## 5) 환경 변수 가이드
### 공통
- 저장 위치: 루트 `.env`
- 금지: `NAVER_CLIENT_SECRET`, `ADMIN_API_TOKEN` 같은 비밀값을 `NEXT_PUBLIC_*`에 넣지 않습니다.

### Naver API 연동 (선택)
- `NAVER_CLIENT_ID`
- `NAVER_CLIENT_SECRET`
- 값이 없거나 연동 실패 시 검색 API는 demo/manual DB fallback으로 동작합니다.

### Admin (MVP 확인용)
- `ADMIN_USER`
- `ADMIN_PASSWORD`
- `ADMIN_API_TOKEN`
- `NEXT_PUBLIC_API_BASE_URL`

## 6) 실행/검증 명령어
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

### 권장 검증 순서
1. `pnpm lint`
2. `pnpm typecheck`
3. `pnpm test`
4. `pnpm build`

## 7) MVP 시연 가이드
### 시연 전 준비
1. `pnpm install`
2. `cp .env.example .env`
3. `pnpm db:migrate && pnpm db:seed`
4. `pnpm dev`

### 시연 시나리오 (권장 10분)
1. **홈 진입**: 인기 검색어/검색 입력 확인 (`/`).
2. **검색**: `유모차` 검색 후 정렬(relevance/priceAsc/priceDesc) 전환 (`/search`).
3. **카드 확인**: 브랜드/가격/판매처/출처, 구매하기 링크 새 탭 정책 확인.
4. **상세 진입**: 상품 카드에서 상세 페이지 이동 (`/products/[id]`).
5. **비교 추가**: 검색/상세에서 비교에 2~3개 추가.
6. **비교함 확인**: `/compare`에서 최저가 배지/차액/전체 비우기 동작 확인.
7. **새로고침 복원**: 비교 목록 localStorage 유지 확인.
8. **관리자 확인**: `/admin` 또는 `/admin/products` 접근 및 기본 보호 동작 확인.

### 시연 체크포인트
- 비교 목록은 최대 5개까지만 담긴다.
- 가격이 없거나 0인 항목은 최저가 계산에서 제외된다.
- 외부 구매 링크는 새 탭 + `noopener noreferrer`를 사용한다.
- 비밀값이 클라이언트로 노출되지 않는다.

## 8) API 예시
- `curl "http://localhost:4000/products/search?query=유모차&sort=relevance&page=1&limit=20"`
- `curl "http://localhost:4000/products/<PRODUCT_ID>"`

## 9) MVP 제외 범위
회원가입/로그인, 찜 목록 서버 저장, 리뷰 크롤링, 가격 추적, 알림, 결제, 정식 관리자 페이지, 모바일 앱

## 10) Known limitations
- 운영용 정식 admin은 아직 미구현입니다.
- Codex/CI 환경에서는 Prisma engine/pnpm 다운로드 403이 발생할 수 있습니다.
