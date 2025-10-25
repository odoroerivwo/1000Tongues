import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token');
  const { pathname } = request.nextUrl;

  // Debug logging
  console.log('Middleware triggered for:', pathname);
  console.log('Token exists:', !!token);
  
  // Verify token if it exists using jose (Edge-compatible)
  let isAuthenticated = false;
  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token.value, secret);
      console.log('Token verified successfully');
      isAuthenticated = true;
    } catch (error) {
      console.log('Token verification failed:', error instanceof Error ? error.message : 'Unknown error');
      isAuthenticated = false;
    }
  }

  // Public routes - redirect to dashboard if already authenticated
  if (pathname === '/login') {
    if (isAuthenticated) {
      console.log('Redirecting authenticated user from /login to /dashboard');
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // Protected routes - redirect to login if not authenticated
  if (pathname.startsWith('/dashboard')) {
    if (!isAuthenticated) {
      console.log('Redirecting unauthenticated user from /dashboard to /login');
      return NextResponse.redirect(new URL('/login', request.url));
    }
    console.log('Allowing authenticated user to access dashboard');
    return NextResponse.next();
  }

  // Root path - redirect based on authentication status
  if (pathname === '/') {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/login'],
};