import Link from 'next/link';
import { searchProducts } from '../../lib/api';
import { DEFAULT_LIMIT, parsePage, parseSort } from '../../lib/routes';
import { SearchForm } from '../../components/SearchForm';
import { SearchResults } from '../../components/SearchResults';
import { SearchSortSelect } from './sort-select';

export default async function SearchPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string; sort?: string; page?: string }>;
}) {
  const params = await searchParams;
  const query = params.q?.trim() ?? '';
  const sort = parseSort(params.sort);
  const page = parsePage(params.page);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-4xl space-y-4">
        <header className="flex items-center justify-between">
          <Link href="/" className="text-sm text-slate-600 hover:underline">← 홈으로</Link>
          <SearchSortSelect currentSort={sort} query={query} page={page} />
        </header>

        <section className="rounded-xl bg-white p-4 shadow-sm">
          <h1 className="text-lg font-bold">상품 검색</h1>
          <SearchForm className="mt-3" initialQuery={query} submitLabel="다시 검색" />
        </section>

        {!query ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-600">검색어를 입력하면 결과를 볼 수 있어요.</div>
        ) : (
          <SearchContent query={query} sort={sort} page={page} />
        )}
      </div>
    </main>
  );
}

async function SearchContent({ query, sort, page }: { query: string; sort: 'relevance'|'price_asc'|'price_desc'; page: number }) {
  try {
    const data = await searchProducts({ query, sort, page, limit: DEFAULT_LIMIT });
    return <SearchResults data={data} />;
  } catch (error) {
    const message = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
    return <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{message}</div>;
  }
}
