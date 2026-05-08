export function formatKrwPrice(price: number): string {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    maximumFractionDigits: 0
  }).format(price);
}

export function buildCategoryPath(...categories: Array<string | null | undefined>): string | null {
  const parts = categories.map((v) => v?.trim()).filter((v): v is string => Boolean(v));
  return parts.length > 0 ? parts.join(' > ') : null;
}
