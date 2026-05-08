'use client';

import { useCompareList } from '../../hooks/useCompareList';

export default function ComparePage() {
  const { items, count, clear, isLoaded } = useCompareList();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-6 shadow-sm">
        <h1 className="text-xl font-bold">비교함</h1>
        <p className="mt-2 text-sm text-slate-600">현재 비교 상품 수: {isLoaded ? count : '-'}</p>
        <p className="mt-1 text-sm text-slate-500">비교 테이블은 다음 단계(BC-MVP-008/009)에서 구현 예정입니다.</p>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-700">
          {items.map((item) => <li key={item.id}>{item.title}</li>)}
        </ul>
        {count > 0 ? <button type="button" onClick={clear} className="mt-4 rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50">전체 비우기</button> : null}
      </div>
    </main>
  );
}
