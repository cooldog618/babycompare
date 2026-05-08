# BabyCompare Agent Guide

## 작업 전 필독 문서
1. `README.md`
2. `docs/01-mvp-scope.md`
3. `docs/02-architecture.md`
4. `docs/03-decisions.md`
5. `docs/10-codex-handoff.md`

## 필수 규칙
- Node.js 22.x, pnpm 기반으로만 작업합니다.
- TypeScript `strict`를 유지합니다.
- 비밀값(`NAVER_CLIENT_SECRET`, `ADMIN_API_TOKEN` 등)을 클라이언트 코드/`NEXT_PUBLIC_*`에 노출하지 않습니다.
- 실제 사용자 리뷰/상세정보 크롤링 기능은 구현하지 않습니다.
- MVP 범위를 벗어나는 기능은 별도 backlog/ADR에 기록하고 이번 작업에 포함하지 않습니다.

## 완료 전 검증 명령
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`
