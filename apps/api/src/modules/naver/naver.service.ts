import { Injectable } from '@nestjs/common';
import { resolveNaverConfig } from './naver.config';
import {
  NaverApiError,
  NaverConfigurationError,
  NaverNetworkError,
  NaverTimeoutError,
  NaverValidationError
} from './naver.errors';
import { mapNaverItemToProduct } from './naver.mapper';
import {
  NAVER_SORT_MAP,
  type NaverShoppingSearchApiResponse,
  type NaverShoppingSearchParams,
  type NaverShoppingSearchResult
} from './naver.types';

@Injectable()
export class NaverService {
  private readonly endpoint = 'https://openapi.naver.com/v1/search/shop.json';
  private readonly config = resolveNaverConfig(process.env);

  isConfigured(): boolean {
    return Boolean(this.config.clientId && this.config.clientSecret);
  }

  async searchShopping(params: NaverShoppingSearchParams): Promise<NaverShoppingSearchResult> {
    if (!this.isConfigured()) throw new NaverConfigurationError('Naver API key is not configured');
    if (!params.query?.trim()) throw new NaverValidationError('query is required');

    const page = Number.isFinite(params.page) ? Number(params.page) : 1;
    if (page < 1) throw new NaverValidationError('page must be greater than 0');

    const requestedLimit = Number.isFinite(params.limit) ? Number(params.limit) : 20;
    const limit = Math.max(1, Math.min(100, requestedLimit));
    const start = Math.max(1, Math.min(1000, (page - 1) * limit + 1));
    const sort = NAVER_SORT_MAP[params.sort];
    if (!sort) throw new NaverValidationError('invalid sort value');

    const url = new URL(this.endpoint);
    url.searchParams.set('query', params.query.trim());
    url.searchParams.set('display', String(limit));
    url.searchParams.set('start', String(start));
    url.searchParams.set('sort', sort);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.config.timeoutMs);

    let response: Response;
    try {
      response = await fetch(url, {
        headers: {
          'X-Naver-Client-Id': this.config.clientId,
          'X-Naver-Client-Secret': this.config.clientSecret
        },
        signal: controller.signal
      });
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new NaverTimeoutError(`Naver request timed out in ${this.config.timeoutMs}ms`);
      }
      throw new NaverNetworkError('Naver network error');
    } finally {
      clearTimeout(timer);
    }

    if (!response.ok) {
      throw new NaverApiError(`Naver API responded with ${response.status}`, response.status);
    }

    const body = (await response.json()) as NaverShoppingSearchApiResponse;
    if (!Array.isArray(body.items) || typeof body.total !== 'number') {
      throw new NaverApiError('Unexpected Naver API response schema', 502);
    }

    return {
      total: body.total,
      start: body.start,
      display: body.display,
      items: body.items.map((item) => mapNaverItemToProduct(item)),
      raw: body
    };
  }
}
