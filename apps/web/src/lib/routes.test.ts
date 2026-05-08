import { describe, expect, it } from 'vitest';
import { buildSearchRoute, parseSort, productDetailPath } from './routes';

describe('routes helpers', () => {
  it('builds search route', () => {
    expect(buildSearchRoute('유모차', 'relevance', 1)).toBe('/search?q=%EC%9C%A0%EB%AA%A8%EC%B0%A8&sort=relevance&page=1');
  });

  it('builds product detail route', () => {
    expect(productDetailPath('abc/def?g')).toBe('/products/abc%2Fdef%3Fg');
  });

  it('normalizes invalid sort to relevance', () => {
    expect(parseSort('invalid')).toBe('relevance');
  });
});
