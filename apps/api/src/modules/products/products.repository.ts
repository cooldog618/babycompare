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

  async insertSearchLog(query: string, sort: string, resultCount: number, source: ProductSource): Promise<void> {
    await this.prisma.searchLog.create({ data: { query, sort, resultCount, source } });
  }
}

const mapNaverUpdate = (item: Product) => ({ title: item.title, brand: item.brand, maker: item.maker, category1: item.category1, category2: item.category2, category3: item.category3, category4: item.category4, categoryPath: item.categoryPath, price: item.price, imageUrl: item.imageUrl, productUrl: item.productUrl, seller: item.seller });
const mapNaverCreate = (item: Product) => ({ ...mapNaverUpdate(item), externalId: item.externalId, rating: null, reviewCount: null, description: null, isVisible: true });
