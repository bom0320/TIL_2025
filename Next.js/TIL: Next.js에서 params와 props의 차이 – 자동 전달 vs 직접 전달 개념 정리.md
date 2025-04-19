📌 TIL: Next.js에서 params와 props의 차이 – 자동 전달 vs 직접 전달 개념 정리
===

### 개념 요약

Next.js에서는 URL 경로에 있는 동적 세그먼트 값(예: `/movies/[id]`)을

라우트 파일에서는 `params`로 **자동 전달**받을 수 있지만,

내가 만든 일반 컴포넌트에서는 **직접 props로 전달해줘야** 해당 값을 사용할 수 있다.

---

### 🧩 두 가지 상황 비교

| 상황 | 자동 전달됨? | 설명 | 예시 |
| --- | --- | --- | --- |
| `page.tsx`, `layout.tsx` 등 **라우트 파일** | ✅ YES | Next.js가 URL 경로를 분석해서 `params`로 자동 전달 | `{ params: { id } }` |
| 일반 컴포넌트 (예: `MovieVideos`) | ❌ NO | 직접 props로 넘겨줘야 컴포넌트가 인식할 수 있음 | `<MovieVideos id={id} />` |

---

### 예시 1: 라우트 파일 (자동 전달)

```tsx

// URL: /movies/123
export default function MovieDetailPage({ params: { id } }: { params: { id: string } }) {
  return (
    <div>
      <h1>Movie ID: {id}</h1>  // ✅ Next.js가 자동으로 넘겨준 값
    </div>
  );
}

```

- `[id]`는 파일 구조에서 라우팅 파라미터를 의미함 (`app/movies/[id]/page.tsx`)
- `params.id`는 **Next.js가 자동으로** URL에서 추출해서 넣어줌

---

### 예시 2: 일반 컴포넌트 (props로 직접 전달해야 함)

```tsx

// 이건 props를 직접 받아야 하는 일반 컴포넌트
export default function MovieVideos({ id }: { id: string }) {
  return <div>영상 id: {id}</div>;
}

```

```tsx

// 부모 컴포넌트에서 이렇게 직접 전달해야 함!
<MovieVideos id={id} />

```

- `MovieVideos`는 **Next.js가 관리하지 않음**
- 자동으로 `params` 안 들어오니까, 내가 **명시적으로 props를 넘겨야** 함

---

### 🧠 이걸 이해하려면 이렇게 생각하면 돼

| 개념 | 비유 |
| --- | --- |
| `page.tsx`에서 params | 📦 Next.js가 직접 택배처럼 id를 넣어줌 |
| 일반 컴포넌트에서 id | 🙋 내가 친구한테 전달해줘야 친구가 알 수 있음 (직접 전달) |

---

### 왜 이렇게 돼야 하냐?

- Next.js는 **라우팅 파일만 특별하게 다뤄줘** (`params`, `searchParams`, `generateMetadata` 등)
- 그 외의 컴포넌트는 **개발자가 만든 일반적인 React 컴포넌트**이기 때문에,
직접 props를 넘겨줘야 함 (Next.js는 그 컴포넌트 내부까지 자동으로 못 넣어줌)

---

### 🔁 정리 요약

| 항목 | 설명 |
| --- | --- |
| `params` | 라우트(`page.tsx`, `layout.tsx`)에서만 자동 전달 |
| `props` | 일반 컴포넌트에서 사용하는 값, 직접 전달해야 함 |
| 실수 방지법 | "자동으로 들어오는 건 오직 page/layout에서만!" |

---

### 실전에서 자주 하는 실수

```tsx

// ❌ 이건 props 전달 안 해놓고 바로 id 쓰려는 실수
<MovieVideos />  // ❌ id를 안 넘겨서 undefined 발생

```

---

> 📘 이 TIL은 params와 props의 차이를 이해하고,
> 
> 
> 실제로 어떤 컴포넌트에서 어떤 방식으로 값을 받아야 하는지를 정리하기 위해 작성함.
> 

---