import { BadRequestException } from '@nestjs/common';
import { type SearchSort } from '@babycompare/shared';

export const MAX_QUERY_LENGTH = 100;
export const MAX_PRODUCT_ID_LENGTH = 191;

export type SearchProductsRequest = {
  query: string;
  sort: SearchSort;
  page: number;
  limit: number;
};

export function parseSearchProductsQuery(input: Record<string, unknown>): SearchProductsRequest {
  const rawQuery = typeof input.query === 'string' ? input.query : '';
  const query = rawQuery.trim();
  if (!query) throw new BadRequestException('query is required');
  if (query.length > MAX_QUERY_LENGTH) throw new BadRequestException(`query must be <= ${MAX_QUERY_LENGTH}`);

  const sort = (input.sort ?? 'relevance') as SearchSort;
  if (!['relevance', 'price_asc', 'price_desc'].includes(sort)) {
    throw new BadRequestException('invalid sort');
  }

  const page = parsePositiveInt(input.page, 1, 'page');
  const limit = parsePositiveInt(input.limit, 20, 'limit');
  if (limit > 100) throw new BadRequestException('limit must be <= 100');

  return { query, sort, page, limit };
}

export function parseProductId(rawId: string): string {
  const id = rawId.trim();
  if (!id) throw new BadRequestException('id is required');
  if (id.length > MAX_PRODUCT_ID_LENGTH) {
    throw new BadRequestException(`id must be <= ${MAX_PRODUCT_ID_LENGTH}`);
  }

  return id;
}

function parsePositiveInt(value: unknown, defaultValue: number, name: string): number {
  if (value === undefined) return defaultValue;
  const num = Number(value);
  if (!Number.isInteger(num) || num < 1) throw new BadRequestException(`${name} must be a positive integer`);
  return num;
}
