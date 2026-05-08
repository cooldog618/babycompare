# 02 Architecture
## 모노레포 구조
- `apps/web`: 사용자 UI
- `apps/api`: REST API, 외부 API 연동, DB 접근
- `packages/shared`: 공통 타입/상수

## 데이터 흐름
1. Web가 API 호출
2. API가 DB 조회 또는 네이버 쇼핑 API 호출
3. API가 정제된 응답 반환

## 원칙
네이버 쇼핑 API는 백엔드(`apps/api`)에서만 호출한다.
