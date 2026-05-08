import { describe, expect, it } from 'vitest';
import { buildCategoryPath } from './utils';

describe('buildCategoryPath', () => {
  it('joins category segments with separator', () => {
    expect(buildCategoryPath('육아용품', '유모차', '절충형', 'A라인')).toBe('육아용품 > 유모차 > 절충형 > A라인');
  });

  it('omits empty values', () => {
    expect(buildCategoryPath('육아용품', '', undefined, 'A라인')).toBe('육아용품 > A라인');
  });
});
