# 07 API Contract
## Implemented
### GET /health
- Status: Implemented
- Response: `200 { "ok": true }`

## Planned
- GET /products (검색/정렬)
- GET /products/:id (상세)
- GET /popular-keywords

## Product 데이터 모델 요약 (DB)
- `id`: cuid PK
- `source`: `NAVER | DEMO | MANUAL`
- `externalId`: 소스 원본 식별자(nullable)
- `title`, `brand`, `maker`
- `category1~4`, `categoryPath`
- `price`, `imageUrl`, `productUrl`
- `seller`, `rating`, `reviewCount`, `description`
- `isVisible`, `lastSyncedAt`, `createdAt`, `updatedAt`
- 제약: `@@unique([source, externalId])`, `@unique(productUrl)`


## Internal (Not Public API)
- Naver client module (`apps/api/src/modules/naver`) implemented for server-side use only.
- Config: `NAVER_CLIENT_ID`, `NAVER_CLIENT_SECRET`, `NAVER_API_TIMEOUT_MS`(default 5000), `USE_DEMO_DATA`.
- Supports sort mapping (`relevance/sim`, `price_asc/asc`, `price_desc/dsc`), paging to `display/start`, title sanitize/decode, and Product-shape mapping.
- Public API remains `/health` only; `/products/search` and `/products/:id` are still Planned.
