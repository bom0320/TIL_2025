Middleware로 로그인 검증하기
===

## Middleware란

미들웨어(middlware)란 Next.js 12버전 이후부터 도입됨

**서버에서 들어오는 요청(Request)와 응답(Response) 사이에서 실행되는 함수**이다.

미들웨어는 요청이 완료되기 전에, 실행되어서 요청 또는 헤더를 다시 작성, 리다이렉션, 수정하거나 직접 응답하여 응답이 가능하다.

이를 통해 Next.js 미들웨어 공식 문서에서 아래와 같은 작업을 예시로 보여준다

### 인증 및 권한 부여:

특정 페이지나 API 경로에 대한 액세스 권한을 부여하기 전에 사용자 신원을 확인하고 세션 쿠키를 확인한다.

### 서버 측 리다이렉션:

특정 조건(ex: locale, user role) 에 따라 서버 수준에서 사용자를 리다이렉션한다.

### 경로 재작성:

요청 속성에 따라 API 경로나 페이지에 대한 경로를 동적으로 다시 작성하여 A/B 테스트, 기능 출시 도는 레거시 경로를 지원한다.

### 봇 감지:

봇 트래픽을 감지하고 차단하여 리소스를 보호한다.

### 로깅 및 분석:

페이지나 API에서 처리하기 전에 요청 데이터를 캡쳐하고 분석하여 통찰력을 얻는다.

### 기능 플래깅:

원활한 기능 출시 또는 테스트를 위해 기능을 동적으로 활성화 하거나 비활성화한다.

---

## middlware 활용해보기

미들웨어를 활용한다면 **요청을 보내고 응답 전에 작업하기에 용이**하다.

예를 들어 서버에 로그인 요청을 보내고 로그인이 성공한다면 세션 아이디를 쿠키로 전달 받는다고 생각해보자. 그렇다면 미들웨어는 먼저 **요청의 결과를 응답받기 전**에 쿠키에 대한 값을 확인할 수 있을 것이다.

그럼 미들웨어를 통해 로그인 여부를 먼저 확인하고 검증을 통해 실패한다면, 로그인 페이지로 리다이렉트 처리하는 미들웨어를 만들어보자.

먼저 미들웨어를 만들기 위해 루트 디렉토리에 ‘middleware.js’ 파일을 생성해야 한다. 생성 후 아래와 같이 코드를 작성해주면 미들웨어 생성이 된 것이다.

```tsx
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: nextRequest) {
	return NextResponse.redirect(new URL('/home', request.url));
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: '/about:path';
}
```

---

### Matcher

**Middleware 실행 순서**

1. next.config.js → headers, redirects
2. Middleware (모든 요청 기본 통과)
3. beforeFiles
4. 파일 시스템 (public, pages, app)
5. afterFiles
6. Dynamic routes ( `/card/[id]` )
7. fallback

따라서 matcher로 범위 제한이 필요

**핵심**

- Middleware는 모든 요청에서 실행된다.
  - 즉, `/` 페이지 하나만 열어도 css/js/image 같은 리소스 요청까지 전부 미들웨어를 통과해버리게 된다.
- 따라서 **matcher을 통해 특정 경로만 적용**하도록 제한해야한다.

```tsx
export const config = {
  matcher: "/about/:path*",
};
```

**Matcher규칙**

- 항상 `/` 로 시작해야 한다.
- `:path` → 한 단계만 매칭 (`/about/a` ✅, `/about/a/b` ❌)
- `:path*` → 여러 단계 매칭 (`/about/a/b/c` ✅)
- `:path?` → 0개 또는 1개 (`/about`, `/about/a` ✅)
- `:path+` → 1개 이상 (`/about/a`, `/about/a/b` ✅, `/about` ❌)
- 정규식도 가능: `/about/(.*)` = `/about/:path*`

---

## 로그인 검증 후 리다이렉트 해보기

그럼 생성된 미들웨어를 수정하여 아래와 같은 절차로 로그인 로직에 활용해보자

해당 로직은 서버에 로그인 요청을 보낸 후 실행되기 때문에 로그인 요청과 서버 로직이 따로 필요하다.

1. API 요청 후 전달받은 쿠키를 통해 세션 아이디 확인하기 → 쿠키에 ‘JSESSIONID’ 가 없다면 로그인 실패 있다면 성공
2. 인증되지 않은 사용자는 로그인 페이지로 리다이렉트
3. matcher를 통해 미들웨어를 적용할 페이지 설정 → main 페이지는 로그인이 필요없기 때문에 로그인이 필요한 경로만 설정

```tsx
import {NextResponse} from 'next/server';

// 쿠키에서 인증 토큰 확인하는 함수
async function checkAuthentication(request) {
	// 브라우저 쿠키에서 'JSESSIONID' 토큰 가져오기
	const token = request.cookies.get('JSESSIONID');

	// 토큰이 없다면 인증 실패
	if(!token) return false;

	// 추가 검증 로직을 여기에 추가 가능 (ex. 토큰 유효성 검증 API 호출)
	return true;
}

// 미들웨어 함수 정의
export async functinon middleware(request) {
	// 인증 상태 확인
	const isAuthenticated = await checkAuthentication(request);

	// 인증되지 않은 사용자는 로그인 페이지로 리다이렉션
	if(!isAuthenticated){
		return NextResponse.redirect(new URL('/signin', redirect.url));
	}

	// 인증된 사용자는 요청 페이지로 진행
	return NextResponse.next();
}

// 미들웨어 적용 경로 설정
export const config= {
	matcher: ['/study','/roadmap','profile'], // 해당 경로에만 미들웨어 적용
};
```

이제 각 함수에 대해 알아보자. checkAuthentication 함수를 정의해 로그인을 검증하고 미들웨어에서 작업을 처리할 수 있도록 하였따.

- checkAuthentiction 함수
  - 사용자의 브러우저 쿠키에서 JSESSIONID 토큰을 확인한다.
  - 토큰이 없다면 false를 반환하며, 추가적인 검증 로직(API 호출 등)을 추가할 수도 있다.
- middleware 함수
  - 요청 객체(request)를 받아서 checkAuthentication 를 통해 인증 상태를 확인한다.
  - 인증되지 않은 사용자는 /signin 페이지로 리다이렉션되며 인증된 사용자는 원래 요청한 페이지로 진행한다.
- config 객체
  - 미들웨어를 적용할 경로를 설정한다. 예시로 /study, /roadmap, /profile 에만 인증 검사를 적용한다.

페이지 이동 시 로그인을 강제하고 로그인이 성공한다면 그 이후에는 페이지 이동에 대한 권한이 생긴다.
