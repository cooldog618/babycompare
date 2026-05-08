import { describe, expect, it } from 'vitest';
import { DEMO_PRODUCTS } from '../prisma/demo-products';

const REQUIRED_CATEGORIES = ['유모차', '카시트', '분유', '기저귀', '아기띠', '젖병', '체온계'];

describe('DEMO_PRODUCTS', () => {
  it('contains at least 20 items', () => {
    expect(DEMO_PRODUCTS.length).toBeGreaterThanOrEqual(20);
  });

  it('contains at least 3 items for each required category', () => {
    for (const category of REQUIRED_CATEGORIES) {
      const count = DEMO_PRODUCTS.filter((p) => p.category2 === category).length;
      expect(count).toBeGreaterThanOrEqual(3);
    }
  });

  it('has unique externalId values', () => {
    const ids = DEMO_PRODUCTS.map((p) => p.externalId);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
