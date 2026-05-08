import { type Product, type SearchSort } from '@babycompare/shared';

export const NAVER_SORT_MAP: Record<SearchSort, NaverSort> = {
  relevance: 'sim',
  price_asc: 'asc',
  price_desc: 'dsc'
};

export type NaverSort = 'sim' | 'asc' | 'dsc';

export interface NaverShoppingSearchParams {
  query: string;
  sort: SearchSort;
  page?: number;
  limit?: number;
}

export interface NaverShoppingItem {
  title: string;
  link: string;
  image: string;
  lprice: string;
  mallName: string;
  productId: string;
  maker: string;
  brand: string;
  category1: string;
  category2: string;
  category3: string;
  category4: string;
}

export interface NaverShoppingSearchApiResponse {
  total: number;
  start: number;
  display: number;
  items: NaverShoppingItem[];
}

export interface NaverShoppingSearchResult {
  total: number;
  start: number;
  display: number;
  items: Product[];
  raw?: unknown;
}
