TIL: transition과 transform의 차이와 조합 이해하기
===

## ✅ 개요

오늘은 CSS에서 자주 혼동되는 `transition`과 `transform`의 차이점에 대해 정확하게 이해했다.

이 두 속성은 종종 함께 쓰이지만, **역할과 기능이 명확히 다르며**,

단독으로도 충분히 동작할 수 있는 속성이다.

---

## ✅ 핵심 정의

| 속성 | 정의 |
| --- | --- |
| `transform` | 요소의 **형태를 변화**시키는 속성. 크기, 회전, 이동, 기울이기 등을 수행 |
| `transition` | 요소의 **변화 과정을 부드럽게** 보여주는 속성. 애니메이션 효과 담당 |

---

## 🧠 각각의 역할 정리

### 🔧 `transform`

> 요소의 모양이나 상태를 직접 바꿈 (무엇을 어떻게 바꿀지 지정)
> 

| 예시 | 의미 |
| --- | --- |
| `transform: scale(1.2);` | 1.2배 확대 |
| `transform: rotate(10deg);` | 10도 회전 |
| `transform: translateX(50px);` | 오른쪽으로 50px 이동 |

---

### 🎬 `transition`

> 요소의 스타일이 바뀔 때, 그 변화를 부드럽게 애니메이션처럼 보여줌
> 

```css
transition: [어떤 속성이 바뀔 때] [얼마나 오래] [어떤 스타일로]
```

| 구성 요소 | 설명 |
| --- | --- |
| 속성 | 어떤 속성이 변할 때 적용할지 (ex. `opacity`, `transform`) |
| 지속 시간 | 변화에 걸리는 시간 (ex. `0.3s`) |
| 타이밍 함수 | 변화 속도의 패턴 (ex. `ease-in-out`, `linear`, etc.) |

---

## 🎯 함께 사용했을 때의 예시

```css

.card {
  transition: transform 0.3s ease-in-out;
}

.card:hover {
  transform: scale(1.1);
}

```

- `transform`: 카드가 1.1배 커짐
- `transition`: 그 커지는 과정을 0.3초 동안 부드럽게 보여줌

---

## 🤔 자주 드는 질문: `transition`만 써도 변화가 일어나는가?

### ✅ 예! 하지만 **속성 값이 실제로 바뀌어야만** 동작한다.

예시:

```css

.box {
  opacity: 0.5;
  transition: opacity 0.3s ease-in-out;
}

.box:hover {
  opacity: 1;
}

```

- 여기서는 `transform`이 없이도 `opacity` 값이 변화하기 때문에,
- `transition`이 그 변화를 부드럽게 표현해준다

---

## ✅ 둘의 차이를 한 문장으로 정리하면?

> transform은 무엇을 바꿀지,
> 
> 
> `transition`은 **그걸 얼마나 자연스럽게 바꿀지** 결정한다.
> 

---

## 💬 기억할 문장

> "transform이 목적지라면, transition은 그 목적지까지 가는 여정이다."
> 

---

## 💡 참고 타이밍 함수 종류 (`transition`에서 자주 사용)

| 값 | 설명 |
| --- | --- |
| `linear` | 속도 일정 |
| `ease` | 시작 빠르게 → 천천히 끝남 (기본값) |
| `ease-in` | 천천히 시작 → 빨라짐 |
| `ease-out` | 빠르게 시작 → 천천히 끝남 |
| `ease-in-out` | 천천히 시작 → 빠르게 → 천천히 끝 (자연스럽고 추천) ✅ |

---

## 📦 보너스 예시: 여러 속성에 transition 적용

```css

.box {
  transition: opacity 0.3s ease, transform 0.2s ease-in-out;
}

.box:hover {
  opacity: 1;
  transform: scale(1.1);
}

```

---

## ✅ 마무리 요약

| 속성 | 무엇을 하는가 | 함께 쓸 경우 |
| --- | --- | --- |
| `transform` | 요소의 형태나 위치 변경 | 변화의 대상 |
| `transition` | 그 변화 과정을 부드럽게 표현 | 변화의 연출 담당 |

이번 정리를 통해, 변화 자체를 일으키는 속성과 그 과정을 연출하는 속성을 분리해서 정확히 이해하게 되었고,

앞으로 다양한 인터랙션 구현에 더 자유롭게 사용할 수 있을 것 같다.