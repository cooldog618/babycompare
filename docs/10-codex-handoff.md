# 10 Codex Handoff
## 현재 상태
모노레포/문서/기본 web+api+shared 골격 완료. `/health` 동작, 홈 페이지 표시 가능.

## 실행 방법
`nvm use && corepack enable && pnpm install && cp .env.example .env && pnpm db:migrate && pnpm dev`

## 주요 명령어
`pnpm dev`, `pnpm build`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm db:*`

## 중요한 결정
Node 22, pnpm workspace, Prisma+SQLite, 크롤링 미구현, 정식 admin MVP 제외

## 다음 추천 작업
1) BC-MVP-001 2) BC-MVP-002 3) BC-MVP-003

## 주의사항
시크릿을 `NEXT_PUBLIC_*`에 넣지 말 것. 네이버 API는 백엔드에서만 호출.
