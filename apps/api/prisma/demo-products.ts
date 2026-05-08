import { buildCategoryPath } from '@babycompare/shared';

export interface DemoProductInput {
  externalId: string;
  title: string;
  brand: string;
  maker: string;
  category1: string;
  category2: string;
  category3?: string;
  category4?: string;
  price: number;
  imageUrl: string;
  productUrl: string;
  seller: string;
  rating: number;
  reviewCount: number;
  description: string;
}

const categories = ['유모차', '카시트', '분유', '기저귀', '아기띠', '젖병', '체온계'] as const;

export const DEMO_PRODUCTS: DemoProductInput[] = categories.flatMap((category, cIdx) =>
  Array.from({ length: 3 }).map((_, idx) => {
    const suffix = String.fromCharCode(65 + idx);
    return {
      externalId: `demo-${cIdx + 1}-${String(idx + 1).padStart(3, '0')}`,
      title: `베이비컴페어 데모 ${category} ${suffix}`,
      brand: `데모브랜드 ${category}`,
      maker: `샘플메이커 ${category}`,
      category1: '육아용품',
      category2: category,
      category3: '데모라인',
      category4: `시리즈 ${suffix}`,
      price: 50000 + cIdx * 10000 + idx * 7000,
      imageUrl: `https://demo.babycompare.local/images/${encodeURIComponent(category)}-${idx + 1}.jpg`,
      productUrl: `https://demo.babycompare.local/products/${category}/${idx + 1}`,
      seller: 'BabyCompare Demo Store',
      rating: 4.1 + idx * 0.2,
      reviewCount: 10 + cIdx * 3 + idx,
      description: `${category} 카테고리 UI 검증을 위한 데모 상품 ${suffix}`
    };
  })
);

export function getCategoryPath(input: Pick<DemoProductInput, 'category1' | 'category2' | 'category3' | 'category4'>) {
  return buildCategoryPath(input.category1, input.category2, input.category3, input.category4);
}
