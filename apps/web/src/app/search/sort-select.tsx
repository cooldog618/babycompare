'use client';

import { useRouter } from 'next/navigation';
import type { SearchSort } from '@babycompare/shared';

export function SearchSortSelect({ currentSort, query, page }: { currentSort: SearchSort; query: string; page: number }) {
  const router = useRouter();

  return (
    <label className="text-sm text-slate-700">
      정렬
      <select
        value={currentSort}
        onChange={(event) => {
          const params = new URLSearchParams();
          if (query) params.set('q', query);
          params.set('sort', event.target.value);
          params.set('page', String(page));
          router.push(`/search?${params.toString()}`);
        }}
        className="ml-2 rounded-md border border-slate-300 px-2 py-1"
      >
        <option value="relevance">관련순</option>
        <option value="price_asc">낮은가격순</option>
        <option value="price_desc">높은가격순</option>
      </select>
    </label>
  );
}
