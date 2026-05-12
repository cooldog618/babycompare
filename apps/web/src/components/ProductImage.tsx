'use client';

import { useState } from 'react';

export function ProductImage({ imageUrl, title, className }: { imageUrl?: string | null; title: string; className?: string }) {
  const [hasError, setHasError] = useState(false);

  if (!imageUrl || hasError) {
    return <div className={`flex h-72 w-full items-center justify-center rounded-xl bg-slate-100 text-sm text-slate-500 ${className ?? ''}`.trim()}>이미지 없음</div>;
  }

  return (
    <img
      src={imageUrl}
      alt={`${title} 상품 이미지`}
      className={`h-72 w-full rounded-xl bg-white object-contain ${className ?? ''}`.trim()}
      onError={() => setHasError(true)}
    />
  );
}
