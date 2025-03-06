## 왜 inline 요소는 위아래 margin이 적용되지 않을까?

`span` 같은 inline 요소는 기본적으로 너비(width)와 높이(height)를 가질 수 없고, 따라서 위아래(`margin-top`, `margin-bottom`)에 margin 을 적용할 수 없다. 하지만 좌우(`margin-left`, `margin-right`) 에는 적용 가능하다.

### ✅ 왜 inline 요소는 위아래 margin이 적용되지 않을까?

- `inline` 요소는 기본적으로 **텍스트처럼 동작**하기 때문이다.
- `margin-top`과 `margin-bottom`을 설정하더라도 렌더링에 영향을 미치지 않음 → 즉, 공간이 생기지 않음
- 하지만 `padding`은 위아래에도 적용이 가능하고, **주변 요소와의 간격을 조정할 때 유용하게 사용될 수 있음**

---

## 그러면, `span` 요소에 위아래 margin 을 주고 싶다면?

👉 해결 방법: `display` 속성을 변경하기!

```css
span {
  display: block; /* 또는 inline-block */
  margin: 10px 0;
}
```

#### `display: block;`

- `span`을 블록 요소로 바꿔주면, 위아래 margin 을 정상적으로 적용할 수 잇음

#### `display: inline-block;`

- inline 의 성질을 유지하면서도 너비와 높이를 가질 수 있음
- 위아래 margin 도 정상적으로 적용 가능

---

## 정리

1. **inline 요소(`span`, `a`, `strong` 등)**는 기본적으로 width, height 를 가질 수 없으며 위아래 margin 적용이 불가능
2. padding 은 사방에 적용 가능하지만, margin 은 좌우만 적용됨
3. 위아래 margin 을 적용하고 싶다면 `display: block;` 또는 `display: inline-block;`으로 변경하면 해결 가능!
