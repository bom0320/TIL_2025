# Zustand Deep Dive

## Zustand 기본 사용

create 함수로 스토어 생성

create 함수의 콜백은 **set, get 매개변수**를 가지며, 이를 통해 상태를 변경하거나 조회할 수 있음

create 함수의 콜백이 반환하는 객체에서의 속성은 상태(State)이고, 메소드는 액션(Action)이라고 부른다.

create 함수 호출에서 반환하는 스토어 훅(Hook)은, useCounterStore와 같이 use접두사와 Store을 접미사로 명명해 각 컴포넌트에서 사용할 수 있다.

```tsx
import ( create ) from 'zustand';

export const use이름Store = create((set, get) => {
	return {
		상태: 초깃값,
		액션: 함수
	}
})
```

### set, get

이 둘은 Zustand가 자동으로 제공하는 두 가지 도우미 함수(helper)이다.

set, get 매개변수(함수)는 다음과 같이 각 액션에서 사용할 수 있다.

get 함수를 호출하면, **상태와 액션을 가진 스토어 객체(state)**를 얻을 수 있다.

즉, “지금 이 순간 스토어에 들어있는 모든 상태(state)와 액션(action)”을 한 객체 그대로 반환한다는 것! → 이걸 실행하면 현재 저장된 스토어 객체 전체를 얻는것

또한 set 함수를 호출(변경할 상태를 속성으로 포함한 객체를 전달)하면, 상태를 변경 할 수 있다.

즉, Zustand 스토어의 일부 상태를 “수정하는(update)” 함수

```tsx
import { create } from "zustand";

export const use이름Store = create((set, get) => {
  return {
    상태: 초깃값,
    액션: () => {
      const state = get();
      const { 상태 } = state;
      set({
        상태: 상태 + 1,
      });
    },
  };
});
```

set 함수를 호출할 때 콜백을 사용하면, get 함수를 사용하지 않아도 바로 스토어 객체(state)를 얻을 수 있다. → 왜? Zustand가 현재 스토어 상태(state)를 자동으로 콜백 인자로 넘겨주기때문, 따라서 get()으로 상태를 직접 가져올 필요가 없다.

변경할 상태를 속성으로 포함한 객체를 콜백에서 반환해야 한다.

```tsx
import { create } from 'zustand';

export const use이름Store = create((set) => {
	return {
		상태: 초기값
		액션: () => {
			set((state) => ({
				상태: state.상태 + 1;
			}))
		}
	}

})
```

컴포넌트에서 스토어 훅(use이름Store)을 가져와 호출할 때 선택자 함수를 전달해 원하는 상태나 액션을 얻을 수 있다.

또한 상태는 반응형이기 때문에, 상태가 변경되면 컴포넌트가 다시 렌더링하게 된다.

같은 스토어의 다른 상태를 다른 컴포넌트가 불필요하게 리렌더링되지 않도록, 한 번의 훅 호출로 하나의 상태(액션)만 가져와야한다.

```tsx
// 1. 선택자 함수를 따로 정의한 방식
import { use이름Store } from "~/store/스토어";

const 선택자함수 = (state) => state.상태_액션;
const 상태_액션 = use이름Sotre(선택자함수);
```

```tsx
// 2. 선택자 함수를 바로 인라인으로 넣은 방식
import { use이름Store } from "./store/스토어";

export default function 컴포넌트() {
  const 상태 = use이름Store((state) => state.상태);
  const 액션 = use이름Store((state) => state.액션);
}
```

```tsx
const selector = (state) => state.count;
// 여기까진 그냥 함수 -> 그 자체론 Zustand와 아무 관련이 없다.
// 단순히 매개변수로 받은 객체에서 count를 꺼내 반환한다는 일반 함수일 뿐

// but! 여기서부터 달라짐
const count = useCounterStore(seleector);
// 여기서부터 Zustand 가 등장. => 이 순간 zustand가 함수를 선택자 함수로 취급해서
// 내부 state를 넘겨 실행하고, 필요한 데이터(count)만 꺼내준다.
```

결과적으론 이 두줄이 만나면서 Selector는 Zustand 스토어와 연결된 선택자 함수가 되는것이다.

---

만약 **선택자 함수없이 스토어 훅을 호출**할려면 개별 상태(액션)가 아닌, 스토어 객체를 얻을 수 있다.

하지만 이는 사용하지 않는 상태가 변경되어도 해당 스토어를 사용하는 모든 컴포넌트가 리렌더링 되기 때문에 주의해야한다.

```tsx
import { use이름Store } from "~/store/스토어";

export default function 컴포넌트() {
  const 스토어 = use이름Store();
  return (
    <>
      <h2>{스토어.상태}</h2>
      <button onClick={스토어.액션}>+</button>
    </>
  );
}
// 이는 권장하지 않는 방법임
```

간단한 예제를 살펴보도록 하자.

기본적으로 프로젝트의 `store` 폴더에서 각 스토어를 생성한다.

타입 스크립트를 사용할 때는, `create` 함수의 제네릭(타입을 외부에서 지정할 수 있는 문법)으로 상태(State)와 액션(Aciton) 타입을 전달한다.

```tsx
create<타입>();
```

```tsx
// /src/store/count.ts

import { create } from "zustand";

export const useCountStore = create<{
  count: number;
  increase: () => void;
  decrease: () => void;
}>((set, get) => ({
  count: 1,
  increase: () => {
    const { count } = get();
    set({ count: count + 1 });
  },
  decrese: () => {
    const { count } = get();
    set({ count: count - 1 });
  },
}));
// 이는 카운트를 관리하는 스토어
```

get 함수를 사용하지 않고, set 함수의 콜백을 사용하면 더 간결하게 상태를 변경할 수 있다.

```tsx
import { create } from "zustand";

export const useCounterStore = create<{
	count: number
	increase: () => void
	decrease: () => void
}>((set) => ({
	count: 1,
	increase: () => set((state) => ({ count: state.count + 1 }));
	// ⭐️ JS에서 {}는 객체를 의미하니까 항상 key:value 구조여야 한다.
	// Zustand의 set()도 객체를 받으니까...({count:state.count+1}) 처럼 써야함
	decrease: () => set((state) => ({ count: state.count - 1 }));
}));
```

> “이걸 지금 실행할 거야? 나중에 실행할 거야?”

- “지금”이면 괄호 붙이고 `set(...)`
- “나중에”면 괄호 빼고 `() => set(...)`

그리고 생성한 스토어를 다음곽 같이 컴포넌트에서 사용할 수 있다.

```tsx
import { useCountStore } = from './store/count';

export default function App() {
	const count = useCountStore(state => state.count)
	const increase = useCountStore(state => state.increase);
	const decrease = useCountStore(state => state.decrease);

	return (
		<>
			<h2>{count}</h2>
			<button onClick={increase}>+</button>
			<button onClick={decrease}>-</button>
		</>
	)
}
```
