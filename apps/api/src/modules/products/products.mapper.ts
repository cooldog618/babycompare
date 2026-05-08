import { type Product, type SearchProductsResponse } from '@babycompare/shared';
import { type Product as DbProduct } from '@prisma/client';

export function mapProductEntity(entity: DbProduct): Product {
  return {
    ...entity,
    lastSyncedAt: entity.lastSyncedAt?.toISOString() ?? null,
    createdAt: entity.createdAt.toISOString(),
    updatedAt: entity.updatedAt.toISOString()
  };
}

export function buildSearchResponse(input: SearchProductsResponse): SearchProductsResponse {
  return input;
}
