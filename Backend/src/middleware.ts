import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple in-memory rate limiter for demonstration
// Note: In production (Vercel/Cloudflare), you would use Redis or a platform-native rate limiter.
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

export function middleware(request: NextRequest) {
  const ip = request.ip ?? '127.0.0.1';
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 10;

  const rateData = rateLimitMap.get(ip) || { count: 0, lastReset: now };

  // Reset window if expired
  if (now - rateData.lastReset > windowMs) {
    rateData.count = 0;
    rateData.lastReset = now;
  }

  rateData.count++;
  rateLimitMap.set(ip, rateData);

  if (rateData.count > maxRequests) {
    return new NextResponse(JSON.stringify({ message: 'Too many requests. Please try again in a minute.' }), {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  // Get the response
  const response = NextResponse.next();

  // Add CORS headers
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  return response;
}

// Specify which paths this middleware should run on
export const config = {
  matcher: '/api/:path*',
};
