import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { ProductsService } from './products.service';
import { NaverService } from '../naver/naver.service';
import { ProductsRepository } from './products.repository';

describe('ProductsService', () => {
  const repo = {
    searchFallback: vi.fn(), upsertNaverProduct: vi.fn(), insertSearchLog: vi.fn(), findVisibleById: vi.fn()
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

  it('returns product detail for visible product', async () => {
    (repo.findVisibleById as any).mockResolvedValue({
      id: 'cmowjd24l0002bmx5xpw7w6zu', source: 'DEMO', externalId: 'demo-1-003', title: '상품', brand: '브랜드', maker: '메이커', category1: 'a', category2: 'b', category3: null, category4: null, categoryPath: 'a > b', price: 1000, imageUrl: 'https://a', productUrl: 'https://b', seller: 'seller', rating: 4.5, reviewCount: 12, description: 'desc', isVisible: true, lastSyncedAt: new Date('2026-05-08T07:23:32.734Z'), createdAt: new Date('2026-05-08T06:30:25.797Z'), updatedAt: new Date('2026-05-08T07:23:32.735Z')
    });
    const result = await service.getProductDetail(' cmowjd24l0002bmx5xpw7w6zu ');
    expect(result.meta.source).toBe('DB');
    expect(result.item.productUrl).toBe('https://b');
    expect(result.item.imageUrl).toBe('https://a');
    expect(result.item.rating).toBe(4.5);
    expect(result.item.reviewCount).toBe(12);
    expect(result.item.description).toBe('desc');
    expect(result.item.createdAt).toMatch(/T/);
    expect(result.item.updatedAt).toMatch(/T/);
    expect(result.item.lastSyncedAt).toMatch(/T/);
  });

  it('throws NotFoundException when not found or invisible', async () => {
    (repo.findVisibleById as any).mockResolvedValue(null);
    await expect(service.getProductDetail('missing-id')).rejects.toBeInstanceOf(NotFoundException);
  });

  it('throws BadRequestException for blank id', async () => {
    await expect(service.getProductDetail('   ')).rejects.toBeInstanceOf(BadRequestException);
  });

  it('throws InternalServerErrorException for unexpected repository error', async () => {
    (repo.findVisibleById as any).mockRejectedValue(new Error('db down'));
    await expect(service.getProductDetail('cmowjd24l0002bmx5xpw7w6zu')).rejects.toBeInstanceOf(InternalServerErrorException);
  });
});
