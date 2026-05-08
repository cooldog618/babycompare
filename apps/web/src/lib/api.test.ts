import { describe, expect, it, vi } from 'vitest';
import { ApiError, buildSearchProductsUrl, searchProducts } from './api';

describe('api client', () => {
  it('builds search URL with params', () => {
    const url = buildSearchProductsUrl({ query: '유모차', sort: 'relevance', page: 1, limit: 20 });
    expect(url).toContain('/products/search?');
    expect(url).toContain('query=%EC%9C%A0%EB%AA%A8%EC%B0%A8');
    expect(url).toContain('sort=relevance');
    expect(url).toContain('page=1');
    expect(url).toContain('limit=20');
  });

  it('throws friendly error on non-2xx', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }));
    await expect(searchProducts({ query: '유모차', sort: 'relevance', page: 1, limit: 20 })).rejects.toBeInstanceOf(ApiError);
    vi.unstubAllGlobals();
  });
});
