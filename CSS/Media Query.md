# TIL - CSS Media Query

## **Media Query란?**

Media Query는 **CSS만을 이용해서 사용자의 스크린 크기를 확인할 수 있는 방법**이다.

이를 통해 **반응형 웹 디자인(Responsive Web Design)** 을 구현할 수 있다.

- 웹사이트를 보는 사용자의 **스크린 사이즈에 따라 스타일을 다르게 적용** 가능
- `@media screen and (max-width: 00px) {}` 구문을 사용하여 **특정 픽셀 이하에서 스타일 변경 가능**
- **최소/최대 크기 (`min-width`, `max-width`)를 조절하여 다양한 화면 크기에 대응 가능**

👉 [MDN 공식 문서 - Media Queries](https://developer.mozilla.org/ko/docs/Web/CSS/Media_Queries)

---

## **기본 문법**

```css
@media screen and (max-width: 768px) {
  body {
    background-color: lightblue;
  }
}
```

📌 **결과:**

👉 화면 크기가 **768px 이하**가 되면 배경색이 **lightblue로 변경**됨

---

## **Min-width & Max-width 사용하기**

✔ `min-width`: **이 크기 이상일 때 스타일 적용**

✔ `max-width`: **이 크기 이하일 때 스타일 적용**

```css
@media screen and (min-width: 600px) and (max-width: 1024px) {
  body {
    background-color: pink;
  }
}
```

📌 **결과:**

👉 화면 크기가 **600px 이상 1024px 이하**일 때 배경색이 **pink로 변경**됨

---

## **브라우저에서 디바이스 크기 확인하기**

1. **개발자 도구(DevTools) 열기** → `F12` 또는 `Ctrl + Shift + I` (Mac: `Cmd + Option + I`)
2. **Device Toolbar 활성화** (`Ctrl + Shift + M` 또는 상단의 📱 아이콘 클릭)
3. **핸드폰 기종별 화면 크기 선택**
4. 다양한 기기에서 Media Query가 어떻게 적용되는지 확인 가능

---

## **화면 방향 (세로/가로) 감지하기**

📍 `orientation: portrait` → **세로 모드**

📍 `orientation: landscape` → **가로 모드**

```css
@media screen and (orientation: landscape) {
  body {
    background-color: yellow;
  }
}
```

📌 **결과:**

👉 화면이 **가로 모드(landscape)** 일 때 배경색이 **yellow로 변경**됨

---

## **추가 학습할 내용**

📍 **반응형 레이아웃 만들기 (`flexbox`, `grid` 활용)**

📍 **미디어 쿼리를 단계별로 조정하여 다양한 해상도 대응**

📍 **모바일 기기에서의 최적화된 스타일 적용**
