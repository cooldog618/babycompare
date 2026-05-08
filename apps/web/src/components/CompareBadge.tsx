'use client';
import Link from 'next/link';
import { useCompareList } from '../hooks/useCompareList';

export function CompareBadge() {
  const { count, isLoaded } = useCompareList();
  return (
    <Link href="/compare" className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50">
      비교함
      {isLoaded && count > 0 ? <span className="rounded-full bg-sky-600 px-2 py-0.5 text-xs font-semibold text-white">{count}</span> : null}
    </Link>
  );
}
