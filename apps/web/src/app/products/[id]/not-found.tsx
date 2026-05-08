import Link from 'next/link';

export default function ProductNotFoundPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-2xl rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">상품을 찾을 수 없습니다</h1>
        <p className="mt-2 text-sm text-slate-600">요청하신 상품이 없거나 더 이상 노출되지 않습니다.</p>
        <Link href="/search" className="mt-4 inline-block text-sm text-slate-700 underline underline-offset-2">검색으로 이동</Link>
      </div>
    </main>
  );
}
