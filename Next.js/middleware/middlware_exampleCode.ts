// 1. 필요한 모듈 import
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 2. middleware 함수 정의
export function middleware(request: NextRequest) {
  // 3. 요청 정보 추출 (경로, 쿠키, 쿼리 등)
  const accessToken = request.cookies.get('accessToken')?.value;
  const url = request.nextUrl.pathname;

  // 4. 공개 접근 허용 경로 정의
  const publicPaths = ['/signin', '/signup', '/callback'];
  const isPublic = publicPaths.some((path) => url.startsWith(path));

  // 5. 비로그인 상태에서 보호된 페이지 접근 → 로그인 페이지로 리다이렉트
  if (!accessToken && !isPublic) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // 6. 로그인된 사용자가 로그인 페이지 접근 시 → 홈으로 리다이렉트
  if (accessToken && url === '/signin') {
    return NextResponse.redirect(new URL('/stage', request.url));
  }

  // 7. 그 외에는 그냥 통과
  return NextResponse.next();
}

// 8. middleware가 적용될 경로 설정
export const config = {
  matcher: [
    '/',
    '/stage/:path*',
    '/my/:path*',
    '/admin/:path*',
    '/signin',
    '/signup',
    '/callback',
  ],
};
