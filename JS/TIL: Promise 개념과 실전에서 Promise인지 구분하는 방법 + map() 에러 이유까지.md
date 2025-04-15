📘 TIL: Promise 개념과 실전에서 Promise인지 구분하는 방법 + map() 에러 이유까지!
===

### ✅ 1. Promise란?

> Promise는 자바스크립트에서 비동기 작업의 결과를 나타내는 객체다.
> 
> 
> 지금은 결과가 없지만, **나중에 결과를 약속(promise)**한다는 개념!
> 

---

### ✅ 2. Promise의 상태 (3가지)

| 상태 | 설명 |
| --- | --- |
| **pending** | 아직 작업이 끝나지 않음 (대기 중) |
| **fulfilled** | 작업 성공 (`resolve()`) |
| **rejected** | 작업 실패 (`reject()`) |

---

### ✅ 3. 기본 예제

```jsx

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("완료!");
  }, 1000);
});

promise.then((result) => {
  console.log(result); // 👉 1초 후 "완료!" 출력
});

```

---

### ✅ 4. async/await와의 관계

```jsx

async function getData() {
  return "hello";
}

const result = getData();
console.log(result); // 👉 Promise { "hello" }

```

> async가 붙은 함수는 무조건 Promise를 반환함
> 
> 
> 실제 값을 꺼내려면 `await`이 필요함
> 

```jsx

const message = await getData();
console.log(message); // "hello"

```

---

## 🔍 5. 이게 Promise인지 아닌지 구분하는 방법

비동기 코드 작성 중 헷갈릴 때, 아래 기준으로 확인하면 됨!

### ✅ 방법 1: `async` 함수는 무조건 Promise

```jsx

async function hello() {
  return "hi";
}

const res = hello();
console.log(res); // 👉 Promise!

```

---

### ✅ 방법 2: `fetch()`나 `axios()` 등 네트워크 요청 함수는 대부분 Promise 반환

```jsx

const res = fetch("https://api.com/data");
console.log(res); // 👉 Promise { <pending> }

```

---

### ✅ 방법 3: `.then()`이 붙으면 Promise!

```jsx

if (typeof something.then === "function") {
  console.log("이건 Promise야!");
}

```

---

### ✅ 방법 4: 콘솔 출력 확인

```jsx

console.log(value);
// 👉 Promise { <pending> } 이런 식으로 나오면 Promise

```

---

### ✅ 방법 5: 실전에서 쓰는 isPromise 함수

```jsx

function isPromise(value) {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof value.then === "function"
  );
}

```

---

## ⚠️ 6. 왜 `await` 안 붙이면 `.map()`에서 에러날까?

### 예시 코드

```tsx

const movies = getMovies(); // ❌ await 안 붙임
const list = movies.map((movie) => ...); // ❌ 에러 발생!

```

### 이유:

- `getMovies()`는 `async` 함수이기 때문에 **Promise를 반환**함
- `movies`에는 실제 영화 목록이 들어있는 게 아니라 👉 `Promise` 객체가 들어있음
- 그런데 `.map()`은 **배열(Array)**에서만 쓸 수 있어!
- 즉, **Promise에는 `.map()`이 없기 때문에** 에러가 나는 것

### 해결 방법:

```tsx

const movies = await getMovies(); // ✅ Promise 해결
const list = movies.map((movie) => ...); // ✅ 정상 동작

```

---

## ✅ 마무리 요약표

| 구분 | 특징 |
| --- | --- |
| `async function` | 항상 Promise를 반환함 |
| `fetch()` 같은 함수 | Promise 반환 |
| `.then()` 존재 여부 | 가장 확실한 Promise 구분법 |
| 콘솔 출력 | `Promise { <pending> }`이면 Promise |
| `map()` 에러 이유 | Promise는 배열이 아니기 때문에 `.map()` 불가능함 → 반드시 `await` 필요 |

---

## 🔚 느낀 점

이전엔 그냥 `await` 붙이고 말았는데,

이제는 **내가 다루는 값이 Promise인지 먼저 판단**하고

그에 맞게 `await`을 쓰거나 `.then()`을 써야겠다는 감이 생겼다.

특히, `.map()` 같은 배열 메서드를 쓸 때는

**"얘가 진짜 배열인지? 아직 Promise인지?"** 꼭 확인하자!