type ExternalPurchaseLinkProps = {
  href?: string | null;
  className?: string;
};

export function ExternalPurchaseLink({ href, className }: ExternalPurchaseLinkProps) {
  if (!href) {
    return (
      <span className={`inline-flex items-center justify-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-400 ${className ?? ''}`.trim()} aria-disabled="true">
        구매 링크 없음
      </span>
    );
  }

  const isDemo = href.includes('demo.babycompare.local');

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`구매하기${isDemo ? ' (데모 데이터)' : ''} - 새 탭에서 외부 페이지 열기`}
      className={`inline-flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ${className ?? ''}`.trim()}
    >
      구매하기{isDemo ? ' (데모 링크)' : ''}
    </a>
  );
}
