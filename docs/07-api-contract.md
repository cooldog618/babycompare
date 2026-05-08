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
