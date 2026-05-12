import { NextRequest, NextResponse } from 'next/server';

export function requireAdminBasicAuth(request: NextRequest): NextResponse | null {
  const user = process.env.ADMIN_USER;
  const password = process.env.ADMIN_PASSWORD;
  if (!user || !password) return NextResponse.json({ message: 'Admin credentials are not configured.' }, { status: 500 });
  const auth = request.headers.get('authorization');
  if (!auth?.startsWith('Basic ')) return unauthorized();
  const [inputUser, inputPass] = Buffer.from(auth.slice(6), 'base64').toString('utf8').split(':');
  if (inputUser !== user || inputPass !== password) return unauthorized();
  return null;
}

function unauthorized() {
  return new NextResponse('Authentication required', { status: 401, headers: { 'WWW-Authenticate': 'Basic realm="BabyCompare Admin"' } });
}
