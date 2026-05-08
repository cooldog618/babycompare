import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ApiError, ApiNotFoundError, fetchProductDetail } from '../../../lib/api';
import { ProductDetail } from '../../../components/ProductDetail';

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const data = await fetchProductDetail(id);
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8">
        <div className="mx-auto max-w-5xl space-y-4">
          <Link href="/search" className="inline-block text-sm text-slate-600 hover:underline">← 검색 결과로 돌아가기</Link>
          <ProductDetail item={data.item} />
        </div>
      </main>
    );
  } catch (error) {
    if (error instanceof ApiNotFoundError) {
      notFound();
    }

    const message = error instanceof ApiError ? error.message : '상품 상세를 불러오는 중 오류가 발생했습니다.';

    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8">
        <div className="mx-auto max-w-2xl rounded-xl border border-rose-200 bg-rose-50 p-6 text-rose-700">
          <h1 className="text-lg font-semibold">상품 상세를 표시할 수 없습니다</h1>
          <p className="mt-2 text-sm">{message}</p>
          <Link href="/search" className="mt-4 inline-block text-sm underline underline-offset-2">검색으로 돌아가기</Link>
        </div>
      </main>
    );
  }
}
