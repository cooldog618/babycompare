import Link from 'next/link';

async function getSummary() { const res = await fetch('http://localhost:3000/api/admin/summary', { cache: 'no-store' }); if (!res.ok) return null; return res.json(); }

export default async function AdminPage() {
  const data = await getSummary();
  return <main className='mx-auto max-w-5xl p-4 space-y-4'><h1 className='text-2xl font-bold'>BabyCompare Admin</h1><p>MVP 확인용 관리 화면입니다.</p><div className='rounded border border-amber-300 bg-amber-50 p-3 text-sm'>이 화면은 운영용 정식 관리자 페이지가 아닙니다.</div>{data ? <div className='grid grid-cols-2 gap-3'><div>총 상품 수: {data.totalProducts}</div><div>노출 상품 수: {data.visibleProducts}</div><div>숨김 상품 수: {data.hiddenProducts}</div><div>DEMO/NAVER/MANUAL: {data.bySource.DEMO}/{data.bySource.NAVER}/{data.bySource.MANUAL}</div></div> : <p>요약 정보를 불러오지 못했습니다.</p>}<Link className='inline-block rounded bg-slate-900 px-4 py-2 text-white' href='/admin/products'>상품 관리로 이동</Link></main>;
}
