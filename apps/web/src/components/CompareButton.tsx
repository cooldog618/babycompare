'use client';

import type { ProductDetail, ProductListItem } from '@babycompare/shared';
import type { CompareItem } from '../lib/compare';
import { useCompareList } from '../hooks/useCompareList';

type CompareButtonProps = { product: ProductListItem | ProductDetail | CompareItem; variant?: 'card' | 'detail' };

export function CompareButton({ product, variant = 'card' }: CompareButtonProps) {
  const { isInList, toggleItem, lastError } = useCompareList();
  const active = isInList(product.id);

  return (
    <div>
      <button type="button" aria-pressed={active} aria-label={active ? '비교 목록에서 제거' : '비교 목록에 추가'} onClick={() => toggleItem(product)} className={variant === 'detail' ? 'w-full rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 sm:w-auto' : `w-full rounded-lg border px-3 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${active ? 'border-rose-300 bg-rose-50 text-rose-700 focus-visible:ring-rose-400' : 'border-slate-300 text-slate-700 hover:bg-slate-50 focus-visible:ring-slate-400'}`}>
        {active ? '비교에서 제거됨' : '비교 추가'}
      </button>
      {lastError ? <p className="mt-1 text-xs text-amber-700">{lastError}</p> : null}
    </div>
  );
}
