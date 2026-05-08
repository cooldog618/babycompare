# 10 Codex Handoff
## 현재 상태
모노레포/문서/기본 web+api+shared 골격 완료. `/health` 동작, Product 모델 MVP 기준 확정, DEMO seed 데이터(카테고리별) 확장 완료, BC-MVP-002(네이버 쇼핑 API 클라이언트) 구현 완료 + BC-FIX-002(shared workspace resolve 오류) 반영 완료.

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
1) BC-MVP-003 (단, `pnpm typecheck/test/lint/build` 검증 통과 상태 유지 전제)
2) BC-MVP-004

## 주의사항
시크릿을 `NEXT_PUBLIC_*`에 넣지 말 것. 네이버 API는 백엔드에서만 호출. 검색 API와 네이버 API 연동은 아직 구현되지 않음.


## 참고 이력
- seed 오류 수정 이력: 초기 Codex 환경에서 seed/검증 실패 이력이 있었으며, 로컬 검증 세팅 보정(BC-SETUP-002)으로 정리됨.
- Codex 검증 상태: 이번 작업에서 `pnpm test/typecheck/lint/build`를 실행했고 결과는 작업 로그 기준으로 확인 필요. 실패 시 로컬 재검증 권장.
- BC-FIX-002: `apps/api`에서 `@babycompare/shared`를 해석하지 못하던 문제를 workspace dependency 추가(`apps/api`, `apps/web`) + `packages/shared`의 `main/types/exports`를 `dist` 기준으로 정렬 + 루트 스크립트에서 shared 선행 build 보장으로 수정함.
