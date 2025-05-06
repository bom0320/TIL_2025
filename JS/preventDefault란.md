preventDefault란?
===

### ✅ 개념

`preventDefault()`는 JavaScript 이벤트 객체의 메서드로, **브라우저의 기본 동작을 막는 역할**을 한다.

### 💡 예시

```jsx

form.addEventListener("submit", function(e) {
  e.preventDefault(); // 폼 제출로 인한 페이지 새로고침 방지
  console.log("Form submitted without page reload!");
});

```

### 🚫 사용 예

- `<form>` 제출 시 페이지 리로드 방지
- `<a href="#">` 클릭 시 페이지 상단 이동 방지
- 드래그, 마우스 우클릭, 키보드 입력 등 기본 브라우저 반응 차단

### 🧠 한 줄 정리

> preventDefault()는 사용자의 동작에 따른 기본 브라우저 행동을 취소하는 데 사용된다.
> 

---