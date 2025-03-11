# 📌 CSS: display, margin, collapsing margin 정리

## 1. display 속성

### display: inline;

- `span`, `a`, `strong` 등 **텍스트처럼 흐름을 유지**하는 요소
- width, height 를 가질 수 없음!!
- 위 아래 margin 이 적용되지 않음 (좌우 margin 만 적용 가능)
- padding은 적용 가능하지만, 위아래 padding 은 주변 요소에 영향을 주지 않음

### display: block;

- `div`, `p`, `h1` 등 **한 줄을 차지하는 요소**
- width, height 설정 가능
- 위 아래, margin과 padding 적용 가능

### display: inline-block

- inline 과 block의 특성을 혼합
- inline 처럼 줄바꿈 없이 배치되지만, width, height 설정 가능
- 위 아래 margin 과 padding 적용 가능하다.

---

## 2. margin 속성

### margin 의 값 개수에 따른 적용 방식

```css
/* 1 value */
margin: 10px; /* 상하좌우 10px */

/* 2 values */
margin: 10px 20px; /* 상하 10px, 좌우 20px */

/* 3 values */
margin: 10px 20px 30px; /* 상 10px, 좌우 20px, 하 30px */

/* 4 values */
margin: 10px 20px 30px 40px; /* 상 10px, 우 20px, 하 30px, 좌 40px */
```

4개의 값이 있을 경우 시계방향(Top → Right → Bottom → Left)으로 적용됨

---

## 3. collapsing margin (마진 병합)

### 개념

- 두 개의 box의 `border`가 맞닿을 때 margin이 병합되는 현상
- 수직 방향(margin-top, margin-bottom)에서만 발생 (수평 방향에서는 발생하지 않음)
- 두 margin 값이 합쳐지는 것이 아니라 더 큰 margin 값만 적용됨

### 예제

```css
.box1 {
  margin-bottom: 30px;
}
.box2 {
  margin-top: 50px;
}
/* box1과 box2의 margin이 겹치면 더 큰 50px만 적용됨 */
```

### 해결 방법

- `padding`을 사용하여 해결 가능!
- 부모 요소에 `padding-top`을 추가하면 margin 병합이 발생하지 않음

```css
.parent {
  padding-top: 1px; /* margin 병합 방지 */
}
```

- `border` 추가
- `overflow: hidden;` 적용

---

## 🎯 정리

- `inline` 요소는 **width, height 가 없고 위아래 margin 이 적용되지 않음**
- `block` 요소는 **한 줄을 차지하여 width, height 조정 가능**
- `margin`은 값 개수에 따라 다르게 적용됨 (1개: 전체, 4개: 시계방향)
- `collapsing margin`은 **수직 방향에서만 발생**하며, 해결할려면 `padding` 또는 `border`를 사용하면 된다.
