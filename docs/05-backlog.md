# 05 Backlog
| ID | Milestone | Area | Title | Priority | Status | Effort | Acceptance Criteria |
|---|---|---|---|---|---|---|---|
| BC-SETUP-001 | M0 | Platform | 프로젝트 부트스트랩 | P0 | Done | M | 모노레포/문서/최소 앱 동작 구성 |
| BC-SETUP-002 | M0 | Platform | 로컬 검증 세팅 보정 | P0 | Done | S | lint/typecheck/test/build가 로컬에서 실행 가능 |
| BC-MVP-001 | M1 | API/DB | DB Product 모델 및 demo seed 확장 | P0 | Done | M | Product 스키마 확장 및 seed 데이터 제공 |
| BC-MVP-002 | M1 | API | 네이버 쇼핑 API 클라이언트 구현 | P0 | Done | M | 키 기반 호출 + 에러 처리 + clean install 후 workspace typecheck 통과 |
| BC-FIX-002 | M1 | Platform | `@babycompare/shared` workspace resolve 오류 수정 | P0 | Done | S | clean install 직후 `pnpm typecheck/build/test`에서 shared import 오류가 재현되지 않음 |
| BC-MVP-003 | M1 | API | 상품 검색 API 구현 | P0 | Done | L | 검색/정렬/페이징 동작 |
| BC-MVP-004 | M1 | API | 상품 상세 API 구현 | P1 | Done | M | `GET /products/:id` 상세 데이터 반환 |
| BC-MVP-005 | M1 | Web | 홈/검색 페이지 구현 | P0 | Done | M | 홈/검색 화면 및 API 연동 완료 |
| BC-MVP-006 | M1 | Web | 상품 카드 고도화 | P1 | Done | S | 가격/브랜드/링크 표시 |
| BC-MVP-007 | M1 | Web | 비교 localStorage hook 구현 | P1 | Done | M | 최대 5개 저장/해제 |
| BC-MVP-008 | M1 | Web | 비교 페이지 구현 | P1 | Done | M | empty/1개/2개+ 상태 비교 UI 및 제거/전체 비우기 동작 |
| BC-MVP-009 | M1 | Shared/Web | 최저가 계산 및 표시 | P1 | Done | S | 최저가 하이라이트 |
| BC-MVP-010 | M1 | Web | 네이버 구매 링크 처리 | P2 | Done | S | 외부 링크 정책 반영 |
| BC-MVP-011 | M2 | Admin | MVP 확인용 admin 화면 구현 | P2 | Done | M | 최소 조회/검증 UI |
| BC-MVP-012 | M2 | QA | 테스트 보강 | P1 | Todo | M | 단위/통합 테스트 추가 |
| BC-MVP-013 | M2 | Docs | README 실행 가이드 정리 | P1 | Todo | S | 운영 기준 문서화 |

| BC-FIX-001 | M1 | Platform | seed 실행 오류 수정 | P0 | Done | S | seed 실행 안정화 |

| BC-MVP-014 | M2 | Web | 상품 상세 프론트 페이지 구현 | P1 | Done | M | `/products/[id]`에서 API 연동 상세 화면 제공 |
