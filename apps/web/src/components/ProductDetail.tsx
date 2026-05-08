import type { ProductDetail as ProductDetailType } from '@babycompare/shared';
import { formatPrice, formatRating, formatReviewCount } from '../lib/format';
import { ProductDetailActions } from './ProductDetailActions';
import { ProductImage } from './ProductImage';

function sourceLabel(source: ProductDetailType['source']): string {
  if (source === 'DEMO') return '데모 데이터';
  if (source === 'NAVER') return '네이버 쇼핑';
  return '수동 등록';
}

export function ProductDetail({ item }: { item: ProductDetailType }) {
  return (
    <section className="rounded-2xl bg-white p-4 shadow-sm md:p-6">
      <div className="grid gap-6 md:grid-cols-2">
        <ProductImage imageUrl={item.imageUrl} title={item.title} />

        <div>
          <p className="text-xs text-slate-500">{item.categoryPath || '카테고리 정보 없음'}</p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900">{item.title}</h1>
          <p className="mt-2 text-sm text-slate-600">브랜드: {item.brand || '정보 없음'} · 제조사: {item.maker || '정보 없음'}</p>
          <p className="mt-1 text-sm text-slate-600">판매처: {item.seller || '정보 없음'}</p>
          <p className="mt-3 text-3xl font-extrabold text-rose-600">{formatPrice(item.price)}</p>
          <p className="mt-2 text-sm text-slate-700">{formatRating(item.rating)} · {formatReviewCount(item.reviewCount)}</p>
          <p className="mt-1 text-xs text-slate-500">출처: {sourceLabel(item.source)}</p>
          <p className="mt-1 text-xs text-slate-500">업데이트: {item.lastSyncedAt || item.updatedAt}</p>

          <div className="mt-5">
            <ProductDetailActions product={item} />
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-slate-200 pt-4">
        <h2 className="text-base font-semibold text-slate-900">상품 설명</h2>
        <p className="mt-2 whitespace-pre-line text-sm text-slate-700">
          {item.description || '네이버 쇼핑 검색 결과에는 상세 설명이 제공되지 않습니다. 판매 페이지에서 자세한 정보를 확인해 주세요.'}
        </p>
      </div>
    </section>
  );
}
