Routes 정의하기
===

### **Routes 생성**

Next.js는 **파일 시스템 기반 라우터**를 사용하여 폴더 구조로 경로를 정의한다.

각 폴더는 해당 **URL 세그먼트**에 매핑되며, 중첩된 경로를 만들려면 폴더를 중첩하면 됨!

📌 **예시**

```

app/dashboard/setting/page.tsx

```

위 폴더 구조는 `/dashboard/setting` 경로를 생성한다.

### **UI 생성**

각 경로 세그먼트에 대한 UI를 구성하기 위해 **특정 파일 규칙**이 사용된다.

주요 파일은 다음과 같다.

- `page.tsx` : 해당 경로에 대한 **개별 UI 페이지**를 렌더링
- `layout.tsx` : 여러 경로에서 **공유되는 UI**(예: 헤더, 네비게이션)를 정의

📌 **첫 번째 페이지 만들기**

앱 디렉터리에 `page.tsx` 파일을 생성하고 React 컴포넌트를 내보내면 된다.

```tsx

// app/page.tsx
export default function Home() {
  return <h1>Welcome to Next.js</h1>;
}

```

📌 **공식 문서**

더 자세한 내용은 [Next.js 공식 문서](https://nextjs.org/docs/app/building-your-application/routing/defining-routes)에서 확인

---