import Link from 'next/link';
import type { CompareItem } from '../lib/compare';
import { formatPrice, formatRating, formatReviewCount, withFallback } from '../lib/format';
import { productDetailPath } from '../lib/routes';
import { ExternalPurchaseLink } from './ExternalPurchaseLink';
import { ProductImage } from './ProductImage';

const rows = [
  { key: 'price', label: '가격' },
  { key: 'brand', label: '브랜드' },
  { key: 'maker', label: '제조사' },
  { key: 'category', label: '카테고리' },
  { key: 'rating', label: '평점' },
  { key: 'reviewCount', label: '리뷰 수' },
  { key: 'seller', label: '판매처' },
  { key: 'description', label: '설명' },
  { key: 'purchase', label: '구매 링크' },
  { key: 'detail', label: '상세보기' }
] as const;

export function CompareTable({ items, onRemove }: { items: CompareItem[]; onRemove: (id: string) => void }) {
  return (
    <div className="hidden overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm md:block">
      <table className="min-w-[980px] w-full table-fixed border-collapse">
        <thead>
          <tr>
            <th className="w-40 border-b border-r border-slate-200 bg-slate-50 p-3 text-left text-sm font-semibold text-slate-700">비교 항목</th>
            {items.map((item) => (
              <th key={item.id} className="w-72 border-b border-slate-200 p-3 align-top">
                <ProductImage imageUrl={item.imageUrl} title={item.title} />
                <p className="mt-2 line-clamp-2 text-left text-sm font-semibold text-slate-900">{item.title}</p>
                <button type="button" onClick={() => onRemove(item.id)} className="mt-2 rounded-md border border-rose-300 px-2 py-1 text-xs font-medium text-rose-700 hover:bg-rose-50">제거</button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key}>
              <th className="border-b border-r border-slate-200 bg-slate-50 p-3 text-left text-sm font-medium text-slate-700">{row.label}</th>
              {items.map((item) => (
                <td key={`${item.id}-${row.key}`} className="border-b border-slate-200 p-3 text-sm text-slate-800 align-top">
                  {row.key === 'price' && <span className="font-bold text-rose-600">{formatPrice(item.price)}</span>}
                  {row.key === 'brand' && withFallback(item.brand, '브랜드 정보 없음')}
                  {row.key === 'maker' && withFallback(item.maker, '제조사 정보 없음')}
                  {row.key === 'category' && withFallback(item.categoryPath, '카테고리 정보 없음')}
                  {row.key === 'rating' && formatRating(item.rating)}
                  {row.key === 'reviewCount' && formatReviewCount(item.reviewCount)}
                  {row.key === 'seller' && withFallback(item.seller, '판매처 정보 없음')}
                  {row.key === 'description' && withFallback(item.description, '상세 설명 정보 없음')}
                  {row.key === 'purchase' && <ExternalPurchaseLink href={item.productUrl} />}
                  {row.key === 'detail' && <Link className="inline-flex rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50" href={productDetailPath(item.id)}>상세보기</Link>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
