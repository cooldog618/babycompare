import { describe, expect, it } from 'vitest';
import { formatPrice, formatPriceDifference, withFallback } from './format';

describe('format helpers', () => {
  it('returns fallback for invalid or zero price', () => {
    expect(formatPrice(0)).toBe('가격 정보 없음');
    expect(formatPrice(Number.NaN)).toBe('가격 정보 없음');
    expect(formatPrice(null)).toBe('가격 정보 없음');
  });

  it('formats price difference', () => {
    expect(formatPriceDifference(null)).toBe('가격 비교 불가');
    expect(formatPriceDifference(0)).toBe('최저가');
    expect(formatPriceDifference(7000)).toBe('최저가보다 7,000원 높음');
  });

  it('applies string fallback', () => {
    expect(withFallback('', '브랜드 정보 없음')).toBe('브랜드 정보 없음');
    expect(withFallback('  ', '브랜드 정보 없음')).toBe('브랜드 정보 없음');
    expect(withFallback('브랜드A', '브랜드 정보 없음')).toBe('브랜드A');
  });
});
