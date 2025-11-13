// middleware.ts
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth({
  // Redirect to sign-in page if not authenticated
  pages: {
    signIn: "/api/auth/signin"
  }
})

// Protect only /admin routes
export const config = {
  matcher: ["/admin/:path*"] // all /admin/* paths
}
