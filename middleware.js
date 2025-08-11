import { NextResponse } from 'next/server';

export async function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Check if it's an admin route
  if (pathname.startsWith('/admin')) {
    // Allow admin login page without authentication
    if (pathname === '/admin' || pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Check if user is authenticated for other admin routes
    const token = request.cookies.get('admin-token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    // Verify token (simple check - in production use proper JWT verification)
    try {
      const payload = JSON.parse(Buffer.from(token, 'base64').toString());
      const isExpired = Date.now() - payload.timestamp > 24 * 60 * 60 * 1000;
      
      if (isExpired) {
        const response = NextResponse.redirect(new URL('/admin', request.url));
        response.cookies.delete('admin-token');
        return response;
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    return NextResponse.next();
  }

  // Check maintenance mode for non-admin routes
  if (!pathname.startsWith('/admin') && !pathname.startsWith('/api/admin')) {
    // Allow API routes and static files during maintenance
    if (pathname.startsWith('/api/') || 
        pathname.startsWith('/_next/') || 
        pathname.includes('.') ||
        pathname === '/maintenance') {
      return NextResponse.next();
    }

    // Check maintenance status from environment or simple storage
    // We'll use a simple approach for Edge runtime compatibility
    try {
      // Check if maintenance mode is enabled via a simple API call
      const maintenanceCheckUrl = `${request.nextUrl.origin}/api/maintenance-check`;
      const maintenanceResponse = await fetch(maintenanceCheckUrl, {
        headers: { 'x-internal': 'true' }
      });
      
      if (maintenanceResponse.ok) {
        const { enabled } = await maintenanceResponse.json();
        if (enabled) {
          return NextResponse.redirect(new URL('/maintenance', request.url));
        }
      }
    } catch (error) {
      // Silent fail - continue normally if maintenance check fails
      console.error('Maintenance check failed:', error);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public|assets).*)',
  ],
};
