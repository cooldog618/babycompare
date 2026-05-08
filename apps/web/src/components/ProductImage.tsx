'use client';

import { useState } from 'react';

export function ProductImage({ imageUrl, title }: { imageUrl?: string | null; title: string }) {
  const [hasError, setHasError] = useState(false);

  if (!imageUrl || hasError) {
    return <div className="flex h-72 w-full items-center justify-center rounded-xl bg-slate-100 text-sm text-slate-500">이미지 없음</div>;
  }

  return (
    <img
      src={imageUrl}
      alt={`${title} 상품 이미지`}
      className="h-72 w-full rounded-xl object-contain bg-white"
      onError={() => setHasError(true)}
    />
  );
}
