import Link from 'next/link';
import type { ProductDetail } from '@babycompare/shared';
import { ExternalPurchaseLink } from './ExternalPurchaseLink';
import { CompareButton } from './CompareButton';

export function ProductDetailActions({ product }: { product: ProductDetail }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <ExternalPurchaseLink href={product.productUrl} />
      <CompareButton product={product} variant="detail" />
      <Link href="/search" className="text-sm text-slate-600 underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400">
        검색으로 돌아가기
      </Link>
    </div>
  );
}
