# 10 Codex Handoff
## 현재 상태
- Product 모델 및 demo seed 완료
- Naver Shopping client 완료
- shared workspace resolution 이슈 해결 완료
- BC-MVP-003 상품 검색 API 구현 완료 (`GET /products/search`)
- BC-MVP-004 상품 상세 API 구현 완료 (`GET /products/:id`)
- BC-MVP-005 홈/검색 페이지 구현 완료
- BC-MVP-014 상품 상세 프론트 페이지 구현 완료 (`/products/[id]` -> `GET /products/:id` 연동)
- BC-MVP-007 비교 localStorage hook 및 검색/상세 비교 추가/제거 버튼 연동 완료
- BC-MVP-008 비교 페이지 구현 완료 (empty/1개/2개+ 상태 UI, 제거/전체 비우기, localStorage 연동)
- BC-MVP-009 최저가 계산 및 표시 완료 (유효 가격 기준 최저가 배지/차액/요약)
- BC-MVP-006 상품 카드 고도화 완료 (fallback/버튼 배치/접근성/모바일 가독성 개선)
- BC-MVP-010 외부 구매 링크 정책 적용 완료 (새 탭 + noopener noreferrer + 안내 라벨)
- 현재 단계: BC-MVP-011 MVP 확인용 admin 구현 완료, BC-MVP-012 테스트 보강/QA 안정화 진행 중
- BC-MVP-013 README 실행/시연 가이드 정리 완료

## 다음 추천 작업
1) BC-MVP-012 테스트 보강
2) MVP QA 및 릴리즈 체크리스트 정리


## BC-MVP-012 진행 메모
- 검색/상세 API, 홈/검색/상세 프론트, 비교(localStorage)/비교 페이지/최저가 표시, 상품 카드 고도화, MVP admin 구현까지 완료된 상태에서 테스트 보강과 검증 파이프라인 안정화 작업 진행.
- 로컬 검증 기준: `pnpm db:generate` → `pnpm db:seed` → `pnpm test` → `pnpm typecheck` → `pnpm lint` → `pnpm build`.
- Codex/CI 환경에서 Prisma engine 다운로드 403이 발생할 수 있으며, 이 경우 네트워크/프록시 이슈로 코드 결함과 구분 필요.

## 다음 추천 작업
1) MVP QA 완료 처리
2) 릴리즈 체크리스트 최종 점검
