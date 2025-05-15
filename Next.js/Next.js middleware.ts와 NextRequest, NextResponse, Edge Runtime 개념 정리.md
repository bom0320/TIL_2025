Next.js middleware.ts와 NextRequest, NextResponse, Edge Runtime 개념 정리
===

## middleware.ts 란?
- Next.js에서 요청(Request)을 페이지로 보내기 전에 가로채서 검사하거나 리다이렉트할 수 있는 기능
- 보통 로그인 여부, 권한 검사, 리다이렉트 처리 등에 사용된다.
- `middleware.ts`는 프로젝트 루트(최상단)에 위치하며, `export const config`로 어떤 경로에 적용할지 지정한다.

---

### 먼저 요점 요약
| 구분 | 일반 API Routes (`pages/api/...`) | Middleware (`middleware.ts`) |
| --- | --- | --- |
| 실행 환경 | Node.js | **Edge Runtime (V8 기반 런타임)** |
| 요청 객체 | `req: IncomingMessage` | `request: NextRequest` |
| 응답 객체 | `res: ServerResponse` | `NextResponse` |
| 주요 목적 | 데이터 처리 (로그인, DB 등) | 요청 가로채기, 리디렉트, 접근 제어 등 |
| 동작 위치 | **서버 쪽만** | 서버와 가까운 **엣지(전 세계 CDN)** |

## 실행 환경: Edge Runtime
- `middleware.ts`는 일반 Node.js 환경이 아닌 Edge 환경에서 실행됨
- Edge는 전 세계 사용자왁 가까운 CDN 서버처럼 작고 빠른 실행 공간
- 덕분에 빠르게 요청을 처리하거나 리다이렉트할 수 있다(서버까지 가지 않고)

## 왜 일반 `req`, `rds`를 못 쓰는가?
- Node.js의 `req`, `res`는 Edge 환경에서 지원되지 않음
- 대신 Next.js는 Edge 전용 요청/응답 객체인 `NextRequest`, `NextResponse`를 제공함

---

## ✅ NextRequest
- 들어온 요청을 표현하는 객체
- 주요 메서드 및 속성:

| 속성/메서드 | 설명 |
| --- | --- |
| `request.nextUrl.pathname` | 요청한 경로 (예: `/stage`) |
| `request.nextUrl.searchParams.get('code')` | 쿼리 파라미터 확인 |
| `request.cookies.get('accessToken')?.value` | 쿠키 값 확인 |
| `request.headers.get('User-Agent')` | 헤더 정보 확인 |

## ✅ NextResponse
- 요청에 대한 웅답을 조작하는 객체
- 주요 메서드:
| 메서드 | 설명 |
| --- | --- |
| `NextResponse.next()` | 요청을 페이지로 통과시킴 |
| `NextResponse.redirect(url)` | 리다이렉트 처리 |
| `NextResponse.rewrite(url)` | 내부적으로 경로 변경 |
| `response.cookies.set(name, value)` | 쿠키 저장 |
| `response.cookies.delete(name)` | 쿠키 삭제 |

## 일반적인 middleware.ts 작성 흐름
1. `NextRequest`, `NextResponse` import
2. 요청 정보 추출 (URL, 쿠키, 쿼리 등)
3. 공개 경로 정의 (`/signin`, `/signup` 등)
4. 분기 처리 (로그인 안 된 사용자 차단 등)
5. `NextResponse.next()`로 통과 or `redirect()` 로 리다이렉트
6. `config.matcher` 로 감시할 경로 설정

### 예시 코드

```ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  const pathname = request.nextUrl.pathname;

  const publicPaths = ['/signin', '/signup', '/callback'];
  const isPublic = publicPaths.some((path) => pathname.startsWith(path));

  if (!accessToken && !isPublic) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  if (accessToken && pathname === '/signin') {
    return NextResponse.redirect(new URL('/stage', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/stage/:path*',
    '/my/:path*',
    '/signin',
    '/signup',
    '/callback',
  ],
};

```

## 정리 요약
- `middleware.ts`는 요청을 검사하고 제어하는 **보안 게이트**
- 일반 `res`, `req` 대신 Edge 환경에 맞는 `NextRequest`, `NextResponse` 사용
- 사용자의 로그인 상태나 요청 경로에 따라 페이지 접근을 허용하거나 리다이렉트함
- 페이지에 도달하기 전에 실행되므로 빠르고 효율적!