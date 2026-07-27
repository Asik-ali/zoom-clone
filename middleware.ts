import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const protectedRoute = createRouteMatcher([
  '/',
  '/upcoming',
  '/meeting(.*)',
  '/previous',
  '/recordings',
  '/personal-room',
]);

export default clerkMiddleware((auth, req) => {
  if (protectedRoute(req)) {
    const { userId } = (auth() as any);
    if (!userId) {
      const signInUrl = new URL('/sign-in', req.url);
      signInUrl.searchParams.set('redirect_url', req.url);
      return NextResponse.redirect(signInUrl);
    }
  }
});

// ✅ This catches everything except static assets
export const config = {
  matcher: [
    '/(api|trpc)(.*)',
    '/__clerk/:path*',    // ← ensure this line exists
    '/((?!_next/static|_next/image|favicon.ico).*)'
  ],
};