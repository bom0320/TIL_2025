JSX에서 {}를 언제 써야 할까?
===

### 오늘 배운 핵심

JSX에서 JavaScript 코드를 쓸 때 항상 `{ }` 을 써야 하는 것은 아니다.

**“표현식(expression)”**만 `{ }` 안에서 쓸 . 수 있고, **“문(statement)”는 JSX 안에서 사용할 수 없다.**

---

## ✅ JSX에서 `{}`가 필요한 경우 (표현식)

중괄호는 JSX 안에서 JavaScript 의 표현식(expression)을 쓸 때만 필요하다.

```jsx
<div>
  {1 + 1} // ✅ 표현식: 결과는 2
  {isLoading ? "로딩 중..." : "완료!"} // ✅ 삼항연산자도 표현식
  {movies.map(movie => <li>{movie.title}</li>)} // ✅ map도 표현식
  {"Hello, " + name} // ✅ 문자열 연산
</div>

```

**→ 전부 값을 반환하는 표현식이라서 JSX 안에서 사용 가능**

---

## ❌ JSX 안에서 `{}`로도 쓸 수 없는 것들 (문)

```jsx
if (isLoading) { ... }
for (let i = 0; i < 5; i++) { ... }
setTimeout(() => { ... }, 1000);
console.log("hello");
const name = "봄";

```

→ 이런 것들은 **JS 문(statement)** 으로, JSX 안에서는 사용할 수 없음.

→ JSX 바깥에서 따로 처리해야 함.

---

### 💡 정리

| 구분 | JSX 안에서 `{}`로 사용 가능? | 설명 |
| --- | --- | --- |
| 표현식 | ✅ 가능 | 값이 나오는 코드 |
| 문(statement) | ❌ 불가능 | 실행은 되지만 JSX에서 바로 쓸 수 없음 |

---

### ✨ 깨달은 점

- JSX는 HTML처럼 보이지만 JavaScript 문법이 섞인 특별한 문법이다.
- JSX 안에서는 **값을 반환하는 표현식만** `{}` 안에 쓸 수 있다.
- 표현식과 문(statement)을 구분하는 감각이 중요하다!