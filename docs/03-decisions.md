# 03 Decisions (ADR)

## ADR-001 Node.js 22.x 사용
- Status: Accepted
- Context: 장기 LTS와 최신 생태계 호환 필요
- Decision: Node.js 22.x 사용

## ADR-002 pnpm 모노레포 사용
- Status: Accepted
- Context: web/api/shared 동시 관리 필요
- Decision: pnpm workspace 기반 모노레포 채택

## ADR-003 SQLite + Prisma 사용
- Status: Accepted
- Context: 초기 개발 속도/로컬 편의성
- Decision: Prisma v6 + SQLite 사용

## ADR-004 리뷰/상세페이지 크롤링 미구현
- Status: Accepted
- Context: 정책/안정성/유지보수 비용
- Decision: MVP에서 크롤링 구현하지 않음

## ADR-005 정식 관리자 페이지는 MVP 제외
- Status: Accepted
- Context: 핵심 사용자 기능 우선
- Decision: 정식 admin은 MVP 제외, 단 MVP 확인용 `/admin` 최소 화면은 별도 작업으로 가능
