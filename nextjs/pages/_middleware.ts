import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { getAuthToken } from '@/serverSrc/services/auth.service';

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const response = NextResponse.next();
  
  return response;
}