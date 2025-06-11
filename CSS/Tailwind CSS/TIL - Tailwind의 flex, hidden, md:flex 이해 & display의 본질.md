TIL - Tailwind의 flex, hidden, md:flex 이해 & display의 본질
===

## 오늘 헷갈렸던 부분
처음엔 `flex` 를 단순히 가로 정렬하는 속성이라고 이해했었고, `md: flex`는 그저 반응형 정렬용이라고 생각음
그래서 nav 메뉴를 보여주기 위해 굳이 `md: flex`가 필요한 이유가 잘 이해되지 않았음

## 핵심 정리
### 1. `display`가 본질

- HTML 요소가 **보이냐 / 안 보이냐**, **어떻게 배치되느냐**를 결정하는 핵심 속성이 `display`
- `display: none` → 요소 자체가 화면에서 사라짐 (보이지 않음 + 공간도 차지하지 않음)
- `display: flex` → 요소가 보이고, 자식 요소들이 flexbox 방식으로 배치됨

### 2. `flex`는 "정렬 방법"이지, "보이게 만드는 속성"은 아님

- `flex`는 실제로는 `display: flex`를 의미하고,
- 자식 요소들을 **가로 or 세로 방향**으로 정렬하는 도구일 뿐임
- 단, 기본값이 `flex-direction: row`라서 보통 가로 정렬로 보임 → 그래서 흔히들 "flex = 가로 정렬"로 착각함

### 3. Tailwind에서의 `hidden`, `md:flex`는 결국 `display` 제어

| Tailwind 클래스 | 실제 CSS 효과 |
| --- | --- |
| `hidden` | `display: none` |
| `flex` | `display: flex` |
| `md:flex` | 768px 이상에서 `display: flex` |
| `md:hidden` | 768px 이상에서 `display: none` |

→ 즉, Tailwind는 `display` 속성을 **조건부로 적용하는 래퍼일 뿐**이다.

---

### 실전 적용: `nav` 메뉴 예시

```tsx
<nav className="hidden md:flex">...</nav>
```

- 모바일에서는 `display: none` → 메뉴가 숨겨짐
- 데스크탑에서는 `display: flex` → 메뉴가 보이고, 자식들이 가로로 정렬됨
- 메뉴의 **보임 여부 자체가 flex 때문에 결정된 것처럼 보이지만**,
    
    실제 핵심은 `display: none → display: flex`라는 **display 상태의 전환**이었다.
    

---

### 오늘의 교훈

> Tailwind의 hidden, flex, md:flex 등은 전부 결국 display 속성을 조작하는 방식임
> 
> 
> 요소가 보이느냐 안 보이느냐는 `display`가 결정하며, `flex`는 정렬 도구일 뿐임
> 
> 반응형 조건부 렌더링도 `display`의 on/off 개념으로 이해해보자
>