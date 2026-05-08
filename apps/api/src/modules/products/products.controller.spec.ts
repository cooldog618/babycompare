import { describe, expect, it } from 'vitest';
import { parseSearchProductsQuery } from './products.dto';

describe('parseSearchProductsQuery', () => {
  it('throws on empty query', () => {
    expect(() => parseSearchProductsQuery({ query: '   ' })).toThrowError();
  });

  it('throws on invalid sort', () => {
    expect(() => parseSearchProductsQuery({ query: 'a', sort: 'bad' })).toThrowError();
  });
});
