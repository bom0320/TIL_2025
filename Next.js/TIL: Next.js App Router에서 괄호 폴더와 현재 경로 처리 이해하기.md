TIL: Next.js App Router에서 괄호 폴더와 현재 경로 처리 이해하기
===

### ✅ 1. `usePathname()`로 현재 경로(pathname) 확인하기

- `usePathname()`은 Next.js 클라이언트 컴포넌트에서 현재 브라우저의 **URL 경로(path)**를 가져오는 훅이다.
- 이를 통해 현재 사용자가 어떤 페이지에 있는지 확인하고, 동적으로 UI를 변경할 수 있다.

```tsx

import { usePathname } from "next/navigation";

const path = usePathname();
console.log(path); // 예: '/', '/about-us', '/movies/123' 등

```

---

### ✅ 2. Navigation 컴포넌트에서 경로에 따라 🔥 표시하기

```tsx

<Link href="/">Home</Link> {path === "/" ? "🔥" : ""}
<Link href="/about-us">About us</Link> {path === "/about-us" ? "🔥" : ""}

```

- 현재 경로와 일치하는 메뉴 항목에 🔥 이모지를 붙여서 사용자에게 위치를 시각적으로 표시할 수 있다.

---

### ✅ 3. Next.js에서 괄호 폴더 `(group)`의 의미

### ✅ (괄호 폴더)는 “URL에 영향을 주지 않는 Grouping 폴더”

Next.js 13 이상에서는 `app/` 디렉토리를 사용할 때,

**괄호로 감싼 폴더는 URL 경로에 포함되지 않도록 만들어주는 특별한 규칙**이 있다.

이를 **“Group Segment”** 또는 **“Layout Group”**이라고 부른다.

> 📌 app/(home)/page.tsx
> 
> 
> → 실제 URL 경로: `/`
> 

즉, **`(home)`은 폴더명일 뿐이고, URL에는 전혀 영향이 없다.**

그래서 `app/page.tsx`가 없는 경우에도 `app/(home)/page.tsx`가 마치 그것처럼 **`/` 경로로 동작**한다.

이 기능은 **프로젝트 폴더 구조를 깔끔하게 정리하고 싶을 때 유용**하다.

---

### ✅ 4. `layout.tsx`의 역할

```tsx

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <Navigation />
        {children} {/* 여기에 각 page.tsx가 자동으로 들어옴 */}
      </body>
    </html>
  );
}

```

- `app/layout.tsx`는 **모든 페이지에 공통으로 적용되는 레이아웃**을 정의한다.
- `Navigation` 같은 공통 UI는 여기에서 렌더링하고, `{children}` 자리에 각 경로의 `page.tsx`가 자동으로 들어온다.

---

### 🔁 요약

| 항목 | 내용 |
| --- | --- |
| `usePathname()` | 현재 URL 경로 확인 가능 |
| `path === "/about-us"` | 경로 비교로 현재 위치 확인 가능 |
| `(home)` 폴더 | URL에 포함되지 않는 그룹 세그먼트 (Group Segment) |
| `app/(home)/page.tsx` | 마치 `app/page.tsx`처럼 `/` 경로를 담당 |
| `layout.tsx` | 전체 앱에 공통 UI 제공 (ex. Navigation) |

---

> 📘 이 TIL은 Next.js App Router의 구조적 특성과 Group Segment의 역할, 그리고 클라이언트 사이드 경로 감지 방식(usePathname)에 대해 질문을 통해 학습하며 정리한 내용입니다.
>