import { Injectable } from '@nestjs/common';
import { Prisma, ProductSource, type Product } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { type SearchSort } from '@babycompare/shared';

@Injectable()
export class ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async searchFallback(query: string, sort: SearchSort, page: number, limit: number): Promise<{ items: Product[]; total: number }> {
    const where: Prisma.ProductWhereInput = {
      isVisible: true,
      source: { in: [ProductSource.DEMO, ProductSource.MANUAL] },
      OR: ['title', 'brand', 'maker', 'categoryPath', 'seller', 'description'].map((field) => ({
        [field]: { contains: query }
      }))
    };
    const orderBy = sort === 'price_asc' ? [{ price: 'asc' as const }] : sort === 'price_desc' ? [{ price: 'desc' as const }] : [{ createdAt: 'desc' as const }];
    const [items, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({ where, orderBy, skip: (page - 1) * limit, take: limit }),
      this.prisma.product.count({ where })
    ]);
    return { items, total };
  }

  async findVisibleById(id: string): Promise<Product | null> {
    return this.prisma.product.findFirst({
      where: { id, isVisible: true }
    });
  }

  async upsertNaverProduct(item: Product): Promise<Product> {
    const existingByUrl = await this.prisma.product.findUnique({ where: { productUrl: item.productUrl } });
    if (existingByUrl) {
      return this.prisma.product.update({
        where: { id: existingByUrl.id },
        data: {
          source: ProductSource.NAVER,
          externalId: item.externalId,
          title: item.title,
          brand: item.brand,
          maker: item.maker,
          category1: item.category1,
          category2: item.category2,
          category3: item.category3,
          category4: item.category4,
          categoryPath: item.categoryPath,
          price: item.price,
          imageUrl: item.imageUrl,
          seller: item.seller,
          lastSyncedAt: new Date(),
          isVisible: existingByUrl.isVisible
        }
      });
    }

    if (item.externalId) {
      return this.prisma.product.upsert({
        where: { source_externalId: { source: ProductSource.NAVER, externalId: item.externalId } },
        update: { ...mapNaverUpdate(item), lastSyncedAt: new Date() },
        create: { ...mapNaverCreate(item), source: ProductSource.NAVER, lastSyncedAt: new Date() }
      });
    }

    return this.prisma.product.create({ data: { ...mapNaverCreate(item), source: ProductSource.NAVER, lastSyncedAt: new Date() } });
  }


  async adminSummary() {
    const [totalProducts, visibleProducts, bySourceRaw, recentSearches] = await this.prisma.$transaction([
      this.prisma.product.count(),
      this.prisma.product.count({ where: { isVisible: true } }),
      this.prisma.product.groupBy({ by: ['source'], orderBy: { source: 'asc' }, _count: true }),
      this.prisma.searchLog.findMany({ orderBy: { createdAt: 'desc' }, take: 10 })
    ]);
    const bySource = { DEMO: 0, NAVER: 0, MANUAL: 0 };
    for (const row of bySourceRaw) bySource[row.source] = row._count;
    return { totalProducts, visibleProducts, hiddenProducts: totalProducts - visibleProducts, bySource, recentSearches };
  }

  async adminList(params: { q: string; source: 'ALL' | ProductSource; visible: 'all' | 'true' | 'false'; page: number; limit: number }) {
    const where: Prisma.ProductWhereInput = {
      ...(params.source !== 'ALL' ? { source: params.source } : {}),
      ...(params.visible === 'all' ? {} : { isVisible: params.visible === 'true' }),
      ...(params.q
        ? { OR: ['title', 'brand', 'maker', 'categoryPath', 'seller', 'description'].map((field) => ({ [field]: { contains: params.q } })) }
        : {})
    };
    const [items, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({ where, orderBy: [{ updatedAt: 'desc' }], skip: (params.page - 1) * params.limit, take: params.limit }),
      this.prisma.product.count({ where })
    ]);
    return { items, total };
  }

  async adminFindById(id: string) { return this.prisma.product.findUnique({ where: { id } }); }
  async adminUpdate(id: string, data: Prisma.ProductUpdateInput) { return this.prisma.product.update({ where: { id }, data }); }

  async insertSearchLog(query: string, sort: string, resultCount: number, source: ProductSource): Promise<void> {
    await this.prisma.searchLog.create({ data: { query, sort, resultCount, source } });
  }
}

const mapNaverUpdate = (item: Product) => ({ title: item.title, brand: item.brand, maker: item.maker, category1: item.category1, category2: item.category2, category3: item.category3, category4: item.category4, categoryPath: item.categoryPath, price: item.price, imageUrl: item.imageUrl, productUrl: item.productUrl, seller: item.seller });
const mapNaverCreate = (item: Product) => ({ ...mapNaverUpdate(item), externalId: item.externalId, rating: null, reviewCount: null, description: null, isVisible: true });
