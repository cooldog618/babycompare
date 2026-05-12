import { NextRequest } from 'next/server';
import { requireAdminBasicAuth } from '@/lib/admin-auth';
import { fetchAdminApi } from '@/lib/admin-api';

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = requireAdminBasicAuth(request);
  if (auth) return auth;
  const body = await request.text();
  const { id } = await params;
  return fetchAdminApi(`/admin/products/${encodeURIComponent(id)}/visibility`, { method: 'PATCH', body });
}
