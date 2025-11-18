# 다중 상태 선택(useShallow)

앞서 설명한 것처럼 스토어를 사용하는 모든 컴포넌트의 불필요한 리렌더링을 방지하기 위해 , 컴포넌트에서는 한번에 하나씩만 상태(액션)을 가져와야 하지만, `useShallow` 훅을 사용하면 여러 상태(액션)을 한 번에 객체나 배열로 가져올 수 있다.

스토어 훅에서 Zustand의 `useShallow` 훅을 중첩 호출해 선택자 함수를 전달한다.

이때 **선택자 함수는 사용하고자 하는 상태(액션)을 포함하는 객체나 배열을 반환**해야한다.

먼저 객체를 반환하는 방식에 대해서 살펴보자

```tsx
import { useShallow } from 'zustand/shallow'

const { 상태, 액션 } = use이름Store(
	useShallow(state -> ({
		상태: state.상태,
		액션: state.액션,
	}))
)
```

다음 예제는 count, increase, decrease 상태(액션)을 하나씩 가져오지 않고,한번에 가져온다. 객체 구조 분해 할당으로 사용할 상태(액션)만 꺼내올 수도 있겠지만, 한 번에 객체로 모아 처리하는 경우 유용할 수 있다.

```tsx
// /src/App.tsx

import { useShallow } from "zustand/shallow";
import { useCountStore } from "./store/count";

export default function App() {
  // const count = useCountStore(state => state.count);
  // const incrase = useCounterStore(state => state.increase);
  // const decrease = useCounterStore(state => state.decrease);

  // const { count, increase, decrease } = useCountStore(state =>({}))

  const countState = useCountStore(
    useShallow((state) => ({
      count: state.count,
      increase: state.increase,
      decrease: state.decrease,
    }))
  );
  return (
    <>
      <h2>{countState.count}</h2>
      <button onClick={countState.increase}>+1</button>
      <button onClick={countState.decrease}>-1</button>
    </>
  );
}
```

**선택자 함수**에서 **객체 대신 배열을 반환**할 수도 있다.

순서대로 좀 더 간결하게 작성하거나, 한 번에 배열로 가져오는 경우 유용할 수 있다.

```tsx
import { useShallow } from 'zustand/shallow';

const [상태, 액션] = use이름Store(
	useShallow(state => [state.상태, state.액션]);
)
```

```tsx
import { useShallow } from "zustand/shallow";
import { useCountStore } from "./store/count";

export default function App() {
  const countState = useCountStore(
    useShallow((state) => [state.count, state.increase, state.decrease])
  );

  return (
    <>
      <h2>{countState[0]}</h2>
      <button onClick={countState[1]}>+1</button>
      <button onClick={countState[2]}>-1</button>
    </>
  );
}
```
