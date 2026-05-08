# 10 Codex Handoff
## 현재 상태
모노레포/문서/기본 web+api+shared 골격 완료. `/health` 동작, Product 모델 MVP 기준 확정, DEMO seed 데이터(카테고리별) 확장 완료.

## 실행 방법
1. `nvm use && corepack enable && pnpm install`
2. `cp .env.example .env`
3. `cp .env.example apps/api/.env`
4. `pnpm db:migrate`
5. `pnpm db:seed`
6. `pnpm dev`

## 주요 명령어
`pnpm dev`, `pnpm build`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm db:*`

## 중요한 결정
Node 22, pnpm workspace, Prisma+SQLite, 크롤링 미구현, 정식 admin MVP 제외

## 다음 추천 작업
1) BC-MVP-002
2) BC-MVP-003

## 주의사항
시크릿을 `NEXT_PUBLIC_*`에 넣지 말 것. 네이버 API는 백엔드에서만 호출. 검색 API와 네이버 API 연동은 아직 구현되지 않음.
