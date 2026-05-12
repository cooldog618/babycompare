import { NextRequest, NextResponse } from 'next/server';
import { requireAdminBasicAuth } from './lib/admin-auth';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin') || request.nextUrl.pathname.startsWith('/api/admin')) {
    const auth = requireAdminBasicAuth(request);
    if (auth) return auth;
  }
  return NextResponse.next();
}

export const config = { matcher: ['/admin/:path*', '/api/admin/:path*'] };
