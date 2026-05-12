import Link from 'next/link';
import type { ComparePriceState, CompareItem } from '../lib/compare';
import { formatPrice, formatRating, formatReviewCount, withFallback } from '../lib/format';
import { productDetailPath } from '../lib/routes';
import { ExternalPurchaseLink } from './ExternalPurchaseLink';
import { LowestPriceBadge } from './LowestPriceBadge';
import { PriceDifference } from './PriceDifference';
import { ProductImage } from './ProductImage';

export function CompareProductCard({ item, onRemove, priceState }: { item: CompareItem; onRemove: (id: string) => void; priceState: ComparePriceState }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <ProductImage imageUrl={item.imageUrl} title={item.title} />
      <h3 className="mt-3 line-clamp-2 text-base font-semibold text-slate-900">{item.title}</h3>
      <div className={`mt-2 rounded-md px-2 py-1 ${priceState.isLowest ? 'bg-emerald-50' : ''}`}>
        <div className="flex items-center gap-2">
          <p className="text-lg font-bold text-rose-600">{formatPrice(item.price)}</p>
          {priceState.isLowest && <LowestPriceBadge />}
        </div>
        {!priceState.isLowest && <PriceDifference differenceFromLowest={priceState.differenceFromLowest} />}
      </div>
      <dl className="mt-3 space-y-2 text-sm">
        <div className="flex justify-between gap-3"><dt className="text-slate-500">브랜드</dt><dd className="text-right text-slate-800">{withFallback(item.brand, '브랜드 정보 없음')}</dd></div>
        <div className="flex justify-between gap-3"><dt className="text-slate-500">제조사</dt><dd className="text-right text-slate-800">{withFallback(item.maker, '제조사 정보 없음')}</dd></div>
        <div className="flex justify-between gap-3"><dt className="text-slate-500">카테고리</dt><dd className="text-right text-slate-800">{withFallback(item.categoryPath, '카테고리 정보 없음')}</dd></div>
        <div className="flex justify-between gap-3"><dt className="text-slate-500">평점</dt><dd className="text-right text-slate-800">{formatRating(item.rating)}</dd></div>
        <div className="flex justify-between gap-3"><dt className="text-slate-500">리뷰 수</dt><dd className="text-right text-slate-800">{formatReviewCount(item.reviewCount)}</dd></div>
        <div className="flex justify-between gap-3"><dt className="text-slate-500">판매처</dt><dd className="text-right text-slate-800">{withFallback(item.seller, '판매처 정보 없음')}</dd></div>
      </dl>
      <p className="mt-3 line-clamp-3 rounded-md bg-slate-50 p-2 text-sm text-slate-600">{withFallback(item.description, '상세 설명 정보 없음')}</p>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <Link href={productDetailPath(item.id)} className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2">상세보기</Link>
        <ExternalPurchaseLink href={item.productUrl} />
        <button type="button" onClick={() => onRemove(item.id)} className="rounded-lg border border-rose-300 px-3 py-2 text-sm font-medium text-rose-700 hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2">제거</button>
      </div>
    </article>
  );
}
