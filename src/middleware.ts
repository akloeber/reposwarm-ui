import { NextRequest, NextResponse } from 'next/server'

// Inject Authorization header on /v1/* requests before the rewrite proxies
// them to the API server. In production, Lambda@Edge sets the reposwarm-ui-auth
// cookie instead — this middleware only activates when REPOSWARM_API_TOKEN is set
// (local Docker / dev environments without Lambda@Edge).
export function middleware(request: NextRequest) {
  const token = process.env.REPOSWARM_API_TOKEN
  if (!token) return NextResponse.next()

  const headers = new Headers(request.headers)
  if (!headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  return NextResponse.next({ request: { headers } })
}

export const config = {
  matcher: '/v1/:path*'
}
