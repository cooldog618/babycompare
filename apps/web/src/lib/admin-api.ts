const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

export async function fetchAdminApi(path: string, init?: RequestInit) {
  const token = process.env.ADMIN_API_TOKEN;
  if (!token) return Response.json({ message: 'ADMIN_API_TOKEN is not configured.' }, { status: 500 });
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, { ...init, headers: { 'content-type': 'application/json', 'x-admin-token': token, ...(init?.headers || {}) }, cache: 'no-store' });
    const body = await response.text();
    return new Response(body, { status: response.status, headers: { 'content-type': response.headers.get('content-type') || 'application/json' } });
  } catch {
    return Response.json({ message: '관리 API 연결에 실패했습니다.' }, { status: 502 });
  }
}
