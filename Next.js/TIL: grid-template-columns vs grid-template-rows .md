TIL: grid-template-columns vs grid-template-rows
===

## ✅ 개요

CSS Grid 레이아웃에서 `grid-template-columns`와 `grid-template-rows`의 차이를 정확히 이해하고, 각각이 어떤 상황에서 사용되는지 정리했다.

이전에 헷갈렸던 개념을 중심으로, 나중에 봐도 명확하게 알 수 있도록 구조적으로 정리함.

---

## 🧩 내가 헷갈렸던 점

| 헷갈림 | 잘못 이해했던 부분 | 올바른 개념 |
| --- | --- | --- |
| `grid-template-rows`가 너비 조절인 줄 알았음 | 이름에 `rows`인데 왜 너비가 바뀌지? | `rows`는 **세로 방향(높이)** 조절 |
| `columns`와 `rows` 관계가 헷갈림 | 하나는 전체, 하나는 개별? | `columns` → 전체 가로 배치 / `rows` → 개별 요소 내부 세로 배치 |
| `grid-template-rows: 1fr auto` 의미 모호 | 왜 이미지가 커지고 텍스트는 작지? | `1fr`: 남은 공간 차지 / `auto`: 콘텐츠 크기만큼 |

---

## 🧠 핵심 개념 정리

### ✅ `grid-template-columns`

- **그리드 컨테이너가 자식 요소를 가로(열)로 나누는 방식**
- 한 줄에 몇 개의 칸을 만들지 정하고, 각 칸의 너비도 조절 가능

```css
grid-template-columns: repeat(5, 1fr);
/* → 한 줄에 동일 너비의 칸 5개 생성 */

```

### ✅ `grid-template-rows`

- **컨테이너나 요소 내부에서 요소를 세로(행)로 나누는 방식**
- 내부 요소를 위아래로 배치할 때 유용

```css

grid-template-rows: 1fr auto;
/* → 위: 남는 공간 모두 차지 / 아래: 콘텐츠만큼 */

```

---

### ✅ 단위 정리

| 값 | 의미 |
| --- | --- |
| `1fr` | 남는 공간을 비율로 나눔 |
| `auto` | 내용 크기만큼만 차지 |
| `px` | 고정된 크기 |
| `minmax(min, max)` | 최소/최대 크기 범위 설정 |

---

## 🎯 구조적 비유

| 속성 | 설명 | 비유 |
| --- | --- | --- |
| `grid-template-columns` | 전체 요소의 가로 칸 정렬 | 책장을 가로로 몇 칸 나눌지 결정 |
| `grid-template-rows` | 개별 요소 내부의 세로 배치 | 책장 한 칸 안에서 위는 책, 아래는 제목 |

---

## ✅ 실전 코드 예시

### Home 컴포넌트 CSS (전체 배치)

```css

.container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 25px;
}

```

### Movie 컴포넌트 CSS (내부 세로 정렬)

```css

.movie {
  display: grid;
  grid-template-rows: 1fr auto;
}

```

---

## 💬 핵심 암기 문장

- `grid-template-columns` → **전체 가로 칸 배치**
- `grid-template-rows` → **각 요소 내부의 세로 구성**
- 둘은 **서로 독립적이지만 함께 레이아웃을 구성**함

---

## 📌 확장 학습용 속성들

```css

/* 자동으로 칸 개수 맞춰서 정렬 */
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

```

| 속성 | 설명 |
| --- | --- |
| `auto-fit` | 가능한 만큼 칸을 만들고 빈 칸은 접음 |
| `auto-fill` | 가능한 만큼 칸을 만들고 빈 칸도 유지 |

---

## 🧠 마무리

이번 정리를 통해:

- `columns`는 **전체 구조**
- `rows`는 **개별 구조**
라는 개념이 완전히 정립되었음.

앞으로 Flexbox와 비교해서 언제 Grid를 쓰는 게 적절한지도 함께 고민해볼 예정.