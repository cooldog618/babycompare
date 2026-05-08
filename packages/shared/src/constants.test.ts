import { describe, expect, it } from 'vitest';
import { POPULAR_SEARCH_TERMS } from './constants';

describe('POPULAR_SEARCH_TERMS', () => {
  it('contains expected default keywords', () => {
    expect(POPULAR_SEARCH_TERMS).toEqual(['유모차', '카시트', '분유', '기저귀', '아기띠', '젖병', '체온계']);
  });
});
