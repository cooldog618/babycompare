import { describe, expect, it } from 'vitest';
import { mapProductDetailResponse } from './products.mapper';

describe('products.mapper', () => {
  it('maps prisma product to ProductDetailResponse and handles nullable fields', () => {
    const response = mapProductDetailResponse({
      id: 'p1',
      source: 'DEMO',
      externalId: null,
      title: 't',
      brand: null,
      maker: null,
      category1: null,
      category2: null,
      category3: null,
      category4: null,
      categoryPath: null,
      price: 123,
      imageUrl: null,
      productUrl: 'https://example.com',
      seller: null,
      rating: null,
      reviewCount: null,
      description: null,
      isVisible: true,
      lastSyncedAt: null,
      createdAt: new Date('2026-01-01T00:00:00.000Z'),
      updatedAt: new Date('2026-01-02T00:00:00.000Z')
    });

    expect(response.meta.source).toBe('DB');
    expect(response.item.lastSyncedAt).toBeNull();
    expect(response.item.createdAt).toBe('2026-01-01T00:00:00.000Z');
  });
});
