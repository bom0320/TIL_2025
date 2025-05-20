Next.js Middleware에서 인증 상태에 따라 경로 제어하기
===

### 주제
Next.js의 `middleware` 에서 로그인 상태에 따라 사용자 접근 경로를 제어하는 방법과 조건 분기 처리 방식 비교

## 개념 요약

### 1. Middleware란?
Next.js의 `middleware` 는 사용자 요청(request)을 페이지로 도달하기 전에 가로채서 인증, 리다이렉션 등의 처리를 할 수 있는 기능이다.

```ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 조건에 따라 리턴 제어
  return NextResponse.next();
}
```
### 👉 목적

- 비로그인 사용자가 보호된 페이지 접근 시 → `/signin`으로 리디렉트
- 로그인한 사용자가 `/signin`에 접근 시 → 홈(`/stage`)으로 리디렉트

---

### 3. `pathname` 비교 방식 차이

| 방식 | 설명 | 예시 | 특징 |
| --- | --- | --- | --- |
| `startsWith()` | 특정 경로로 시작하는지 확인 | `/admin/notice` → `/admin` 매칭됨 | 하위 경로 포함 |
| `includes()` | 정확히 일치하는 경로가 리스트에 있는지 확인 | `/signin` → `['/signin', '/callback']` | 다수 경로 간단 비교 |
| `===` | 경로가 정확히 같은지 비교 | `url === '/signin'` | 단일 경로 명시적 비교에 적합 |

### 사용 예시

```ts

const url = request.nextUrl.pathname;
url.startsWith('/admin');
publicPaths.includes(url);
url === '/signin';

```

## 📝 실전 팁

- `url === '/signin'` : 특정 경로만 정확하게 제어하고 싶을 때 사용
- `includes()` : 여러 공개 경로를 관리할 때 유용
- `startsWith()` : 경로가 `/admin/`, `/my/`처럼 **계층 구조**일 때 유용

---
