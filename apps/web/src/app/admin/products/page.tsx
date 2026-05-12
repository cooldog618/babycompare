'use client';

import { useCallback, useEffect, useState } from 'react';

type AdminProduct = {
  id: string;
  title: string;
  source: 'ALL' | 'DEMO' | 'NAVER' | 'MANUAL' | string;
  categoryPath: string | null;
  price: number;
  seller: string | null;
  isVisible: boolean;
};

export default function AdminProductsPage() {
  const [items, setItems] = useState<AdminProduct[]>([]);
  const [q, setQ] = useState('');
  const [source, setSource] = useState<'ALL' | 'DEMO' | 'NAVER' | 'MANUAL'>('ALL');
  const [visible, setVisible] = useState<'all' | 'true' | 'false'>('all');

  const load = useCallback(async () => {
    const res = await fetch(`/api/admin/products?q=${encodeURIComponent(q)}&source=${source}&visible=${visible}`);
    const data = (await res.json()) as { items?: AdminProduct[] };
    setItems(data.items ?? []);
  }, [q, source, visible]);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <main className='mx-auto max-w-6xl space-y-4 p-4'>
      <h1 className='text-2xl font-bold'>Admin Products</h1>
      <div className='flex gap-2'>
        <input className='border p-2' value={q} onChange={(e) => setQ(e.target.value)} placeholder='검색어' />
        <select className='border p-2' value={source} onChange={(e) => setSource(e.target.value as 'ALL' | 'DEMO' | 'NAVER' | 'MANUAL')}>
          <option>ALL</option><option>DEMO</option><option>NAVER</option><option>MANUAL</option>
        </select>
        <select className='border p-2' value={visible} onChange={(e) => setVisible(e.target.value as 'all' | 'true' | 'false')}>
          <option value='all'>전체</option><option value='true'>노출</option><option value='false'>숨김</option>
        </select>
        <button className='border px-3' onClick={() => void load()}>조회</button>
      </div>
      <div className='space-y-2'>
        {items.map((item) => (
          <div key={item.id} className='rounded border p-3'>
            <div className='font-medium'>{item.title}</div>
            <div className='text-sm'>{item.source} · {item.categoryPath}</div>
            <div className='text-sm'>{item.price}원 · {item.seller}</div>
            <div className='mt-2 flex gap-2'>
              <button
                className='border px-2'
                onClick={async () => {
                  await fetch(`/api/admin/products/${item.id}/visibility`, { method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ isVisible: !item.isVisible }) });
                  await load();
                }}
              >
                {item.isVisible ? '숨김' : '복구'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
