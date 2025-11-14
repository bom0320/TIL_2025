# TS. 타입을 미리 정의해야하는 경우

### 1) 코드 설계의 역할

타입은 **이 객체가 어떤 속성**을 가지고 있고 그 속성으로 **자료형은 무엇인지를 설명**하는 청사진이다.

```tsx
type CounterState = {
  count: number;
  increase: () => void;
};
```

이건 CounterState라는 이름의 스토어는 count 라는 숫자 값과 increase 라는 함수가 있어야한다 ⇒ 라는 약속이다.

이걸 `createMCounterState>(...)` 에 넣으면, Zustand가 만들어낸 스토어가 반드시 이 구조를 따라야한다.

- type CounterState는 이 스토어는 이런 모양이여야 해 라는 설계도
- 그래서 이 설계도에 맞춰 스토어를 정의할 때, 그 안에 있는 key들이 반드시 있어야한다.

→ 즉 , 잘못된 구조일 경우 빌드 타임(코드 실행 전)에 바로 오류를 내준다.

### 2) 타입 추론만으론 모호할 때 명시적으로 알려줌

TypeScript는 웬만하면 타입을 스스로 추론한다. 하지만 **Zustand 처럼 함수 안에서 동적으로 객체를 반환하는 경우** 에는 TS가 이 객체가 어떤 구조인지 정확히 파악하기 어렵다.

그래서 이렇게 직접 타입을 지정해줘야 한다.

```tsx
export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
}));
```

이러면 useCounterStore().count 를 쓸때, **TS가 “이건 숫자야”라고 알고 있어서 `toFixed()` 같은 숫자 전용 메서드들도 자동완성된다.**
