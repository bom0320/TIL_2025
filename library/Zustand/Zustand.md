Zustand
===


Zustand는 독일어로 ‘상태’ 라는 뜻으로 React 생태계에서 사용하는 **상태 관리 라이브러리**이다. 

현재 Redux가 압도적으로 많이 사용되고 있지만 문법이 더러운편이라 학습에 시간이 필요하다고 한다. Post Redux로서 사용자가 빠르게 늘고 있는 Zustand에 대해 알아보도록 하자

---

### 사용하는 이유

기본적으로 React의 **데이터 흐름**은 State & Props를 사용해 **단방향으로 이루져야 한다**는 원칙이 있다. 

이러한 데이터 흐름은 단순하고 예측 가능하며 컴포넌트 간의 관계를 명확히 정의하기 때문에 유지보수성을 향상시킨다. 

> **하지만..**
데이터를 전달하는 과정에서 **거쳐야 하는 컴포넌트가 너무 많은 상황**이면 어떨까?
> 

### ⚠️Props Drilling 발생!!!!!

```tsx
1. 최상위 부모 컴포넌트에서 상태나 데이터를 가지고 있다.
2. 중간에 위치한 하위 컴포넌트가 해당 데이터에 접근할 필요가 있다.
3.  하지만 중간에 있는 다른 컴포넌트들은 그 데이터를 사용하지 않음에도 불구하고, 
   React 구조상 자식에게 전달하려면 무조건 props로 받아야 하므로, 
   그냥 “전달만 하는” 역할을 하게 된다. 
4. 결과적으로 데이터는 여러 컴포넌트를 통과하여 목적지에 도달한다. 
5. 이 과정을 “props drilling”이라고 함
```

코드로 보자면..

```tsx
// 👑 App (최상위)
function App() {
  const user = { name: "봄김" };
  return <Parent user={user} />;
}

// 👩 Parent (데이터 안 씀) → 그냥 전달
function Parent({ user }: { user: { name: string } }) {
  return <Child user={user} />;
}

// 👧 Child (데이터 안 씀) → 또 전달
function Child({ user }: { user: { name: string } }) {
  return <TargetComponent user={user} />;
}

// 🎯 TargetComponent (여기서만 사용)
function TargetComponent({ user }: { user: { name: string } }) {
  return <div>{user.name}님 환영합니다!</div>;
}

```

`Parent`, `Child`는 **user라는 데이터가 필요 없음에도 불구하고, 하위 컴포넌트에 전달하기 위헤 props를 계속 받아서 넘겨야함**

이게 바로 props drillling의 문제의 핵심이다.

---

**😵 문제점 요약**

- 중간 컴포넌트가 필요 없는 데이터를 계속 전달해야 함
- 컴포넌트 구조가 복잡해질수록 코드 유지보수가 어려워짐
- 구조가 바뀔 경우 관련된 컴포넌트 모두를 수정해야 함
- 불필요한 렌더링 유발 가능성 존재

---

### 그래서 Zustand!

> 👉 **Zustand는 이런 props drilling을 막기 위한 "전역 상태 관리 라이브러리"!**
> 

즉, 필요한 컴포넌트는 Zustand stord에서 직접 가져와서 사용하면 된다.

중간 단계 컴포넌트를 거칠 필요가 없는것!!!!!

---

### ✨ Zustand로 바꾼다면?

### 📦 상태 저장소 정의

```tsx
// store/userStore.ts
import { create } from 'zustand'

export const useUserStore = create(() => ({
  user: { name: '봄김' },
}));
```

### 🧾 컴포넌트에서 바로 사용

```tsx
function UserInfo() {
  const user = useUserStore((state) => state.user);
  return <div>{user.name}님 환영합니다!</div>;
}
```

➡️ 이제는 중간에 있는 `Parent`, `Child` 컴포넌트가 **전혀 신경 쓸 필요 없음!**

---

## 📌 마무리 요약

| 항목 | 설명 |
| --- | --- |
| 🔁 Props Drilling | 필요 없는 컴포넌트들이 props를 전달만 하는 상황 |
| 🧠 Zustand | 중간 단계를 건너뛰고, 필요한 곳에서 바로 상태를 가져올 수 있게 해줌 |
| 💡 효과 | 코드 간결, 구조 깔끔, 유지보수 쉬움 |