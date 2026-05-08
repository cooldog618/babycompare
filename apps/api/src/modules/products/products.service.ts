import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ProductSource } from '@prisma/client';
import { type ProductSearchSource, type SearchProductsResponse } from '@babycompare/shared';
import { NaverApiError, NaverConfigurationError, NaverNetworkError, NaverTimeoutError } from '../naver/naver.errors';
import { NaverService } from '../naver/naver.service';
import { mapProductEntity } from './products.mapper';
import { type SearchProductsRequest } from './products.dto';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(private readonly repository: ProductsRepository, private readonly naverService: NaverService) {}

  async search(params: SearchProductsRequest): Promise<SearchProductsResponse> {
    const useDemo = process.env.USE_DEMO_DATA === 'true';
    if (useDemo) return this.fallback(params, 'USE_DEMO_DATA_ENABLED');

    if (!this.naverService.isConfigured()) return this.fallback(params, 'NAVER_NOT_CONFIGURED');

    try {
      const naver = await this.naverService.searchShopping(params);
      const saved = [];
      for (const item of naver.items) {
        try {
          saved.push(await this.repository.upsertNaverProduct(item as any));
        } catch (e) {
          this.logger.warn(`upsert failed: ${(e as Error).message}`);
        }
      }
      await this.safeLog(params.query, params.sort, saved.length, ProductSource.NAVER);
      return { items: saved.map(mapProductEntity), meta: { ...params, total: naver.total, source: 'NAVER', fallback: false } };
    } catch (error) {
      if (error instanceof NaverConfigurationError) return this.fallback(params, 'NAVER_NOT_CONFIGURED');
      if (error instanceof NaverTimeoutError) return this.fallback(params, 'NAVER_TIMEOUT');
      if (error instanceof NaverNetworkError) return this.fallback(params, 'NAVER_NETWORK_ERROR');
      if (error instanceof NaverApiError) return this.fallback(params, 'NAVER_API_ERROR');
      return this.fallback(params, 'UNKNOWN_NAVER_ERROR');
    }
  }

  private async fallback(params: SearchProductsRequest, reason: string): Promise<SearchProductsResponse> {
    try {
      const result = await this.repository.searchFallback(params.query, params.sort, params.page, params.limit);
      const source: ProductSearchSource = 'DEMO';
      await this.safeLog(params.query, params.sort, result.items.length, ProductSource.DEMO);
      return { items: result.items.map(mapProductEntity), meta: { ...params, total: result.total, source, fallback: true, fallbackReason: reason } };
    } catch {
      throw new InternalServerErrorException('search failed');
    }
  }

  private async safeLog(query: string, sort: string, resultCount: number, source: ProductSource): Promise<void> {
    try { await this.repository.insertSearchLog(query, sort, resultCount, source); } catch {}
  }
}
