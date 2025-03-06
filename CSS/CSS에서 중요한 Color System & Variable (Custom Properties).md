# CSS에서 중요한 Color System & Variable (Custom Properties)

## 🎨 Color System

CSS에서 색상을 지정하는 방법은 여러 가지가 있지만, 특히 중요한 두 가지 방식이 있다.

### 1. Hexadecimal Color (16진수 컬러)

- 16진수로 색상을 표현하는 방식이다.
- `#000000` (검은색), `#FFFFFF` (흰색)처럼 `#` 뒤에 6자리 또는 3자리의 16진수 값을 사용한다.

예제:

```css
background-color: #fcce00; /* 노란색 */
color: #000000; /* 검은색 */
```

### 2. RGB & RGBA 방식

- 디자이너들이 많이 사용하는 방식으로, `rgp(red, green, blue)` 또는 `rgba(red, green, blue, alpha)` 형태로 표현한다.
- `rgba` 에서 네 번째 값(`alpha`)은 투명도를 의미한다.

```css
background-color: rgb(252, 206, 0); /* 노란색 */
color: rgba(205, 23, 0, 0.5); /* 빨간색(투명도 50%) */
```

---

## 🎯 CSS Variables (Custom Properties)

CSS 변수는 코드를 더 효율적으로 관리할 수 있게 도와주며, CSS를 마치 프로그래밍 언어처럼 활용할 수 있게 한다.

### 1. 변수 선언 방법

- CSS 변수는 -- 두 개의 대시(-)로 시작하는 이름을 사용하여 정의한다.
- `:root`에서 변수를 선언하면 전체 문서에서 사용할 수 있다.
- 변수 이름에는 띄어쓰기 대신 -을 사용해야 한다.

```css
:root {
  --main-color: #fcce00;
  --default-border: 1px solid var(--main-color);
}
```

### 2. 변수 사용 방법

- `var(--변수이름)`을 사용하여 선언한 변수를 적용할 수 있ㄷ.

```css
p {
  background-color: var(--main-color);
}
a {
  color: var(--main-color);
}
div {
  border: var(--default-border);
}
```

### 3. CSS 변수의 장점

✅ 일관성 유지: 한 번 정의하면 여러 요소에서 동일한 값을 사용 가능

✅ 유지보수 용이: 값 변경 시 한 곳만 수정하면 전체 스타일이 자동으로 업데이트됨

✅ 다양한 값 적용 가능: 색상뿐만 아니라 px, em, vh, vw 등의 단위도 변수로 설정 가능

---

## ✍️ 마무리

Color 시스템과 CSS 변수를 잘 활용하면 코드의 유지보수성과 가독성이 높아진다. 특히, CSS 변수를 활용하면 프로젝트 전반에서 일관된 디자인을 유지하면서도 유연한 스타일링이 가능하다. 앞으로 CSS를 사용할 때 적극적으로 활용해보자
