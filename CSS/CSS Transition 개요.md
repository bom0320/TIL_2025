# CSS Transition 개요

`transition`은 한 상태에서 다른 상태로의 변화를 부드럽게 만들어주는 애니메이션 효과이다.

주로 `hover`,`focus`, `active` 등의 상태 변화가 발생할 때 사용된다.

---

## 1. transition의 기본 규칙

### Rule 1. transition은 state 가 없는 요소에 적용해야 한다.

- `transition`은 기본 상태에서 정의되어야 한다.
- 상태(`hover`, `active`등)에 적용하면 상태가 해제될 때 원래대로 즉시 되돌아간다.

```css
.box {
  transition: all 0.3s ease-in-out;
}

.box:hover {
  background-color: red;
}
```

- `transition`을 `.box:hover`에 주는 것이 아니라 기본 상태인 `.box`에 줘야 한다.

---

### Rule2. 변화하는 속성만 transition 효과를 받는다.

- `transition`은 변화가 발생하는 속성들에만 적용된다.
- 상태가 변할 때 변경되는 속성이 기준이 되어 바뀐다.

```css
.box {
  width: 100px;
  height: 100px;
  background-color: blue;
  transition: width 0.5s ease-in-out, background-color 1s ease-out;
}

.box:hover {
  width: 200px;
  background-color: red;
}
```

- `width`는 `0.5s`동안 변화하고, `background-color`는 `1s`동안 변화한다.

---

## 2. Transition 속성 구성

**`transition: property duration timing-function delay;`**

- `property` -> 변화를 적용할 속성 (ex: width, background-color, transform 등)
- `duration` -> 변화 지속 시간 (ex: 0.3s, 1s등)
- `timing-function` -> 변화 진행 속도 (ex: ease-in, linear 등)
- `delay` -> 몇 초 후에 변화가 시작될지 설정 (ex: 0.5s 등)

```css
.box {
  transition: background-color 0.5s ease-in 0.2s;
}
```

- `background-color`가 `0.2초` 후에 `0.5초` 동안 `ease-in` 방식으로 변화

---

## 3. Timing Function 종류

변화의 속도를 조절하는 timing function

| Function                     | 설명                      |
| ---------------------------- | ------------------------- |
| `linear`                     | 일정한 속도로 변화 (직선) |
| `ease-in`                    | 시작이 느리고 끝이 빠름   |
| `ease-out`                   | 시작이 빠르고 끝이 느림   |
| `ease-in-out`                | 시작과 끝이 느림          |
| `cubic-bezier(x, y, x2, y2)` | 직접 커스텀 가능          |

```css
.box {
  transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}
```

- `cubic-bezier`를 사용해 부드러운 커스텀 애니메이션 적용 가능

---

## 4. `all`을 사용한 전체 속성 적용

```css
.box {
  transition: all 0.5s ease-in-out;
}
```

- 모든 속성이 `0.5s`동안 변화
  하지만 성능 최적하를 위해 **필요한 속성만 명시**하는 것이 좋다.

```css
.box {
  transition: width 0.3s ease-in, background-color 0.5s ease-out;
}
```

---

### 마무리

- `transition`은 state가 없는 기본 요소에 설정해야 함
- 상태(`hover`, `focus`등)가 변하면 변화하는 속성만 transition이 적용됨
- `timing-function`을 사용해 다양한 속도 제어 가능
- `all`을 사용하면 모든 속성이 변하지만 성능을 위해 특정 속성만 지정하는 것이 좋음
