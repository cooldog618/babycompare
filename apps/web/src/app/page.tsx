import Link from 'next/link';
import { PopularSearchChips } from '../components/PopularSearchChips';
import { SearchForm } from '../components/SearchForm';

const FEATURES = [
  { title: '검색', description: '원하는 육아용품을 빠르게 찾을 수 있어요.' },
  { title: '비교', description: '여러 상품을 한눈에 비교할 수 있어요.' },
  { title: '최저가 표시', description: '다음 단계에서 최저가 기능이 제공됩니다.' },
  { title: '네이버 구매 연결', description: '관심 상품을 바로 구매 페이지로 이동할 수 있어요.' }
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white px-4 py-8">
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-900">BabyCompare</h1>
          <Link href="/search" className="text-sm text-sky-700 hover:underline">검색 페이지</Link>
        </header>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">육아용품, 한눈에 비교하고 똑똑하게 고르세요</h2>
          <p className="mt-3 text-sm text-slate-600">유모차, 카시트, 분유, 기저귀 등 다양한 육아용품을 검색하고 비교해 보세요.</p>
          <SearchForm className="mt-5" />
          <div className="mt-5"><PopularSearchChips /></div>
        </section>

        <section className="grid gap-3 sm:grid-cols-2" aria-label="서비스 장점">
          {FEATURES.map((feature) => (
            <article key={feature.title} className="rounded-xl border border-sky-100 bg-white p-4">
              <h3 className="font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{feature.description}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
