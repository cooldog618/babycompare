'use client';

import { getComparePriceState, getLowestPriceSummary } from '../lib/compare';
import { formatPrice } from '../lib/format';
import { useCompareList } from '../hooks/useCompareList';
import { CompareEmptyState } from './CompareEmptyState';
import { CompareGuide } from './CompareGuide';
import { CompareProductCard } from './CompareProductCard';
import { CompareTable } from './CompareTable';

export function getCompareViewState(count: number): 'empty' | 'single' | 'multiple' {
  if (count <= 0) return 'empty';
  if (count === 1) return 'single';
  return 'multiple';
}

export function ComparePage() {
  const { items, count, clear, removeItem, isLoaded } = useCompareList();
  const state = getCompareViewState(count);
  const summary = getLowestPriceSummary(items);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-6xl space-y-4">
        <section className="rounded-xl bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">비교함</h1>
              <p className="mt-1 text-sm text-slate-600">최대 5개 상품을 담아 가격과 정보를 비교해 보세요.</p>
              {state !== 'empty' && (
                <p className="mt-2 text-sm text-slate-700">
                  {summary.lowestPrice !== null
                    ? `현재 비교 목록의 최저가는 ${formatPrice(summary.lowestPrice)}입니다.`
                    : '가격 정보가 있는 상품이 없어 최저가를 계산할 수 없습니다.'}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-slate-900 px-3 py-1 text-sm font-semibold text-white">{isLoaded ? `${count}개` : '-'}</span>
              <button type="button" onClick={clear} disabled={count === 0} className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 enabled:hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50">전체 비우기</button>
            </div>
          </div>
        </section>

        {state === 'empty' && <CompareEmptyState />}

        {state !== 'empty' && (
          <>
            <CompareGuide count={count} />
            <section className="grid gap-4 md:hidden">
              {items.map((item) => <CompareProductCard key={item.id} item={item} onRemove={removeItem} priceState={getComparePriceState(item, summary)} />)}
            </section>
            {state === 'multiple' && <CompareTable items={items} onRemove={removeItem} summary={summary} />}
          </>
        )}
      </div>
    </main>
  );
}
