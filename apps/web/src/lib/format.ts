export function formatPrice(value: number | null | undefined): string {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return '가격 정보 없음';
  }
  return `${new Intl.NumberFormat('ko-KR').format(value)}원`;
}

export function formatReviewCount(value: number | null | undefined): string {
  if (typeof value !== 'number') return '리뷰 정보 없음';
  return `${new Intl.NumberFormat('ko-KR').format(value)}개 리뷰`;
}

export function formatRating(value: number | null | undefined): string {
  if (typeof value !== 'number') return '평점 정보 없음';
  return `${value.toFixed(1)}점`;
}
