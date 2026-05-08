export interface Product {
  id: string;
  source: 'naver' | 'demo';
  sourceId?: string;
  title: string;
  brand?: string;
  category: string;
  imageUrl?: string;
  price: number;
  originalUrl?: string;
  rating?: number;
  reviewCount?: number;
  createdAt?: string;
  updatedAt?: string;
}
