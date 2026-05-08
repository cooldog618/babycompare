import './globals.css';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { CompareBadge } from '../components/CompareBadge';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-slate-50 text-slate-900 antialiased">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <Link href="/" className="font-semibold">BabyCompare</Link>
            <CompareBadge />
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
