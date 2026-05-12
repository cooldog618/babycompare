import Link from 'next/link';
import type { ProductListItem } from '@babycompare/shared';
import { formatPrice, formatRating, formatReviewCount, formatSourceLabel, withFallback } from '../lib/format';
import { productDetailPath } from '../lib/routes';
import { CompareButton } from './CompareButton';
import { ExternalPurchaseLink } from './ExternalPurchaseLink';
import { ProductImage } from './ProductImage';

export function SearchResultCard({ item }: { item: ProductListItem }) {
  const brandOrMaker = withFallback(item.brand, withFallback(item.maker, '브랜드 정보 없음'));

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex gap-3 sm:gap-4">
        <ProductImage imageUrl={item.imageUrl} title={item.title} className="h-24 w-24 shrink-0 rounded-lg object-cover" />
        <div className="min-w-0 flex-1">
          <p className="inline-flex rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">{formatSourceLabel(item.source)}</p>
          <h3 className="mt-2 line-clamp-3 text-base font-semibold leading-6 text-slate-900">{item.title}</h3>
          <p className="mt-1 text-xs text-slate-600">{brandOrMaker}</p>
          <p className="mt-1 text-xs text-slate-500">판매처: {withFallback(item.seller, '판매처 정보 없음')}</p>
          <p className="mt-1 text-xs text-slate-500">{withFallback(item.categoryPath, '카테고리 정보 없음')}</p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-1 text-sm text-slate-700 sm:grid-cols-2">
        <p className="font-bold text-rose-600">{formatPrice(item.price)}</p>
        <p className="sm:text-right">{formatRating(item.rating)} · {formatReviewCount(item.reviewCount)}</p>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
        <CompareButton product={item} variant="card" />
        <Link href={productDetailPath(item.id)} className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2" aria-label="상품 상세보기">
          상세보기
        </Link>
        <ExternalPurchaseLink href={item.productUrl} />
      </div>
    </article>
  );
}
