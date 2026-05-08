import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NaverNetworkError, NaverTimeoutError } from './naver.errors';
import { NaverService } from './naver.service';

describe('NaverService', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.restoreAllMocks();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('returns false when key is missing', () => {
    delete process.env.NAVER_CLIENT_ID;
    delete process.env.NAVER_CLIENT_SECRET;
    const service = new NaverService();
    expect(service.isConfigured()).toBe(false);
  });

  it('returns true when key exists', () => {
    process.env.NAVER_CLIENT_ID = 'id';
    process.env.NAVER_CLIENT_SECRET = 'secret';
    const service = new NaverService();
    expect(service.isConfigured()).toBe(true);
  });

  it('calls fetch with expected URL/headers and calculates start', async () => {
    process.env.NAVER_CLIENT_ID = 'id';
    process.env.NAVER_CLIENT_SECRET = 'secret';
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ total: 1, start: 41, display: 20, items: [] })
    });
    vi.stubGlobal('fetch', fetchMock);

    const service = new NaverService();
    const result = await service.searchShopping({ query: '유모차', sort: 'price_desc', page: 3, limit: 20 });

    expect(result.start).toBe(41);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, options] = fetchMock.mock.calls[0] as [URL, RequestInit];
    expect(url.toString()).toContain('query=%EC%9C%A0%EB%AA%A8%EC%B0%A8');
    expect(url.toString()).toContain('sort=dsc');
    expect(url.toString()).toContain('display=20');
    expect(url.toString()).toContain('start=41');
    expect(options.headers).toEqual({
      'X-Naver-Client-Id': 'id',
      'X-Naver-Client-Secret': 'secret'
    });
  });

  it('converts abort to timeout error', async () => {
    process.env.NAVER_CLIENT_ID = 'id';
    process.env.NAVER_CLIENT_SECRET = 'secret';
    process.env.NAVER_API_TIMEOUT_MS = '1';

    vi.stubGlobal(
      'fetch',
      vi.fn(async (_url, options) => {
        const signal = options?.signal as AbortSignal;
        await new Promise((_, reject) => signal.addEventListener('abort', () => reject(new DOMException('aborted', 'AbortError'))));
      })
    );

    const service = new NaverService();
    await expect(service.searchShopping({ query: 'a', sort: 'relevance' })).rejects.toBeInstanceOf(NaverTimeoutError);
  });

  it('converts fetch failure to network error', async () => {
    process.env.NAVER_CLIENT_ID = 'id';
    process.env.NAVER_CLIENT_SECRET = 'secret';
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('socket hang up')));
    const service = new NaverService();
    await expect(service.searchShopping({ query: 'a', sort: 'relevance' })).rejects.toBeInstanceOf(NaverNetworkError);
  });
});
