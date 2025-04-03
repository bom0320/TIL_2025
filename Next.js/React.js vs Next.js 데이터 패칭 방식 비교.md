React.js vs Next.js 데이터 패칭 방식 비교
===
Data Fetch 방법 정리 (React.js vs Next.js App Router)

### 🎯 1. 순수 React.js에서의 데이터 fetch 방식 (Client Component)

1. `useState`를 이용해 데이터를 저장할 공간을 만든다.
2. `useEffect`를 사용해 컴포넌트가 마운트될 때 데이터를 가져온다.
3. `fetch()`를 사용해 API 요청을 보낸다.
4. `response.json()`으로 응답을 JSON으로 변환한다.
5. `setState()`를 통해 상태를 업데이트한다.
6. 데이터 확인용으로 `JSON.stringify(movies)` 등을 출력해본다.

```tsx
"use client";

import { useEffect, useState } from "react"

export default function Page() {
    const [isLoading, setIsLoading] = useState(true);
    const [movies, setMovies] = useState([]);

    const getMovies = async () => {
        const response = await fetch("https://nomad-movies.nomadcoders.workers.dev/movies");
        const json = await response.json();
        setMovies(json);
        setIsLoading(false);
    }

    useEffect(() => {
        getMovies();
    }, []);

    return (
        <div>
            <div>{isLoading ? "Loading..." : JSON.stringify(movies)}</div>
        </div>
    );
}
```

- 이 방식은 브라우저에서 fetch가 실행된다 → 즉, API URL이 노출된다.
- 보안 문제 발생 가능 (예: 비공개 API, DB 접근 등)
- DB와의 직접 통신은 위험하므로 서버 사이드 처리 필요

---

### 🎯 2. Next.js (App Router, Server Component)에서의 fetch 방식

```tsx
export const metadata = {
    title: "Home",
};

const URL = "https://nomad-movies.nomadcoders.workers.dev/movies";

async function getMovies() {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const response = await fetch(URL);
    const json = await response.json();
    return json;
}

export default async function HomePage() {
    const movies = await getMovies();
    return (
        <div>
            <div>{JSON.stringify(movies)}</div>
        </div>
    );
}
```

- Server Component이므로 useEffect, useState 사용 X
- 컴포넌트가 렌더링되기 전에 서버에서 fetch가 실행됨
- **초기 로딩 시 한 번만** fetch 됨 → 그 후에는 **Next.js가 캐싱함**
- 그래서 새로고침해도 빠르게 로드됨 → 실제로는 캐시된 결과를 보여주는 것

```tsx
await new Promise((resolve) => setTimeout(resolve, 5000));
```

- 이 코드는 일부러 로딩 상태를 재현하기 위한 트릭
- 해당 Promise가 resolve될 때까지 아무 UI도 렌더링되지 않음
- 즉, 사용자 입장에서 "로딩이 없는 것처럼" 보일 수도 있음

---

### 🔍 정리 비교

| 항목 | React.js | Next.js (App Router) |
|------|----------|----------------------|
| 실행 위치 | 브라우저 (Client Side) | 서버 (Server Side) |
| API 노출 | O (보안 취약) | X (보안 우수) |
| 상태 관리 | useState / useEffect | 필요 없음 (async + fetch만) |
| 초기 로딩 | 직접 처리 (isLoading 등) | 자동 처리 + 캐싱 지원 |
| 로딩 트릭 | 직접 로딩 UI 작성 | 서버 응답 기다리는 동안 화면 안 보임 |

---

### 💬 마무리

React.js와 Next.js는 데이터 패칭 방식이 완전히 다름.
- React는 브라우저에서 직접 fetch
- Next.js는 서버에서 먼저 fetch 후, 클라이언트로 전달

→ 캐싱, 보안, 속도 면에서 Next.js가 훨씬 유리함.
→ 하지만 상황에 따라 로딩 처리나 UX를 고려해야 하므로, 각 방식의 장단점을 이해하고 적절하게 선택하는 것이 중요!

