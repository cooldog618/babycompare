import type { SearchProductsResponse } from '@babycompare/shared';
import { ApiFallbackNotice } from './ApiFallbackNotice';
import { SearchResultCard } from './SearchResultCard';

export function SearchResults({ data }: { data: SearchProductsResponse }) {
  return (
    <section className="space-y-4" aria-live="polite">
      <div className="space-y-2 rounded-xl border border-slate-200 bg-white p-4">
        <p className="text-sm text-slate-700">총 {data.meta.total.toLocaleString('ko-KR')}건</p>
        <p className="text-xs text-slate-500">검색 소스: {data.meta.source === 'NAVER' ? '네이버 쇼핑 검색 결과' : '내부 데이터 검색 결과'}</p>
        {data.meta.fallback ? <ApiFallbackNotice /> : null}
      </div>
      {data.items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-600">검색 결과가 없습니다.</div>
      ) : (
        <div className="space-y-3">{data.items.map((item) => <SearchResultCard key={item.id} item={item} />)}</div>
      )}
    </section>
  );
}
