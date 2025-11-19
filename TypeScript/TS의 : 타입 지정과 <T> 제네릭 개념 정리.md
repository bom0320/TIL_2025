# TS의 `:` 타입 지정과 `<T>` 제네릭 개념 정리

### 핵심 개념 요약

- `:` 타입 지정(Type Annotaion)은 **값(value)의 타입을 지정하는 문법**
- `<T>` 제네릭(Generic)은 타입을 **외부에서 주입해서 함수/클래스가 타입 기반으로 동작하게 하는 문법**
  둘은 용도와 개념 자체가 완전히 다르다.

---

## `:` 타입 지정(Type Annotaion)이란

### 사용 목적

변수, 매개 변수, 반환값 등 실제로 존재하는 값(value)에 타입을 붙인다.

“이 값은 이런 타입이야”라고 명확하게 선언하는 문법

```tsx
const count: number = 1;

function add(a: number: b: number): number {
	return a + b;
}
```

- `a: number`, `b:number`는 **매개변수의 타입을 지정**한 것
- `): number` 는 **함수의 반환 타입을 지정**한 것
- 두 곳 모두 `:` 을 사용하지만 의미가 다르다.

### 핵심 요약

`:` 는 값에 타입을 붙이는 “라벨(label)” 같은 개념이다.

> 이 변수는 number 타입이야
> 이 파라미터는 string 타입이야
> 이 함수는 number를 반환해야 해

라고 정확학 명시하는 역할을 한다.

즉, TypeAnotaion(타입 지정)은 TypeScript에서 이 값이 어떤 타입인지 확실하게 정해놓는 행위를 말한다. 즉, 코드 안의 실제 데이터를 다루는 부분에 타입이라는 이름표를 붙여준 것

## `<T>` 제네릭(Generic)이란

### 사용 목적

타입을 함수/클래스/라이브러리에 외부에서 주입

여러 타입을 대응할 수 있는 유연한 구조 만들기

```tsx
Array<number>;
Promise<string>;
create<State>();
```

### 핵심 요약

<T> 는 이 기능은 이 타입으로 동작해야해라고 알려주는 타입 탬플릿

## 왜 제네릭이 필요한가

### 1) 타입 재사용성 증가

Promise<string> , Promise<number>, Promise<User> 등

→ Promise 하나로 모든 타입 처리 가능

### 2) 타입 안정성 확보

Array<T> 구조 덕분에 배열 안의 타입이 강제됨

### 3) 라이브러리(ex.Zustand) 에서 ‘스토의 타입 정의’ 가능

## Zustand 에서 제네릭이 왜 필요한가

```tsx
export const useCountStore = create<{
	count: number;
	increase: () => void;
}>((set) => ({
	count: 1,
	increase: set(state => ({ count: state.count + 1 } )
}));
```

create함수는 스토어 타입을 모르기 때문에 <T>로 타입을 전달해야한다.

그래야 TS가 state.count는 number, increase 는 함수를 정확히 할 수 있다.
