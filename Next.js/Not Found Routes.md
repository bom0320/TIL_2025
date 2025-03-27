Not Found Routes
===

## 1. not-found.tsx
- `not-found.tsx`는 **존재하지 않는 전역 URL 요청**을 처리하는 페이지이다.
- 예를 들어, 존재하지 않는 경로로 접근했을 때, 404 페이지를 보여주는 역할을 한다.

> https://nextjs.org/docs/app/api-reference/file-conventions/not-found


---

## 2. usePathname()
- `usePathname`은 현재 URL의 pathname 값을 가져올 수 있는 **클라이언트 컴포넌트 전용 훅**이다.
- 서버 컴포넌트에서는 사용할 수 없고, **'use client'** 지시어가 있는 컴포넌트에서만 사용 가능하다. 
- 예시: 현재 경로에 따라 특정 UI 를 조건부 렌더링할 때 활용

> https://nextjs.org/docs/app/api-reference/functions/use-pathname

---

## 3. React Client Hook in Server Components 오류
- `usePathname`과 같은 클라이언트 전용 훅을 **서버 컴포넌트에서 사용하면 오류 발생**
- 오류 메시지: **React client hook in Server Component**
- 해결 방법: 해당 파일 상단에 `use client` 지시어를 추가하여 클라이언트 컴포넌트로 변경

> https://nextjs.org/docs/messages/react-client-hook-in-server-component