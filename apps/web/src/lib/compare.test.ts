import { describe, expect, it } from 'vitest';
import { addCompareItem, COMPARE_MAX_ITEMS, normalizeCompareItem, parseCompareItems, removeCompareItem, serializeCompareItems } from './compare';

const sample = { id: '1', title: 't', source: 'DEMO' as const, price: 1000, productUrl: 'http://a' };

describe('compare utils', () => {
  it('parse null/invalid/non-array', () => {
    expect(parseCompareItems(null)).toEqual([]);
    expect(parseCompareItems('{')).toEqual([]);
    expect(parseCompareItems('{}')).toEqual([]);
  });
  it('filters invalid required fields', () => {
    expect(parseCompareItems(JSON.stringify([{ id: '1' }, sample])).length).toBe(1);
  });
  it('add duplicate/max limit', () => {
    expect(addCompareItem([sample], sample).added).toBe(false);
    const full = Array.from({ length: COMPARE_MAX_ITEMS }, (_, i) => ({ ...sample, id: String(i) }));
    expect(addCompareItem(full, { ...sample, id: 'x' }).reason).toBe('MAX_ITEMS');
  });
  it('remove by id', () => {
    expect(removeCompareItem([sample], '1')).toEqual([]);
  });
  it('serialize parse roundtrip', () => {
    expect(parseCompareItems(serializeCompareItems([sample]))).toEqual([{ ...sample, brand: null, maker: null, categoryPath: null, imageUrl: null, seller: null, rating: null, reviewCount: null, description: null }]);
  });
  it('normalize and bad price', () => {
    expect(normalizeCompareItem({ ...sample, price: Number.NaN }).price).toBe(0);
  });
});
