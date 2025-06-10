CSS 미디어 쿼리(Media Query)
===

## 미디어 쿼리란?
- 미디어 쿼리는 한마디로 말해,CSS에서 어떤 스타일을 선택적으로 적용하고 싶을때 사용한다.

- 즉, 다양한 디바이스(pc, 태블릿, 모바일 등) 환경에 따라 다른 CSS 스타일을 적용할 수 있도록 도와주는 기능이다.
- 조건에 따라 CSS 를 적용할 수 있기 때문에, 반응형 웹디자인의 핵심 기술 중 하나로 꼽힌다.

**📌 쉽게 말해:**
- if문처럼 조건을 주고, 그 조건을 만족할 때만 CSS를 적용 하는 방식이다.


### 기본 문법

```css
@media (조건) {
    /* 조건을 만족할 때 적용할 스타일 */
}
```
즉, 조건이 참이면 스타일이 적용되고, 조건이 거짓이면 무시된다.

## 대표적인 사용 예

### 📱 1. 좁은 화면(모바일) 스타일링
> 화면의 최대 너비를 조건으로 사용 (max-width)

```css
@media (max-width: 800px) {
  .small-tomato {
    background-color: tomato;
  }
}
```
- ex: 800px 이하인 화면에서만 .small-tomato 요소의 배경색을 토마토로 바꾼다.

### 🖥 2. 넓은 화면(TV, 데스크탑 등) 스타일링
> 회면의 최소 너비를 조건으로 사용 (min-width)

```css
@media (min-width) {
    color: tomato;
}
```
- 800px 이상인 화면에서만 .large-tomato 요소의 글자색을 토마토로 바꾼다.

### 🧩 3. 화면 너비에 따라 요소 숨기기
> display: none 을 미디어 쿼리 조건에 맞춰 적용

```css
 @media (max-width: 600px) {
  .desktop {
    display: none;
  }
}

@media (min-width: 1000px) {
  .mobile {
    display: none;
  }
}
```
📌 정리:
- 600px 이하에서는 .desktop 요소 숨김
- 1000px 이상에서는 .mobile 요소 숨김


----

## 🌙 확장 개념 - 다크 모드 감지
> prefers-color-scheme을 이용하면, 사용자 시스템의 다크모드 설정에 따라 스타일을 바꿀 수 있다.

```css
@media (prefers-color-scheme: dark) {
  body {
    background-color: black;
    color: white;
  }
}

```

### 마무리
- 미디어 쿼리는 반응형 웹 디자인에서 필수적인 도구
- 화면 너비분 아니라, 색상 선호도, 디바이스 해상도, 화면 방향 등 다양한 조건을 감지할 수 있다.
- 이후에는 다크모드와 고해상도 디스플레이 대응 등에 대해서도 공부하면 좋다.