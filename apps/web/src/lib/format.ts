export function formatPrice(value: number | null | undefined): string {
  if (typeof value !== 'number' || Number.isNaN(value) || value <= 0) {
    return '가격 정보 없음';
  }
  return `${new Intl.NumberFormat('ko-KR').format(value)}원`;
}

export function formatPriceDifference(value: number | null): string {
  if (value === null) return '가격 비교 불가';
  if (value <= 0) return '최저가';
  return `최저가보다 ${new Intl.NumberFormat('ko-KR').format(value)}원 높음`;
}

export function formatReviewCount(value: number | null | undefined): string {
  if (typeof value !== 'number') return '리뷰 정보 없음';
  return `${new Intl.NumberFormat('ko-KR').format(value)}개 리뷰`;
}

export function formatRating(value: number | null | undefined): string {
  if (typeof value !== 'number') return '평점 정보 없음';
  return `${value.toFixed(1)}점`;
}

export function withFallback(value: string | null | undefined, fallback: string): string {
  if (!value || !value.trim()) return fallback;
  return value;
}

export function formatSourceLabel(source: 'DEMO' | 'NAVER' | 'MANUAL'): string {
  if (source === 'DEMO') return '데모';
  if (source === 'NAVER') return '네이버';
  return '수동';
}
