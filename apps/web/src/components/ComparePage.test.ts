import { describe, expect, it } from 'vitest';
import { getCompareViewState } from './ComparePage';

describe('getCompareViewState', () => {
  it('returns empty when count is 0', () => {
    expect(getCompareViewState(0)).toBe('empty');
  });

  it('returns single when count is 1', () => {
    expect(getCompareViewState(1)).toBe('single');
  });

  it('returns multiple when count is 2 or more', () => {
    expect(getCompareViewState(2)).toBe('multiple');
  });
});
