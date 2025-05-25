JSX 안에서 중괄호 {}와 함수 표현식 헷갈리지 않기
===

React를 쓰면서 JSX 안에 함수를 쓸 때 **중괄호와 소괄호가 헷갈렸던 경험**이 있어서 이번 TIL로 정리한다.

---

## ✅ JSX 안에서 JavaScript 표현식을 쓰려면 `{}`로 감싸야 함

JSX는 HTML과 JavaScript를 섞어 쓰기 위한 문법이다. JSX 안에서 JavaScript 코드(예: 변수, 함수 호출 등)를 실행하고 싶다면 반드시 `{}` 중괄호 안에 넣어야 한다.

```tsx
<Component>
  {2 + 3}         // ✅ OK - JavaScript 표현식
  {"Hello"}       // ✅ OK - 문자열도 표현식
  {someFunction()} // ✅ OK - 함수 호출도 가능
</Component>

```

## ✅ 함수형 children도 결국은 JavaScript 표현식이기 때문에 `{}` 필요함

```tsx

<Droppable droppableId="list">
  {(provided) => (
    <div ref={provided.innerRef}>
      {provided.placeholder}
    </div>
  )}
</Droppable>

```

`{(provided) => (...)}`는 **함수를 넘기고 있는 것**이다. JSX는 기본적으로 HTML 구조라고 생각하기 때문에, JS 표현식은 반드시 `{}`로 감싸줘야 인식할 수 있다.

---

## ✅ 다양한 함수 표현식의 차이

| 형태 | 설명 |
| --- | --- |
| `function hi() {}` | 선언식 함수 |
| `const hi = function () {}` | 익명 함수 표현식 |
| `const hi = () => {}` | 화살표 함수 표현식 |
| `(param) => JSX` | 괄호 없이 return 생략한 화살표 함수 |
| `(param) => { return JSX }` | 중괄호 사용 시 return 필요 |

---

### 🔍 예시 비교

```tsx

// 중괄호 없이 바로 리턴
<Droppable>
  {(provided) => (
    <div>{provided.placeholder}</div>
  )}
</Droppable>

// 중괄호 쓸 거면 return 필수!
<Droppable>
  {(provided) => {
    return <div>{provided.placeholder}</div>;
  }}
</Droppable>

```

---

## ❗️ 중괄호 없이 함수만 쓰면 생기는 문제

```tsx

<Droppable>
  (provided) => ( ... ) // ❌ JSX는 이걸 인식 못 함
</Droppable>

```

이건 JSX 입장에선 그냥 텍스트 같아서 에러를 발생시킴. 반드시 `{}`로 감싸야 JSX가 **“아! 이건 함수구나”** 하고 인식한다.

---

## ✅ 결론 정리

- JSX 안에서 JavaScript 표현식은 반드시 `{}`로 감싸야 한다.
- 화살표 함수로 JSX를 리턴할 때는 중괄호 없이 `()`만 써도 되지만, 중괄호를 쓰면 `return`도 써야 한다.
- Droppable처럼 함수형 children을 사용하는 컴포넌트에서는 반드시 중괄호로 함수 전체를 감싸야 한다.

---

## ✅ 한 줄 요약

> JSX에서 함수를 쓸 땐 JS 표현식이니까 {}로 감싸야 하며,
> 
> 
> 화살표 함수는 `()`로 JSX를 바로 리턴하거나 `{}` 안에 `return`을 써야 한다.
>