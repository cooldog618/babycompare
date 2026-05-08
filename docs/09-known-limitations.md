# 09 Known Limitations
- 검색 기능 미구현
- 네이버 API 미연동
- 비교 기능 미구현
- 검색/상세 API 미구현
- 정식 admin 미구현

- `/products/search` 공개 API는 아직 미구현이며, 네이버 API 키가 있어도 아직 공개 검색 API와 연결되지 않음

## Resolved
- BC-FIX-002: `apps/api`의 `@babycompare/shared` workspace resolve 오류를 수정해 clean install 이후에도 shared import가 안정적으로 해석되도록 정리함.
