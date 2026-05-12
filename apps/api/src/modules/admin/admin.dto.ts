import { BadRequestException } from '@nestjs/common';
import { ProductSource } from '@prisma/client';
export type AdminSourceFilter = ProductSource | 'ALL';
export type AdminVisibleFilter = 'true' | 'false' | 'all';
export function parseAdminId(id: string): string { const value = id?.trim(); if (!value || value.length > 200) throw new BadRequestException('invalid product id'); return value; }
export function parseListQuery(query: Record<string, string | undefined>) { const page = Number(query.page ?? '1'); const limit = Number(query.limit ?? '20'); if (!Number.isInteger(page) || page < 1) throw new BadRequestException('invalid page'); if (!Number.isInteger(limit) || limit < 1 || limit > 100) throw new BadRequestException('invalid limit'); const source = (query.source ?? 'ALL') as AdminSourceFilter; if (!['ALL','DEMO','NAVER','MANUAL'].includes(source)) throw new BadRequestException('invalid source'); const visible = (query.visible ?? 'all') as AdminVisibleFilter; if (!['all','true','false'].includes(visible)) throw new BadRequestException('invalid visible'); return { q: query.q?.trim() ?? '', source, visible, page, limit }; }
