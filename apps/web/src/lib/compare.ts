import type { Product, ProductDetail, ProductListItem, ProductSource } from '@babycompare/shared';

export const COMPARE_STORAGE_KEY = 'babycompare:compare';
export const COMPARE_MAX_ITEMS = 5;

export type CompareItem = {
  id: string;
  title: string;
  source: ProductSource;
  brand?: string | null;
  maker?: string | null;
  categoryPath?: string | null;
  price: number;
  imageUrl?: string | null;
  productUrl: string;
  seller?: string | null;
  rating?: number | null;
  reviewCount?: number | null;
  description?: string | null;
};

export type LowestPriceSummary = {
  lowestPrice: number | null;
  lowestItemIds: string[];
  hasComparablePrice: boolean;
};

export type ComparePriceState = {
  isLowest: boolean;
  differenceFromLowest: number | null;
};

type ProductInput = Product | ProductDetail | ProductListItem | CompareItem;

function sanitizeCompareItem(raw: unknown): CompareItem | null {
  if (!raw || typeof raw !== 'object') return null;
  const item = raw as Partial<CompareItem>;
  if (!item.id || !item.title || !item.productUrl || !item.source) return null;

  const priceNum = typeof item.price === 'number' && Number.isFinite(item.price) ? item.price : 0;

  return {
    id: item.id,
    title: item.title,
    source: item.source,
    brand: item.brand ?? null,
    maker: item.maker ?? null,
    categoryPath: item.categoryPath ?? null,
    price: priceNum,
    imageUrl: item.imageUrl ?? null,
    productUrl: item.productUrl,
    seller: item.seller ?? null,
    rating: typeof item.rating === 'number' ? item.rating : null,
    reviewCount: typeof item.reviewCount === 'number' ? item.reviewCount : null,
    description: item.description ?? null
  };
}

function isValidComparablePrice(price: number): boolean {
  return Number.isFinite(price) && price > 0;
}

export function getLowestPriceSummary(items: CompareItem[]): LowestPriceSummary {
  const validItems = items.filter((item) => isValidComparablePrice(item.price));

  if (validItems.length === 0) {
    return {
      lowestPrice: null,
      lowestItemIds: [],
      hasComparablePrice: false
    };
  }

  const lowestPrice = validItems.reduce((minimum, item) => Math.min(minimum, item.price), Number.POSITIVE_INFINITY);
  const lowestItemIds = validItems.filter((item) => item.price === lowestPrice).map((item) => item.id);

  return {
    lowestPrice,
    lowestItemIds,
    hasComparablePrice: true
  };
}

export function getComparePriceState(item: CompareItem, summary: LowestPriceSummary): ComparePriceState {
  if (!summary.hasComparablePrice || summary.lowestPrice === null || !isValidComparablePrice(item.price)) {
    return {
      isLowest: false,
      differenceFromLowest: null
    };
  }

  if (summary.lowestItemIds.includes(item.id)) {
    return {
      isLowest: true,
      differenceFromLowest: 0
    };
  }

  return {
    isLowest: false,
    differenceFromLowest: Math.max(item.price - summary.lowestPrice, 0)
  };
}

export function normalizeCompareItem(product: ProductInput): CompareItem {
  return sanitizeCompareItem(product) ?? {
    id: '', title: '', source: 'DEMO', price: 0, productUrl: ''
  };
}

export function parseCompareItems(raw: string | null): CompareItem[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const deduped = new Map<string, CompareItem>();
    for (const candidate of parsed) {
      const item = sanitizeCompareItem(candidate);
      if (!item) continue;
      if (!deduped.has(item.id)) deduped.set(item.id, item);
      if (deduped.size >= COMPARE_MAX_ITEMS) break;
    }
    return [...deduped.values()];
  } catch {
    return [];
  }
}

export function serializeCompareItems(items: CompareItem[]): string {
  return JSON.stringify(items.slice(0, COMPARE_MAX_ITEMS));
}

export function isInCompareList(items: CompareItem[], productId: string): boolean {
  return items.some((item) => item.id === productId);
}

export function addCompareItem(items: CompareItem[], item: CompareItem): { items: CompareItem[]; added: boolean; reason?: 'DUPLICATE' | 'MAX_ITEMS' } {
  if (isInCompareList(items, item.id)) return { items, added: false, reason: 'DUPLICATE' };
  if (items.length >= COMPARE_MAX_ITEMS) return { items, added: false, reason: 'MAX_ITEMS' };
  return { items: [...items, item], added: true };
}

export function removeCompareItem(items: CompareItem[], productId: string): CompareItem[] {
  return items.filter((item) => item.id !== productId);
}

export function clearCompareItems(): CompareItem[] {
  return [];
}
