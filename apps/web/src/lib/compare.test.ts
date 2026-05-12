import { describe, expect, it } from 'vitest';
import {
  addCompareItem,
  COMPARE_MAX_ITEMS,
  getComparePriceState,
  getLowestPriceSummary,
  normalizeCompareItem,
  parseCompareItems,
  removeCompareItem,
  serializeCompareItems
} from './compare';

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

  it('lowest summary returns null for empty and all invalid prices', () => {
    expect(getLowestPriceSummary([]).lowestPrice).toBeNull();
    expect(getLowestPriceSummary([{ ...sample, price: 0 }, { ...sample, id: '2', price: -100 }]).lowestPrice).toBeNull();
  });

  it('lowest summary calculates lowest and supports ties', () => {
    const items = [
      { ...sample, id: '1', price: 9000 },
      { ...sample, id: '2', price: 7000 },
      { ...sample, id: '3', price: 7000 }
    ];
    const summary = getLowestPriceSummary(items);
    expect(summary.lowestPrice).toBe(7000);
    expect(summary.lowestItemIds).toEqual(['2', '3']);
    expect(summary.hasComparablePrice).toBe(true);
  });

  it('lowest summary excludes NaN/negative/zero', () => {
    const items = [
      { ...sample, id: '1', price: Number.NaN },
      { ...sample, id: '2', price: -3000 },
      { ...sample, id: '3', price: 0 },
      { ...sample, id: '4', price: 4500 }
    ];
    const summary = getLowestPriceSummary(items);
    expect(summary.lowestPrice).toBe(4500);
    expect(summary.lowestItemIds).toEqual(['4']);
  });

  it('compare price state handles lowest, non-lowest, invalid and no lowest', () => {
    const summary = getLowestPriceSummary([{ ...sample, id: 'a', price: 1000 }, { ...sample, id: 'b', price: 4000 }]);
    expect(getComparePriceState({ ...sample, id: 'a', price: 1000 }, summary)).toEqual({ isLowest: true, differenceFromLowest: 0 });
    expect(getComparePriceState({ ...sample, id: 'b', price: 4000 }, summary)).toEqual({ isLowest: false, differenceFromLowest: 3000 });
    expect(getComparePriceState({ ...sample, id: 'c', price: 0 }, summary)).toEqual({ isLowest: false, differenceFromLowest: null });

    const none = getLowestPriceSummary([{ ...sample, id: 'x', price: 0 }]);
    expect(getComparePriceState({ ...sample, id: 'x', price: 0 }, none)).toEqual({ isLowest: false, differenceFromLowest: null });
  });
});
