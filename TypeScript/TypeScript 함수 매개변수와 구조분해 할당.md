TypeScript 함수 매개변수와 구조분해 할당
===

### 오늘은 함수에서 매개변수를 받는 방법 중 "구조분해 할당"과 관련해서 궁금했던 점을 정리했다.

---

### ❓ 내가 처음 궁금했던 점:

`getMovies`라는 비동기 함수를 만들 때, 다음 두 가지 방식 중 **왜 하나는 에러가 안 나고 다른 하나는 에러가 나는지** 궁금했다.

```tsx

// ✅ 에러 없음
async function getMovies(id: string) {
    ...
}
getMovies(id);

```

```tsx

// ❌ 에러 발생
async function getMovies({ id }: { id: string }) {
    ...
}
getMovies(id); // 여기서 에러!

```

---

### 🔍 원인 분석

두 코드의 차이는 **함수가 매개변수를 받는 방식**에 있었다.

- 첫 번째는 **`id`라는 값을 직접 받는 방식**
- 두 번째는 **객체로 받되, 구조분해 할당을 통해 `id`만 꺼내는 방식**

그런데 두 번째 방식은 **객체를 전달해야** 작동한다.

나는 그냥 `id`만 넘겼기 때문에 에러가 발생한 것이었다.

---

### 📘 개념 정리

### ✅ 구조분해 할당이란?

> 객체나 배열에서 특정 값을 꺼내는 문법
> 

```tsx

const user = { name: "봄", age: 17 };
const { name } = user; // 구조분해 할당
console.log(name); // '봄'

```

함수 매개변수에서도 사용할 수 있다:

```tsx

function greet({ name }: { name: string }) {
    console.log(name);
}

greet({ name: "봄" }); // OK!

```

### ✅ 이때 `:`의 의미는?

`:`는 구조분해와는 별개로, **TypeScript에서 타입을 명시하는 부분**이다.

```tsx

function greet({ name }: { name: string })

```

- `{ name }` → 구조분해 할당
- `: { name: string }` → 객체 타입 정의

---

### 🧠 최종 정리

- `function getMovies(id: string)` → `getMovies("123")`
- `function getMovies({ id }: { id: string })` → `getMovies({ id: "123" })`
- 구조분해 할당은 **객체에서 값을 꺼내는 문법**
- `:`는 타입스크립트에서 **타입을 지정하는 문법**

---

### 💬 느낀 점

처음엔 구조분해 할당 자체가 헷갈렸는데,

직접 질문하고, 예제를 비교하면서 사용 방식과 원리를 이해하게 되었다.

단순히 "객체로 받는다"는 것이 아니라, 그걸 **어떻게 꺼내 쓰는지**가 중요하다는 걸 알게 됐다.

앞으로 코드를 짤 때도 구조분해 할당을 적절히 활용해보자

---