import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath =
    path === "/" ||
    path === "/login" ||
    path === "/register" ||
    path === "/verify" ||
    path === "/about" ||
    path === "/faq" ||
    path === "/contact" ||
    path === "/admin/login" ||
    path.startsWith("/api/")

  // Check if path is admin-specific
  const isAdminPath =
    path.startsWith("/admin") && path !== "/admin/login" && !path.includes("/_next") && !path.includes("/favicon.ico")

  // Get the authentication token from cookies
  const authCookie = request.cookies.get("mtn_auth")

  // For demo purposes, we'll check localStorage via cookies
  // In a real app, you would use proper JWT tokens or session cookies
  const userCookie = request.cookies.get("mtn_user")
  let user = null
  let isAdmin = false

  if (userCookie) {
    try {
      user = JSON.parse(userCookie.value)
      isAdmin = user?.role === "admin"
    } catch (e) {
      // Invalid JSON in cookie
    }
  }

  // Update the redirect logic to be more permissive during development
  // If the user is not authenticated, redirect to login
  if (!isPublicPath && !authCookie) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Only redirect non-admin users trying to access admin routes
  // Make sure we're checking the role correctly
  if (isAdminPath && !isAdmin) {
    // For debugging, let's log what's happening
    console.log("Redirecting non-admin from admin path:", path)
    console.log("User:", user)
    console.log("Is admin:", isAdmin)

    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Allow the request to continue
  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public assets)
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}
