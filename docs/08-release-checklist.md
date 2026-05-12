# 08 Release Checklist

## Setup
- [ ] `pnpm install`
- [ ] `cp .env.example .env`
- [ ] `pnpm db:migrate`
- [ ] `pnpm db:seed`
- [ ] `pnpm dev`

## Public Web
- [ ] 홈 화면 접속
- [ ] 인기 검색어 클릭
- [ ] 직접 검색
- [ ] 정렬 변경
- [ ] 검색 결과 fallback 안내 확인
- [ ] 상품 상세 페이지 이동
- [ ] 구매하기 새 탭
- [ ] 비교 추가/제거
- [ ] 최대 5개 제한
- [ ] `/compare` 비교 페이지
- [ ] 최저가 표시
- [ ] 최저가 상품 제거 후 재계산
- [ ] 전체 비우기
- [ ] 새로고침 후 localStorage 유지

## API
- [ ] `GET /health`
- [ ] `GET /products/search`
- [ ] `GET /products/:id`
- [ ] 존재하지 않는 상세 404
- [ ] admin token 없는 `/admin` API 401
- [ ] admin token 있는 `/admin` API 200

## Admin
- [ ] `/admin` Basic Auth 요구
- [ ] 올바른 계정으로 접속
- [ ] 대시보드 통계 표시
- [ ] 상품 목록 표시
- [ ] `q/source/visible` 필터
- [ ] 상품 수정
- [ ] 숨김 처리
- [ ] 사용자 검색에서 숨김 상품 미노출
- [ ] 숨김 상품 상세 404
- [ ] 복구 후 다시 노출
- [ ] `ADMIN_API_TOKEN` 브라우저 노출 없음 확인

## Security
- [ ] `NAVER_CLIENT_SECRET` 브라우저 번들/응답 노출 없음
- [ ] `ADMIN_API_TOKEN` 브라우저 번들/응답 노출 없음
- [ ] 외부 구매 링크 `target`/`rel` 정책 확인
- [ ] default admin password 운영 배포 금지
