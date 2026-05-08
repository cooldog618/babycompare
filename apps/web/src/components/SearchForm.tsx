'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useId, useState } from 'react';
import { buildSearchRoute } from '../lib/routes';

interface SearchFormProps {
  initialQuery?: string;
  placeholder?: string;
  submitLabel?: string;
  className?: string;
}

export function SearchForm({
  initialQuery = '',
  placeholder = '유모차, 카시트, 분유를 검색해 보세요',
  submitLabel = '검색',
  className
}: SearchFormProps) {
  const [query, setQuery] = useState(initialQuery);
  const [error, setError] = useState('');
  const inputId = useId();
  const router = useRouter();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      setError('검색어를 입력해 주세요.');
      return;
    }

    setError('');
    router.push(buildSearchRoute(trimmed, 'relevance', 1));
  }

  return (
    <form onSubmit={onSubmit} className={className} noValidate>
      <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-slate-800">
        검색어 입력
      </label>
      <div className="flex gap-2">
        <input
          id={inputId}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
        />
        <button
          type="submit"
          className="rounded-xl bg-sky-500 px-4 py-3 text-sm font-semibold text-white hover:bg-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
        >
          {submitLabel}
        </button>
      </div>
      {error ? <p className="mt-2 text-sm text-rose-600">{error}</p> : null}
    </form>
  );
}
