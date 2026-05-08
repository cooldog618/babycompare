# 09 Known Limitations
- 비교 페이지는 현재 placeholder 수준이며 상세 비교 테이블은 미구현 (BC-MVP-008 예정)
- 최저가 표시 미구현 (BC-MVP-009 예정)
- 정식 admin 미구현
- 네이버 API 오류/미설정 시 `/products/search`는 demo/manual DB fallback 동작

## Resolved
- BC-FIX-001: seed 실행 오류 수정
- BC-FIX-002: `@babycompare/shared` workspace resolution 오류 수정
- BC-MVP-005: 홈/검색 페이지 구현 완료
- BC-MVP-014: 상품 상세 프론트 페이지 구현 완료
- BC-MVP-007: 비교 localStorage hook 및 비교 추가/제거 버튼 연동 완료
