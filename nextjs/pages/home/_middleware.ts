import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { getAuthToken } from '@/serverSrc/services/auth.service';

export function middleware(req: NextRequest, ev: NextFetchEvent) {

  const authToken = getAuthToken(req.cookies);
  if ((!authToken || !authToken.loggedIn)) {
    return NextResponse.redirect(`${req.nextUrl.origin}/login`);
  }

  return NextResponse.next();
}