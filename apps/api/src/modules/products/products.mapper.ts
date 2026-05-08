import { type Product, type ProductDetailResponse, type SearchProductsResponse } from '@babycompare/shared';
import { type Product as DbProduct } from '@prisma/client';

export function mapProductEntity(entity: DbProduct): Product {
  return {
    ...entity,
    lastSyncedAt: entity.lastSyncedAt?.toISOString() ?? null,
    createdAt: entity.createdAt.toISOString(),
    updatedAt: entity.updatedAt.toISOString()
  };
}

export function mapProductDetailResponse(entity: DbProduct): ProductDetailResponse {
  return {
    item: mapProductEntity(entity),
    meta: {
      source: 'DB'
    }
  };
}

export function buildSearchResponse(input: SearchProductsResponse): SearchProductsResponse {
  return input;
}
