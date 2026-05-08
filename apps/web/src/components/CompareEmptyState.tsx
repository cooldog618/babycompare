import Link from 'next/link';

export function CompareEmptyState() {
  return (
    <section className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">아직 비교할 상품이 없어요</h2>
      <p className="mt-2 text-sm text-slate-600">비교할 상품을 검색해 보세요.</p>
      <Link
        href="/search?q=유모차&sort=relevance&page=1"
        className="mt-5 inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
      >
        비교할 상품을 검색해 보세요
      </Link>
    </section>
  );
}
