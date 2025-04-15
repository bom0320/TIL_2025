📘 TIL: async function, export const, export default 언제 어떻게 쓰는지 헷갈릴 때
===

### 🧐 오늘 궁금했던 것

리액트, Next.js 같은 코드들을 보다 보면

- `async function A()`
- `export const A = () => {}`
- `export default function A() {}`

이런 다양한 방식으로 함수가 선언되고 내보내지는 걸 자주 본다.

이게 문법적으로 뭐가 다른 건지, 언제 어떤 걸 써야 하는 건지 헷갈려서 정확히 정리해보기로 했다.

---

## 🔹 1. 함수 선언 방식: 선언식 vs 표현식

함수는 기본적으로 **"선언식"**이냐 **"표현식"**이냐에 따라 선언 방식이 나뉜다.

### ✅ 함수 선언식 (Function Declaration)

```jsx
function sayHi() {
  console.log("Hi");
}

sayHi(); // ✅ 선언 전에도 호출 가능
```

- **호이스팅**됨 → 코드 위에서 호출해도 오류 없음
- `this`는 일반 함수 방식으로 동작

### ✅ 함수 표현식 (Function Expression)

```jsx
const sayHello = function() {
  console.log("Hello");
};

sayHello(); // ❌ 반드시 선언 후 호출해야 함
```

- **호이스팅되지 않음**
- 변수처럼 취급되어, 호출 전에 실행하면 오류

---

### ✅ 화살표 함수 표현식 (Arrow Function)

```jsx
const add = (a, b) => a + b;
```

- `this`가 **상위 스코프**에서 고정됨
    
    → 주로 React 함수형 컴포넌트, 콜백에서 사용
    

---

## 🔹 2. `async` 함수: 비동기 함수 만들기

`async`는 **비동기 함수**를 만들 때 사용하는 키워드로, 항상 **Promise**를 반환한다.

```jsx
async function fetchData() {
  const response = await fetch("url");
  const data = await response.json();
  return data;
}
```

- `await`와 함께 쓰이면 **동기처럼 비동기 처리 가능**
- 화살표 함수와도 함께 사용 가능

```jsx
const fetchData = async () => {
  const response = await fetch("url");
  return await response.json();
};
```

---

## 🔹 3. `export` vs `export default`: 모듈 내보내기 방식

### ✅ Named Export (이름을 가진 내보내기)

```jsx
export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;
```

가져올 땐 이름을 **정확히 지정**해야 한다:

```jsx
import { add, multiply } from './math';
```

---

### ✅ Default Export (기본 내보내기)

```jsx
export default function divide(a, b) {
  return a / b;
}
```

가져올 땐 이름을 **자유롭게** 정할 수 있다:

```jsx
import divideFunc from './math';
```

---

### 🟨 Named + Default 같이 쓰기

```jsx
export const sum = (a, b) => a + b;
export default function subtract(a, b) {
  return a - b;
}
```

```jsx
import subtract, { sum } from './math';
```

---

## ✅ 마무리 정리표

| 개념 | 키워드 / 형식 | 특징 |
| --- | --- | --- |
| 함수 선언식 | `function A() {}` | 호이스팅 O |
| 함수 표현식 | `const A = () => {}` | 호이스팅 X, 간결함 |
| 비동기 함수 | `async function A()` or `const A = async () => {}` | `await` 사용 가능 |
| 이름 있는 내보내기 | `export const A = ...` | 여러 개 가능, `{ A }`로 import |
| 기본 내보내기 | `export default function A()` | 한 개만 가능, 이름 자유롭게 import |

---

## 🔚 느낀 점

이전엔 그냥 외우듯이 사용했는데,

"**왜 이런 문법이 있는지**" 구조부터 이해하니까 훨씬 잘 기억된다.

실무에서 마주치면 직접 구분해서 쓸 수 있을 것 같다.

앞으로 함수 선언 + 내보내기 구조가 나오면 무작정 쓰기보단

**이건 선언식인가? 표현식인가? 내보내기 방식은 어떤가?**

이렇게 하나씩 점검해보자.