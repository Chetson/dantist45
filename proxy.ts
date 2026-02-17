import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path.startsWith('/admin') && path !== '/admin/login') {
    const authCookie = request.cookies.get('auth');

    if (!authCookie) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      const auth = JSON.parse(authCookie.value);
      if (!auth.userId) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    } catch {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
