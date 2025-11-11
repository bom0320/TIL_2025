# Zustand 기본 문법과 개념

## 스토어(Store)란

- 스토어 = 전역 상태 보관 창고
- React 의 useState 는 **컴포넌트 내부 전용 상태**라서 다른 컴포넌트와 공유 불과
  ```tsx
  const [count, setCount] = useState(0);
  ```
- 하지만 로그인 상태, 다크 모드, 사용자 정보처럼 앱 전체에서 공유해야 하는 상태도 있다.
- 이럴 때 상태(state)와 상태를 바꾸는 방법(action)을 모아둔 스토어를 만든다.
  - 쉽게 말해 **스토어 = 전역 useState**

---

## Zustand 가 하는 일

- React 에는 전역 상태 관리 방법이 여러 개가 있다. (Context API, Redux 등)
- Zustand 는 그 중에서 “아주 가볍고 단순한 전역 상태 관리 라이브러리”
- Provider 같은 걸 따로 감쌀 필요 없이, create 한 번만 쓰면 바로 전역 스토어를 만들 수 있음

---

## 기본 문법 패턴

### 1) 스토어 만들기

```tsx
import { create } from "Zustand";

type CounterState = {
  count: number;
  increate: () => void;
  decrease: () => void;
};

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increate: () =>
    set((state) => {
      count: state.count + 1;
    }),
  decrease: () =>
    set((state) => {
      count: state.count + 1;
    }),
}));
```

- useCounterStore 라는 전역 훅 생성
- 스토어 안에는
  - count: 상태 값
  - increate, decreate: 상태 변경 함수

---

### 2) 스토어 사용하기

```tsx
function Counter() {
  const { count, increate, decreate } = useCounterStore();

  return (
    <View>
      <Text>{count}</Text>
      <Button title="+" onPress={increase} />
      <Button title="-" onPress={decreate} />
    </View>
  );
}
```

다른 컴포넌트에서도 `useCounterStore()` 를 쓰면 동일한 count 상태를 공유한다.

---

## 로그인 예시

```tsx
import { create } from "Zustand";

type AuthState ={
	token: string | null;
	isLoggedIn: boolean;
	setToken: (t:string) => void;
	logout : () => void;

}

export const useAuthStore = create<AuthState>((set) => ({
	token: null,
	isLoggedIn: false,
	setToken: (t) => set({token: t, isLoggedIn: true });
	logout: (t) => set({ token: null, isLoggedIn: false});
}));
```

- `setToken("abc123")` → 토큰 저장 + 로그인 상태 true
- `logout()` → 토큰 삭제, 로그인 상태 false

```tsx
const { isLoggedIn, setToken, logout } = useAuthStore();

if (isLoggedIn) {
  logout();
} else {
  setToken("abc123");
}
```
