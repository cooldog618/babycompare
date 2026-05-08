export type ProductSource = 'NAVER' | 'DEMO' | 'MANUAL';

export type SearchSort = 'relevance' | 'price_asc' | 'price_desc';

export interface Product {
  id: string;
  source: ProductSource;
  externalId?: string | null;
  title: string;
  brand?: string | null;
  maker?: string | null;
  category1?: string | null;
  category2?: string | null;
  category3?: string | null;
  category4?: string | null;
  categoryPath?: string | null;
  price: number;
  imageUrl?: string | null;
  productUrl: string;
  seller?: string | null;
  rating?: number | null;
  reviewCount?: number | null;
  description?: string | null;
  isVisible: boolean;
  lastSyncedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export type ProductListItem = Product;
export type ProductDetail = Product;

export interface SearchProductsQuery {
  query: string;
  sort?: SearchSort;
  page?: number;
  pageSize?: number;
}

export interface SearchProductsResponse {
  items: ProductListItem[];
  total: number;
  page: number;
  pageSize: number;
}
