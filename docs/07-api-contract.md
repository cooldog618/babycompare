# 07 API Contract
## Implemented
### GET /health
- Status: Implemented
- Response: `200 { "ok": true }`

### GET /products/search
- Status: Implemented
- Query: `query`(required), `sort`(relevance|price_asc|price_desc), `page`(default 1), `limit`(default 20, max 100)
- Validation: empty query/invalid sort/page/limit -> 400
- Response: `{ items: Product[], meta: { query, sort, page, limit, total, source, fallback, fallbackReason? } }`
- Source strategy: `USE_DEMO_DATA=true` => demo DB fallback, otherwise Naver configured then Naver-first with DB upsert, failure => fallback

## Planned
- GET /products/:id (상세)
- GET /popular-keywords
