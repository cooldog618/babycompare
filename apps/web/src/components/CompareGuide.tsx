export function CompareGuide({ count }: { count: number }) {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
      {count === 1 ? '2개 이상 담으면 비교가 쉬워져요.' : '상품을 2개 이상 담으면 항목별 비교가 쉬워져요.'}
    </div>
  );
}
