import { describe, expect, it, vi, beforeEach } from 'vitest';
import { ProductsService } from './products.service';
import { NaverService } from '../naver/naver.service';
import { ProductsRepository } from './products.repository';

describe('ProductsService', () => {
  const repo = {
    searchFallback: vi.fn(), upsertNaverProduct: vi.fn(), insertSearchLog: vi.fn()
  } as unknown as ProductsRepository;
  const naver = { isConfigured: vi.fn(), searchShopping: vi.fn() } as unknown as NaverService;
  const service = new ProductsService(repo, naver);

  beforeEach(() => { vi.clearAllMocks(); delete process.env.USE_DEMO_DATA; });

  it('fallbacks when USE_DEMO_DATA=true', async () => {
    process.env.USE_DEMO_DATA = 'true';
    (repo.searchFallback as any).mockResolvedValue({ items: [], total: 0 });
    await service.search({ query: '유모차', sort: 'relevance', page: 1, limit: 20 });
    expect(naver.searchShopping).not.toHaveBeenCalled();
  });

  it('returns naver success', async () => {
    (naver.isConfigured as any).mockReturnValue(true);
    (naver.searchShopping as any).mockResolvedValue({ total: 1, items: [{ externalId: '1' }] });
    (repo.upsertNaverProduct as any).mockResolvedValue({ id: 'p1', source: 'NAVER', title: 't', price: 1, productUrl: 'u', isVisible: true, createdAt: new Date(), updatedAt: new Date(), externalId: null, brand: null, maker: null, category1: null, category2: null, category3: null, category4: null, categoryPath: null, imageUrl: null, seller: null, rating: null, reviewCount: null, description: null, lastSyncedAt: null });
    const result = await service.search({ query: '유모차', sort: 'relevance', page: 1, limit: 20 });
    expect(result.meta.source).toBe('NAVER');
  });
});
