# Kakao OAuth 로그인 구현

## 1. Kakao OAuth 기본 흐름 이해

- **로그인 버튼 클릭 → Kakao 인증 페이지 → redirect_uri로 code 전달 → 서버에서 code로 accessToken 교환 → 쿠키 저장**
- 핵심은 "클라이언트에서 code 받기"까지만 하고, **accessToken 교환은 서버(백엔드)에서 처리**하는 것.

---

## 2. Next.js 클라이언트에서 Kakao 로그인 버튼 만들기

- `NEXT_PUBLIC_KAKAO_CLIENT_ID`를 사용해 Kakao 로그인 URL 생성.
- `window.location.href`로 Kakao 로그인 페이지로 이동.
- **주의**: `window`는 브라우저에서만 존재하므로 `use client` 컴포넌트 안에서만 접근 가능.

---

## 3. 콜백 페이지(`auth/oauth/kakao/page.tsx`)

- Kakao가 redirect_uri로 code를 붙여서 리다이렉트.
- 클라이언트 페이지에서 code를 읽고, 우리 서버(`/api/auth/kakao`)로 전달.
- 서버는 이 code를 백엔드 API에 넘겨서 accessToken 발급받음.

---

## 4. Next.js API Route에서 토큰 교환

- **두 가지 방식 실험**:
  1. Next.js API에서 직접 `https://kauth.kakao.com/oauth/token` 호출.
  2. 우리 백엔드(`festival-api.bricn.net`)의 `/auth/oauth/login/{code}`로 넘기고, 백엔드가 카카오와 통신.
- **최종 선택**: 백엔드가 토큰 교환을 전담하도록 위임.
  → FE는 code만 넘겨주고, BE가 토큰을 Kakao에서 받아와서 FE로 전달.

---

## 5. HttpOnly 쿠키에 accessToken 저장

- `NextResponse.cookies.set`으로 브라우저에 저장.
- HttpOnly, Secure, SameSite 설정 필수.
- 이 쿠키를 통해 인증 상태 유지 → FE는 토큰을 직접 보관하지 않음.

---

## 6. 디버깅 과정에서 배운 점

- **KOE006**: Kakao 콘솔에 redirect_uri 등록 안 하면 발생.
- **KOE320**: authorization code 한 번 쓰면 재사용 불가. 새 code 받아야 함.
- `Invalid URL`: axios/fetch 호출 시 **절대 경로** 필요. (ex. `/auth/...` 대신 `https://festival-api.bricn.net/auth/...`)
- Next.js에서 `window` 접근 시 서버사이드에서 터지는 문제 해결 → `use client` 컴포넌트로 분리.

---

## 7. 이미지 에러 경험

- `/img/kakao.png` 404 → public 디렉토리에 정적 리소스 넣어야 함 (`/public/kakao.png`).

---
