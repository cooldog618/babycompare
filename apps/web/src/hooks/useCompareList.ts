'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Product, ProductDetail, ProductListItem } from '@babycompare/shared';
import {
  addCompareItem,
  clearCompareItems,
  COMPARE_MAX_ITEMS,
  COMPARE_STORAGE_KEY,
  isInCompareList,
  normalizeCompareItem,
  parseCompareItems,
  removeCompareItem,
  serializeCompareItems,
  type CompareItem
} from '../lib/compare';

type ProductInput = Product | ProductDetail | ProductListItem | CompareItem;

export function useCompareList() {
  const [items, setItems] = useState<CompareItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);

  const syncStorage = useCallback((nextItems: CompareItem[]) => {
    try { localStorage.setItem(COMPARE_STORAGE_KEY, serializeCompareItems(nextItems)); } catch { setLastError('비교 목록 저장에 실패했어요. 브라우저 설정을 확인해 주세요.'); }
  }, []);

  useEffect(() => {
    try { setItems(parseCompareItems(localStorage.getItem(COMPARE_STORAGE_KEY))); } catch { setItems([]); setLastError('비교 목록을 불러오지 못했어요.'); } finally { setIsLoaded(true); }
    const onStorage = (event: StorageEvent) => {
      if (event.key === COMPARE_STORAGE_KEY) setItems(parseCompareItems(event.newValue));
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const addItem = useCallback((product: ProductInput) => {
    const normalized = normalizeCompareItem(product);
    setItems((prev) => {
      const result = addCompareItem(prev, normalized);
      if (!result.added) setLastError(result.reason === 'MAX_ITEMS' ? `최대 ${COMPARE_MAX_ITEMS}개까지 비교할 수 있어요.` : '이미 비교 목록에 담긴 상품이에요.');
      else { setLastError(null); syncStorage(result.items); }
      return result.items;
    });
  }, [syncStorage]);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => { const next = removeCompareItem(prev, productId); setLastError(null); syncStorage(next); return next; });
  }, [syncStorage]);

  const toggleItem = useCallback((product: ProductInput) => {
    const normalized = normalizeCompareItem(product);
    setItems((prev) => {
      if (isInCompareList(prev, normalized.id)) {
        const next = removeCompareItem(prev, normalized.id);
        setLastError(null);
        syncStorage(next);
        return next;
      }
      const result = addCompareItem(prev, normalized);
      if (!result.added) setLastError(result.reason === 'MAX_ITEMS' ? `최대 ${COMPARE_MAX_ITEMS}개까지 비교할 수 있어요.` : '이미 비교 목록에 담긴 상품이에요.');
      else { setLastError(null); syncStorage(result.items); }
      return result.items;
    });
  }, [syncStorage]);

  const clear = useCallback(() => { const next = clearCompareItems(); setItems(next); setLastError(null); syncStorage(next); }, [syncStorage]);

  const count = items.length;
  const canAdd = count < COMPARE_MAX_ITEMS;
  const isInList = useCallback((productId: string) => isInCompareList(items, productId), [items]);

  return useMemo(() => ({ items, count, isLoaded, lastError, addItem, removeItem, toggleItem, clear, isInList, canAdd }), [items, count, isLoaded, lastError, addItem, removeItem, toggleItem, clear, isInList, canAdd]);
}
