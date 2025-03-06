# CSS Transformation

## **Transformation이란?**

CSS `transform` 속성을 사용하면 HTML 요소를 변형할 수 있다.

- **이동 (translate)**
- **회전 (rotate)**
- **크기 조정 (scale)**
- **기울이기 (skew)**
- **3D 변형 (rotateX, rotateY 등)**

👉 [MDN 공식 문서](https://developer.mozilla.org/ko/docs/Web/CSS/transform) 참고

---

## **Transformation의 특성**

✔ **Box 자체를 변경하지 않음** → 즉, **sibling(형제 요소)** 에게 영향을 주지 않음

✔ **Margin, Padding이 적용되지 않음** → `translateX`, `translateY`는 margin/padding을 대체하는 것이 아님

✔ **요소 자체를 이동시킬 뿐, 다른 요소의 box 레이아웃을 바꾸지 않음**

✔ **Transformation은 픽셀 레벨에서 발생하며, box 모델과 독립적임**

✔ **여러 transformation 효과를 결합할 수 있음**

---

## **CSS 3D Transformation**

- **GPU를 활용하여 3D 작업을 수행** → 성능이 최적화됨
- `rotateX`, `rotateY`, `rotateZ` 등을 사용해 **입체적인 효과** 가능
- `perspective`를 활용하면 **원근감 추가 가능**

```css
.container {
  perspective: 800px;
}

.box {
  transform: rotateY(45deg);
}
```

📌 **결과**: 3D 공간에서 요소가 회전하는 효과

---

## **Transformation + Transition = 부드러운 애니메이션**

✔ `transition`과 함께 사용하면 **자연스러운 애니메이션** 연출 가능

```css
.box {
  transition: transform 0.5s ease-in-out;
}

.box:hover {
  transform: rotate(360deg) scale(1.2);
}
```

📌 **결과**: 마우스를 올리면 360도 회전하면서 확대됨

---

## **추가 학습할 내용**

📍 여러 `transform` 효과 조합해보기

📍 `perspective`, `transform-origin` 속성 실험해보기

📍 `animation`과 결합하여 더 역동적인 UI 만들기

---
