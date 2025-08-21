Suspense 간단히 이용해보기

## 1. Suspense 란

React와 Next.js의 Suspense란 비동기 데이터를 처리하거나 느린 컴포넌트가 로드될 때, UI의 일부분을 대기 상태로 표시(다른 무언가로 표시)하는 기능이다. 이를 통해 성능 최적화와 사용자 경험을 향상시킬 수 있다.

## 2. React 에서의 Suspense

React에서 Suspense는 주로 비동기 컴포넌트나 데이터 패칭을 기다리는 동안 로딩 상태를 처리하기 위해 사용되며,

기본적으로는 동작 중인 비동기 작업이 완료되기 전에 UI의 다른 부분을 먼저 렌더링하고 비동기 작업이 완료되면 나머지 부분을 업데이트 하는 방식으로 동작한다.

```js
import React, { Suspense } from "react";

const LazyComponent = React.lazy(() => import("/MyComponent"));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}
```

- **React.lazy() :** 동적으로 컴포넌트를 가져오는 함수. 해당 컴포넌트가 로드될 때까지 Suspense 를 통해 로딩 상태를 표시할 수 있음
- **fallback :** 비동기 작업이 완료되기 전에 보여줄 대체 UI

---

## 3. Next.js 에서의 Suspense

Next.js 에서는 React 18의 Suspense를 활용하여 서버 컴포넌트에서 비동기 데이터로 로딩 및 스트리밍 렌더링을 지원한다. 서버 측에서 데이터를 미리 패칭하고 필요한 경우 그 데이터를 기다리는 동안 일부 UI를 먼저 렌더링한다. 아래 코드는 영화 정보와 영화 관련 영상들을 보여주는 컴포넌트를 분리한 후, Suspense를 적용한 코드이다.

```ts
import { Suspense } from 'react';
import MovieInfo from '../../../../components/MovieInfo';
import MovieVideos from "../../../../MovieVideos";

export default async function MovieDetail({
    params: {id},
}: {
    params: {id string};
}) {
    return (
        <div>
        <h3>Movie Detail Page</h3>
        <Suspense fallback={<h1>Loading movie info</h1>}>
            <MovieInfo id={id} />
        </Suspense>
        <Suspense fallback={<h1>Loading movie videos</h1>}>
            <MovieVideos id={id}>
        </Suspense>
        </div>
    );
}

// MovieInfo.tsx (MovieVideos.tsx도 같은 형태)
async function getMovie(id: string) {
    const response = await fetch(`${process.env.MOVIES}/${id}`)
}

interface IProps {
    id: string;
}

export default async function MovieInfo({id} : IProps) {
    const movie = await getMovie(id);

    return <h6>{JSON.stringify(movie)}</h6>;
}
```
