import { describe, expect, it } from 'vitest';
import { POPULAR_SEARCH_TERMS } from './constants';

describe('POPULAR_SEARCH_TERMS', () => {
  it('contains 7 default keywords', () => {
    expect(POPULAR_SEARCH_TERMS).toHaveLength(7);
  });
});
