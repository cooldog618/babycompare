import { afterEach, describe, expect, it, vi } from 'vitest';
import { ApiError, ApiNotFoundError, buildProductDetailUrl, buildSearchProductsUrl, fetchProductDetail, searchProducts } from './api';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('api client', () => {
  it('builds search URL with params', () => {
    const url = buildSearchProductsUrl({ query: '유모차', sort: 'relevance', page: 1, limit: 20 });
    expect(url).toContain('/products/search?');
    expect(url).toContain('query=%EC%9C%A0%EB%AA%A8%EC%B0%A8');
    expect(url).toContain('sort=relevance');
    expect(url).toContain('page=1');
    expect(url).toContain('limit=20');
  });

  it('builds product detail URL with encoded id', () => {
    expect(buildProductDetailUrl('abc/def?g')).toContain('/products/abc%2Fdef%3Fg');
  });

  it('returns detail on 200', async () => {
    const payload = { item: { id: '1' }, meta: { source: 'DB' } };
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => payload }));
    await expect(fetchProductDetail('1')).resolves.toEqual(payload);
  });

  it('throws not found on 404', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 404 }));
    await expect(fetchProductDetail('missing')).rejects.toBeInstanceOf(ApiNotFoundError);
  });

  it('throws friendly error on detail non-2xx', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }));
    await expect(fetchProductDetail('x')).rejects.toBeInstanceOf(ApiError);
  });

  it('throws friendly error on detail fetch failure', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network')));
    await expect(fetchProductDetail('x')).rejects.toBeInstanceOf(ApiError);
  });

  it('throws friendly error on non-2xx search', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }));
    await expect(searchProducts({ query: '유모차', sort: 'relevance', page: 1, limit: 20 })).rejects.toBeInstanceOf(ApiError);
  });
});
