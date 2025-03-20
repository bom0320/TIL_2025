border-box에 대하여
===

### CSS Box Model의 기본 동작 방식

먼저, 하나의 `box`가 있다고 가정해보자. 여기에 `width: 200px`과 `padding-left: 50px`을 적용하면 어떤 일이 발생할까?

이 경우, 박스는 **"나는 200px을 원하지만, padding 50px도 필요해!"**라고 말하는 것과 같다.

### CSS의 기본 동작 방식

CSS의 기본 박스 모델에서는 `width` 속성이 **콘텐츠 영역(content area)**만을 의미한다. 즉, `padding`과 `border`는 포함되지 않는다.

따라서 `padding-left: 50px`을 적용하면:

- 전체 박스의 너비 = `width(200px) + padding-left(50px) + padding-right(기본값 0px)`
- 오른쪽 `padding` 값이 0이라면, 최종 박스의 크기는 **250px**이 된다.

이처럼 CSS는 `width: 200px`을 유지하면서 `padding`을 추가해 박스 크기를 키운다. 하지만 우리가 기대한 200px짜리 박스가 아니라 **250px짜리 박스**가 되어버린다.

---

### `box-sizing: border-box;`의 필요성

### Navigation Bar에서 발생한 문제

```css

.nav {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #f9f9fa;
    padding: 20px 50px;
    box-sizing: border-box;
    border-top: 1px solid rgba(121, 121, 121, 0.3);
}

```

여기서 `.nav` 요소에 `width: 100%`를 적용했는데, 동시에 `padding`을 추가했다. 하지만 기본적으로 CSS는 `width`를 `content` 영역으로만 계산하므로:

- `padding: 20px 50px`이 추가되면서 **네비게이션 바의 실제 너비가 100% + 좌우 padding(50px씩) = 100% + 100px**이 되어버린다.
- 즉, `nav`가 원래 의도보다 더 커져버린다.

이를 방지하기 위해 **`box-sizing: border-box;`**를 적용하면:

- `width` 속성이 `padding`과 `border`까지 포함한 값으로 계산된다.
- 즉, `width: 100%`가 **padding을 포함한 전체 크기**가 되어, 박스가 더 커지지 않는다.

결국 **"CSS야, padding을 줘도 너비를 늘리지 말아줘!"**라고 지정하는 것이 `box-sizing: border-box;`이다.

---

### 정리

1. 기본적으로 `width` 속성은 `content` 영역만을 포함하며, `padding`과 `border`는 추가적으로 적용된다.
2. 따라서 `padding`을 사용하면 박스가 예상보다 커질 수 있다.
3. 이를 방지하려면 `box-sizing: border-box;`를 적용해 `width`가 `padding`과 `border`를 포함하도록 만든다.

👉 `box-sizing: border-box;`를 사용하면 **우리가 설정한 `width` 그대로 유지하면서 padding과 border를 내부에서 조정**할 수 있다.