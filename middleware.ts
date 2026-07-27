 

// ✅ This catches everything except static assets
export const config = {
  matcher: [
    '/(api|trpc)(.*)',
    '/__clerk/:path*',    // ← ensure this line exists
    '/((?!_next/static|_next/image|favicon.ico).*)'
  ],
};