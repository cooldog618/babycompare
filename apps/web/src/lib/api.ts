import type { ProductDetailResponse, SearchProductsResponse, SearchSort } from '@babycompare/shared';

const DEFAULT_API_BASE_URL = 'http://localhost:4000';

export class ApiError extends Error {
  constructor(message: string, readonly status?: number) {
    super(message);
    this.name = 'ApiError';
  }
}

export class ApiNotFoundError extends ApiError {
  constructor(message = '요청하신 상품을 찾을 수 없습니다.') {
    super(message, 404);
    this.name = 'ApiNotFoundError';
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

export function buildProductDetailUrl(id: string): string {
  return `${getApiBaseUrl()}/products/${encodeURIComponent(id)}`;
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

export async function fetchProductDetail(id: string): Promise<ProductDetailResponse> {
  const trimmedId = id.trim();
  if (!trimmedId || trimmedId.length > 200) {
    throw new ApiError('잘못된 상품 ID입니다. 검색 결과에서 다시 선택해 주세요.', 400);
  }

  const url = buildProductDetailUrl(trimmedId);
  let response: Response;

  try {
    response = await fetch(url, { next: { revalidate: 0 } });
  } catch {
    throw new ApiError('상품 상세 서버에 연결하지 못했습니다. 잠시 후 다시 시도해 주세요.');
  }

  if (response.status === 404) {
    throw new ApiNotFoundError();
  }

  if (!response.ok) {
    throw new ApiError('상품 상세 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.', response.status);
  }

  return (await response.json()) as ProductDetailResponse;
}
