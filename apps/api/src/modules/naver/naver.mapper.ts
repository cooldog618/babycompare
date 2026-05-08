import { type Product } from '@babycompare/shared';
import { NaverMappingError } from './naver.errors';
import { type NaverShoppingItem } from './naver.types';

function stripHtmlTagAndDecode(value: string): string {
  const noTags = value.replace(/<[^>]+>/g, '');
  return noTags
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function safePrice(value: string): number {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function mapNaverItemToProduct(item: NaverShoppingItem): Product {
  if (!item || !item.title || !item.link) {
    throw new NaverMappingError('Invalid Naver item schema');
  }

  const now = new Date().toISOString();
  const categoryPath = [item.category1, item.category2, item.category3, item.category4]
    .filter((category) => Boolean(category?.trim()))
    .join(' > ');

  return {
    id: `naver:${item.productId || item.link}`,
    source: 'NAVER',
    externalId: item.productId || null,
    title: stripHtmlTagAndDecode(item.title),
    brand: item.brand?.trim() || item.maker?.trim() || null,
    maker: item.maker?.trim() || null,
    category1: item.category1 || null,
    category2: item.category2 || null,
    category3: item.category3 || null,
    category4: item.category4 || null,
    categoryPath: categoryPath || null,
    price: safePrice(item.lprice),
    imageUrl: item.image || null,
    productUrl: item.link,
    seller: item.mallName || null,
    rating: null,
    reviewCount: null,
    description: null,
    isVisible: true,
    lastSyncedAt: now,
    createdAt: now,
    updatedAt: now
  };
}
