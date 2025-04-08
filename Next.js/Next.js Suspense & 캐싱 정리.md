Next.js Suspense & 캐싱 정리
===

### ✅ 1. **React Suspense의 변화**

### 🔸 Before (기존 방식)

- 데이터를 `fetch`하는 동안 **전체 페이지가 로딩 화면으로 대체됨.**
- 사용자에게 아무것도 보이지 않는 상태가 발생 → UX 저하

### 🔸 After (Next.js 13+ / React 18 Suspense 도입)

- 이제 페이지 전체가 아니라, **특정 컴포넌트 단위로 로딩 상태를 지정 가능**함.
- `Suspense` 컴포넌트를 사용해서 **부분 로딩 처리** 가능

```tsx

import { Suspense } from 'react';
import MyComponent from './MyComponent';

export default function Page() {
  return (
    <div>
      <h1>페이지 제목</h1>
      <Suspense fallback={<p>불러오는 중...</p>}>
        <MyComponent />
      </Suspense>
    </div>
  );
}

```

🟡 결과: 전체 페이지가 아니라 `MyComponent`만 로딩 표시 → **UX 향상**

---

### ✅ 2. **Next.js 15 캐싱 변화**

### 🔸 변화 포인트

- **기본적으로 캐싱이 비활성화됨**
- 따라서 캐싱을 원하면 직접 설정해줘야 함

### 🔧 설정 방법 (`next.config.ts`)

```tsx

const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30, // dynamic fetch 캐싱을 30초 동안 유지
    },
  },
};

module.exports = nextConfig;

```

📌 참고 링크: [Next.js 15 캐싱 관련 공식 블로그](https://nextjs.org/blog/next-15-rc#caching-updates)

---

### ✅ 3. **fetch 시 개별 캐싱 옵션 설정도 가능**

```
ts
복사편집
await fetch('/api/data', {
  next: { revalidate: 60 }, // 60초마다 백그라운드에서 데이터를 갱신함
});

```

- `revalidate`: 지정한 시간(초)마다 데이터를 자동으로 갱신
- `force-cache`, `no-store` 등의 옵션도 존재 (캐싱 전략 제어용)

---