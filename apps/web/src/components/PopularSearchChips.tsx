import Link from 'next/link';
import { buildSearchRoute } from '../lib/routes';

export const POPULAR_KEYWORDS = ['유모차', '카시트', '분유', '기저귀', '아기띠', '젖병', '체온계'] as const;

export function PopularSearchChips() {
  return (
    <section aria-labelledby="popular-keywords-title">
      <h2 id="popular-keywords-title" className="text-sm font-semibold text-slate-700">
        인기 검색어
      </h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {POPULAR_KEYWORDS.map((keyword) => (
          <Link
            key={keyword}
            href={buildSearchRoute(keyword, 'relevance', 1)}
            className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-sm text-sky-700 hover:bg-sky-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            {keyword}
          </Link>
        ))}
      </div>
    </section>
  );
}
