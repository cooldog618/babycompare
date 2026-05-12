import { formatPriceDifference } from '../lib/format';

export function PriceDifference({ differenceFromLowest }: { differenceFromLowest: number | null }) {
  return (
    <p className="mt-1 text-xs text-slate-600" aria-label={formatPriceDifference(differenceFromLowest)}>
      {formatPriceDifference(differenceFromLowest)}
    </p>
  );
}
