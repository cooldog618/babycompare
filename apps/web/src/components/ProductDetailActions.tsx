import Link from 'next/link';
import { ExternalPurchaseLink } from './ExternalPurchaseLink';

export function ProductDetailActions({ productUrl }: { productUrl: string }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <ExternalPurchaseLink href={productUrl} />
      <button
        type="button"
        disabled
        className="cursor-not-allowed rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-500"
        aria-describedby="compare-help"
      >
        비교 추가 (준비 중)
      </button>
      <Link href="/search" className="text-sm text-slate-600 underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400">
        검색으로 돌아가기
      </Link>
      <p id="compare-help" className="w-full text-xs text-slate-500">비교 추가는 다음 단계에서 제공됩니다.</p>
    </div>
  );
}
