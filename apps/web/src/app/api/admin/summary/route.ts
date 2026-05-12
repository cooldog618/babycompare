import { NextRequest } from 'next/server';
import { requireAdminBasicAuth } from '@/lib/admin-auth';
import { fetchAdminApi } from '@/lib/admin-api';

export async function GET(request: NextRequest) {
  const auth = requireAdminBasicAuth(request);
  if (auth) return auth;
  return fetchAdminApi('/admin/summary');
}
