'use client';
import { useEffect, useState } from 'react';

type Product = any;
export default function AdminProductsPage() {
  const [items, setItems] = useState<Product[]>([]); const [q,setQ]=useState(''); const [source,setSource]=useState('ALL'); const [visible,setVisible]=useState('all');
  const load=async()=>{const res=await fetch(`/api/admin/products?q=${encodeURIComponent(q)}&source=${source}&visible=${visible}`); const data=await res.json(); setItems(data.items||[]);};
  useEffect(()=>{void load();},[]);
  return <main className='mx-auto max-w-6xl p-4 space-y-4'><h1 className='text-2xl font-bold'>Admin Products</h1><div className='flex gap-2'><input className='border p-2' value={q} onChange={e=>setQ(e.target.value)} placeholder='검색어'/><select className='border p-2' value={source} onChange={e=>setSource(e.target.value)}><option>ALL</option><option>DEMO</option><option>NAVER</option><option>MANUAL</option></select><select className='border p-2' value={visible} onChange={e=>setVisible(e.target.value)}><option value='all'>전체</option><option value='true'>노출</option><option value='false'>숨김</option></select><button className='border px-3' onClick={load}>조회</button></div><div className='space-y-2'>{items.map((item)=><div key={item.id} className='border p-3 rounded'><div className='font-medium'>{item.title}</div><div className='text-sm'>{item.source} · {item.categoryPath}</div><div className='text-sm'>{item.price}원 · {item.seller}</div><div className='flex gap-2 mt-2'><button className='border px-2' onClick={async()=>{await fetch(`/api/admin/products/${item.id}/visibility`,{method:'PATCH',headers:{'content-type':'application/json'},body:JSON.stringify({isVisible:!item.isVisible})});load();}}>{item.isVisible?'숨김':'복구'}</button></div></div>)}</div></main>;
}
