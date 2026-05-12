import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { parseAdminId } from './admin.dto';
import { mapUpdatePayload } from './admin.mapper';
import { ProductsRepository } from '../products/products.repository';

@Injectable()
export class AdminService {
  constructor(private readonly productsRepository: ProductsRepository) {}
  getSummary() { return this.productsRepository.adminSummary(); }
  async listProducts(params: { q: string; source: 'ALL' | any; visible: 'all' | 'true' | 'false'; page: number; limit: number }) {
    const { items, total } = await this.productsRepository.adminList(params as any);
    return { items, meta: { page: params.page, limit: params.limit, total } };
  }
  async updateProduct(rawId: string, body: Record<string, unknown>) {
    const id = parseAdminId(rawId);
    const prev = await this.productsRepository.adminFindById(id);
    if (!prev) throw new NotFoundException('product not found');
    const data = mapUpdatePayload(body);
    this.validate(data);
    try { return await this.productsRepository.adminUpdate(id, data as Prisma.ProductUpdateInput); } catch (e) { if ((e as any)?.code === 'P2002') throw new ConflictException('productUrl already exists'); throw new InternalServerErrorException('failed to update product'); }
  }
  async updateVisibility(rawId: string, isVisible: boolean) {
    const id = parseAdminId(rawId);
    const prev = await this.productsRepository.adminFindById(id);
    if (!prev) throw new NotFoundException('product not found');
    return this.productsRepository.adminUpdate(id, { isVisible });
  }
  private validate(data: Record<string, unknown>) {
    if ('title' in data && (!data.title || !String(data.title).trim())) throw new BadRequestException('invalid title');
    if ('productUrl' in data && (!data.productUrl || !String(data.productUrl).trim())) throw new BadRequestException('invalid productUrl');
    if ('price' in data && (!Number.isInteger(data.price) || Number(data.price) < 0)) throw new BadRequestException('invalid price');
    if ('reviewCount' in data && data.reviewCount !== null && (!Number.isInteger(data.reviewCount) || Number(data.reviewCount) < 0)) throw new BadRequestException('invalid reviewCount');
    if ('rating' in data && data.rating !== null && (typeof data.rating !== 'number' || Number(data.rating) < 0 || Number(data.rating) > 5)) throw new BadRequestException('invalid rating');
  }
}
