import { describe, expect, it } from 'vitest';
import { mapNaverItemToProduct } from './naver.mapper';
import { NAVER_SORT_MAP } from './naver.types';

describe('Naver mapper', () => {
  it('maps sort values', () => {
    expect(NAVER_SORT_MAP.relevance).toBe('sim');
    expect(NAVER_SORT_MAP.price_asc).toBe('asc');
    expect(NAVER_SORT_MAP.price_desc).toBe('dsc');
  });

  it('sanitizes title and decodes entities', () => {
    const product = mapNaverItemToProduct({
      title: '<b>유모차</b> &amp; 샘플',
      link: 'https://example.com/p/1',
      image: '',
      lprice: '129000',
      mallName: '상점',
      productId: '1',
      maker: '메이커',
      brand: '',
      category1: '육아',
      category2: '',
      category3: '유모차',
      category4: ''
    });

    expect(product.title).toBe('유모차 & 샘플');
    expect(product.categoryPath).toBe('육아 > 유모차');
    expect(product.price).toBe(129000);
    expect(product.brand).toBe('메이커');
  });

  it('parses invalid lprice to zero', () => {
    const product = mapNaverItemToProduct({
      title: '샘플',
      link: 'https://example.com/p/2',
      image: '',
      lprice: '',
      mallName: '',
      productId: '2',
      maker: '',
      brand: '',
      category1: '',
      category2: '',
      category3: '',
      category4: ''
    });

    expect(product.price).toBe(0);
  });
});
