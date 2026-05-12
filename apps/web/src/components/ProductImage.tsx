'use client';

import { useState } from 'react';

type ProductImageProps = {
  imageUrl?: string | null;
  title: string;
  className?: string;
};

export function ProductImage({ imageUrl, title, className }: ProductImageProps) {
  const [hasError, setHasError] = useState(false);
  const baseClassName = className ?? 'h-72 w-full rounded-xl bg-white object-contain';

  if (!imageUrl || hasError) {
    return (
      <div
        className={`flex items-center justify-center rounded-xl bg-slate-100 text-sm text-slate-500 ${baseClassName}`}
      >
        이미지 없음
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={`${title} 상품 이미지`}
      className={baseClassName}
      onError={() => setHasError(true)}
    />
  );
}
