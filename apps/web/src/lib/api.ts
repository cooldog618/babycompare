import type { SearchProductsResponse, SearchSort } from '@babycompare/shared';

const DEFAULT_API_BASE_URL = 'http://localhost:4000';

export class ApiError extends Error {
  constructor(message: string, readonly status?: number) {
    super(message);
    this.name = 'ApiError';
  }
}

export function getApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_BASE_URL || DEFAULT_API_BASE_URL;
}

export function buildSearchProductsUrl(params: { query: string; sort: SearchSort; page: number; limit: number }): string {
  const search = new URLSearchParams({
    query: params.query,
    sort: params.sort,
    page: String(params.page),
    limit: String(params.limit)
  });
  return `${getApiBaseUrl()}/products/search?${search.toString()}`;
}

export async function searchProducts(params: { query: string; sort: SearchSort; page: number; limit: number }): Promise<SearchProductsResponse> {
  const url = buildSearchProductsUrl(params);
  let response: Response;

  try {
    response = await fetch(url, { next: { revalidate: 0 } });
  } catch {
    throw new ApiError('검색 서버에 연결하지 못했습니다. 잠시 후 다시 시도해 주세요.');
  }

  if (!response.ok) {
    throw new ApiError('검색 결과를 불러오지 못했습니다. 검색어를 확인하거나 잠시 후 다시 시도해 주세요.', response.status);
  }

  return (await response.json()) as SearchProductsResponse;
}
