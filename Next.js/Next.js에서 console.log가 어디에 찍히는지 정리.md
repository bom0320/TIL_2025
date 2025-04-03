Next.js에서 console.log가 어디에 찍히는지 정리
===

## 기본 구조
- `page.tsx` 는 기본적으로 **서버 컴포넌트 (Server Component)**
- `use client` 선언 시 → **클라이언트 컴포넌트 (Client Component)**

---

### 서버 컴포넌트일 경우

```tsx
export default function Page({ params }) {
  console.log(params);
  return <h1>Movie</h1>;
}
```
- 터미널에만 출력됨
- **브라우저 console 에는 안 찍힘**
    - **이유 :** 컴포넌트가 서버에서 렌더링(SSR)되기 때문

---

### 클라이언트 컴포넌트로 바꾼 경우

```tsx
'use client';

export default function Page({ params }) {
  console.log(params);
  return <h1>Movie</h1>;
}
```
- 브라우저 콘솔에 출력됨
- ❗ 클라이언트에서만 작동, 일부 서버 기능 사용 불가

----

## 🔚 핵심 요약 한 줄
> `page.tsx`는 기본적으로 서버에서 실행되므로, 
> `console.log`는 브라우저가 아닌 터미널에 찍힌다. 
> 브라우저 콘솔에서 보려면 `use client`를 선언해야 함