import { describe, expect, it } from 'vitest';
import { POPULAR_KEYWORDS } from './PopularSearchChips';

describe('PopularSearchChips data', () => {
  it('contains all expected keywords', () => {
    expect(POPULAR_KEYWORDS).toEqual(['유모차', '카시트', '분유', '기저귀', '아기띠', '젖병', '체온계']);
  });
});
