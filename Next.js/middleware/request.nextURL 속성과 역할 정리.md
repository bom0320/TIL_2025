request.nextURL 속성과 역할 정리
===
Next.js의 `middleware` 또는 `Edge API Routes`에서 사용하는 `request.nextUrl`은 `URL`클래스의 인스턴스이며, 다양한 URL 관련 정보를 추출할 수 있었다.

## ✅ 주요 속성과 설명

| 표현 | 의미 |
| --- | --- |
| `request.nextUrl` | 전체 URL 정보를 담은 객체 (`URL` 인스턴스) |
| `request.nextUrl.origin` | **도메인과 프로토콜**만 추출 (예: `https://example.com`) |
| `request.nextUrl.pathname` | **경로(path)**만 추출 (예: `/callback`, `/signin`) |
| `request.nextUrl.searchParams` | URL의 **쿼리 파라미터 객체** (`get()`, `set()` 등의 메서드 사용 가능) |

---

## 예시
사용자가 아래 URL로 접근한 경우:

```perl
https://example.com/callback?code=abc123&state=xyz
```

```ts
request.nextUrl.origin        // "https://example.com"
request.nextUrl.pathname      // "/callback"
request.nextUrl.searchParams.get('code') // "abc123"
request.nextUrl.searchParams.get('state') // "xyz"
```

## 핵심 요약
- `request.nextUrl` 은 요청 URL 을 구조화해서 쉽게 다룰 수 있도록 해주는 객체이다.
- 속성들은 각각 URL 일부 정보만 분리해서 접근 가능하게 해준다.
- 특히 OAuth 콜백 처리나 라우팅 제어 시 매우 유용하게 사용된다.