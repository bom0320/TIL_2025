'As' and Attrs에 대하여
===

## 1. `as` - 컴포넌트의 태그를 동적으로 바꾸기
`as` 는 styled-components에서 **컴포넌트의 태그를 다른 태그롤 바꿀 수 있게 해주는 props**이다.

### 📌 언제 쓰냐면?
하나의 스타일을 여러 태그 (`<a>`, `<button>`, `<div>` 등)에 적용하고 싶을때!

**예시**
```jsx
const Button = styled.button`
    background: tomato;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
`;

// 실제 사용할 때 태그를 바꿀 수 있어
<Buttosn>버튼</Buttosn>
<Button as="a" href="https://example.com">링크처럼 보이게</Button>

```
👉  `as="a"`를 주면 버튼 스타일은 유지한 채 `<a>`태그로 변신!

---

## 2. `attrs` - 기본 props나 HTML 속성 설정
`attrs`는 **컴포넌트에 기본 속성을 미리 넣어줄 수 있는 기능**이다.


### 📌 언제 쓰냐면?
- 항상 `type="submit"`인 버튼
- 항상 `placeholder="이름을 입력하세요"`인 input 처럼, 반복적으로 들어가는 속성들을 미리 넣고 싶을 때!

**예시**

```jsx
const Input = styled.input.attrs({
  type: "text",
  placeholder: "이름을 입력하세요",
})`
  padding: 10px;
  border: 1px solid #ccc;
`;
```
👉 `Input`을 사용할 때마다 `type`과 `placeholder`를 따로 안 써도 됨!

### ⛏ 동적으로도 설정 가능!

```jsx
const Input = styled.input.attrs(props => ({
  type: "text",
  placeholder: props.name || "입력하세요",
}))`
  padding: 10px;
`;
```

----

## 🔄 요약하면

| 기능 | 역할 | 대표 사용 상황 |
| --- | --- | --- |
| `as` | 태그를 동적으로 바꿈 | `<Button as="a" />` 처럼 태그를 바꿔야 할 때 |
| `attrs` | 기본 속성을 설정 | 기본 `type`, `placeholder` 등을 설정하고 싶을 때 |