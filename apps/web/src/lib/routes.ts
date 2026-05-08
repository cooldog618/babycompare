import type { SearchSort } from '@babycompare/shared';

export const DEFAULT_SORT: SearchSort = 'relevance';
export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 20;

export function buildSearchRoute(query: string, sort: SearchSort = DEFAULT_SORT, page = DEFAULT_PAGE): string {
  const params = new URLSearchParams({ q: query.trim(), sort, page: String(page) });
  return `/search?${params.toString()}`;
}

export function productDetailPath(id: string): string {
  return `/products/${encodeURIComponent(id)}`;
}

export function parseSort(value?: string): SearchSort {
  if (value === 'price_asc' || value === 'price_desc' || value === 'relevance') {
    return value;
  }
  return DEFAULT_SORT;
}

export function parsePage(value?: string): number {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 ? page : DEFAULT_PAGE;
}
