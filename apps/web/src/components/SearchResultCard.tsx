import Link from 'next/link';
import type { ProductListItem } from '@babycompare/shared';
import { formatPrice, formatRating, formatReviewCount } from '../lib/format';

export function SearchResultCard({ item }: { item: ProductListItem }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex gap-4">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.title} className="h-24 w-24 rounded-lg object-cover" />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-slate-100 text-xs text-slate-500">이미지 없음</div>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-xs text-slate-500">{item.brand || item.seller || '브랜드/판매처 정보 없음'}</p>
          <h3 className="mt-1 line-clamp-2 text-base font-semibold text-slate-900">{item.title}</h3>
          <p className="mt-1 text-xs text-slate-500">{item.categoryPath || '카테고리 정보 없음'}</p>
          <p className="mt-2 text-lg font-bold text-rose-600">{formatPrice(item.price)}</p>
          <p className="mt-1 text-sm text-slate-600">{formatRating(item.rating)} · {formatReviewCount(item.reviewCount)}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link href={`/products/${item.id}`} className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
          상세보기
        </Link>
        <a
          href={item.productUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-600"
        >
          구매하기 {item.productUrl.includes('demo.babycompare.local') ? '(데모 링크)' : ''}
        </a>
      </div>
    </article>
  );
}
