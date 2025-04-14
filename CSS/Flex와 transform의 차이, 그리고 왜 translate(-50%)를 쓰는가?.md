Flex와 transform의 차이, 그리고 왜 translate(-50%)를 쓰는가?
===

### 중앙 정렬의 원리와 다양한 구현 방식
오늘은 CSS 에서 "가운데 정렬"이라고 부르는 여러 방식들의 정확한 작동 원리를 깊이 있게 이해했다.
강의에서 본 코드 예제를 계기로, 직접 비교하고 의문을 던지며 개념적으로 정리하였다.

---


## 1. `left: 50% + transform: translateX(-50%)`의 원리
- `left: 50%`는 요소의 **왼쪽 모서리를 화면 너비의 50% 위치에** 두는 것
- 하지만 이 상태는 요소가 오른쪽으로 치우쳐 있음
- `transform: translateX(-50%)` 는 요소 자체의 **너비의 절반만큼 왼쪽으로 이동**시키는 역할
- 이 두개를 조합하면, 요소의 **가운데 중심이 화면의 정확한 수평 중앙에 위치**하게 됨


📌 이건 단순히 `left: 40%`같은 비례 정렬과는 다르게, **정확하고 반응형에도 안정적인 정렬 방식**이다.

---

## 2. `top: 20px` 이 있는 이유는?

```css
.nav {
    background-color: #2d2d2d;
    position: fixed;
    width: 30%;
    margin: 0 auto;
    top: 20px;
    border-radius: 50px;
    padding: 20px 0px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
}

.nav ul {
    display: flex;
    justify-content: center;
    gap: 50px;
}

.nav ul li {
    list-style: none;
    transform: none;
    transition: all 0.1s ease-in-out;
}

.nav ul li:hover {
    transform: scale(1.05);
}
```
- 강의 예제에서 네비게이션 바는 **"화면 정중앙"**이 아니라 **"화면 위쪽 정중앙"**에 위치해 있었음
- 그 이유는 `top: 20px` 을 사용했기 때문
- 이 코드는 **화면의 수직 방향에서는 위에서 20px만큼 떨어진 위치**에 고정시킴

```css
position: fixed;
top: 20px;
left: 50%;
transform: translateX(-50%);
```
➡️ 결과적으로, 가로는 중앙 정렬, 세로는 위에서 20px 위치에 고정.

---

## 3. 완전한 정중앙에 고정하고 싶다면?

```css
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
```
- `top: 50%`는 화면의 높이의 50% 위치에 요소 상단을 위치
- `transform: translate(-50%, -50%)` 는 
    - x축: **자기 너비의 50% 만큼 왼쪽**
    - y축: **자기 높이의 50% 만큼 위쪽**
- 결국 요소의 **정중앙이 화면의 정중앙에 위치**

`translate`에서 두개를 주는 이유는, 각각 x,y축을 조절하기 위해서!

---

## 4. Flexbox 기반 중앙 정렬과의 차이점

```css
display: flex;
justify-content: center;
align-items: center;
```
- Flexbox 방식은 **부모 요소 안에서 자식 요소를 정렬**할 때 사용
- `justify-content` : 수평 정렬
- `align-items` : 수직 정렬
- 부모가 `height: 100vh` 이면 화면 중앙 정렬처럼 보일 수도 있지만, 이건 **화면 크기나 부모 높이에 따라 위치가 바뀔 수 있음 (유동적)**

📌 **position: fixed + transform**은 화면의 정확한 고정 위치가 필요할 때 쓰임.
(예: 모달, 고정 네비게이션 바 등)

---

💭 오늘의 회고
처음에는 left: 50%만 쓰면 가운데 오는 줄 알았는데, 요소의 중심을 맞추는 것과 모서리를 맞추는 것의 차이를 깨달았다.
특히 transform: translateX(-50%)이 그 중심 정렬의 핵심이라는 걸 알게 된 게 오늘 가장 큰 수확.

또한 Flexbox 기반 정렬과 position: fixed 기반 정렬의 차이도 명확하게 구분할 수 있게 됐다.
레이아웃 관련해서 앞으로 마주할 다양한 상황에서도 적절한 방식으로 중앙 정렬을 구현할 수 있을 것 같다.
