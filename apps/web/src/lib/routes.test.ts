import { describe, expect, it } from 'vitest';
import { buildSearchRoute, parseSort } from './routes';

describe('routes helpers', () => {
  it('builds search route', () => {
    expect(buildSearchRoute('유모차', 'relevance', 1)).toBe('/search?q=%EC%9C%A0%EB%AA%A8%EC%B0%A8&sort=relevance&page=1');
  });

  it('normalizes invalid sort to relevance', () => {
    expect(parseSort('invalid')).toBe('relevance');
  });
});
