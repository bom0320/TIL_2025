TIL: opacity와 transition의 역할과 조합 효과
===

## ✅ 오늘 배운 개념

CSS에서 이미지 요소에 `opacity`와 `transition` 속성을 함께 사용하면,

**시각적으로 부드럽고 고급스러운 효과**를 만들 수 있다.

---

## 🧩 상황 예시

```css
.movie img {
  max-width: 100%;
  min-height: 100%;
  border-radius: 10px;
  transition: opacity 0.3s ease-in-out;
  opacity: 0.7;
}

.movie img:hover {
  opacity: 1;
}

```

## ✅ 개념 정리

### 1. `opacity`

| 값 | 의미 |
| --- | --- |
| `1` | 완전히 불투명 (기본값) |
| `0.7` | 살짝 투명 |
| `0` | 완전히 투명 (안 보임) |

> opacity는 요소의 투명도를 설정하는 속성이다.
> 
> 
> 값이 1에 가까울수록 불투명, 0에 가까울수록 투명해진다.
> 

### 예시

```css

.movie img {
  opacity: 0.7; /* 기본 상태: 살짝 흐릿함 */
}
.movie img:hover {
  opacity: 1; /* 마우스 올리면 선명해짐 */
}

```

---

### 2. `transition`

```css

transition: opacity 0.3s ease-in-out;

```

| 구성 요소 | 설명 |
| --- | --- |
| `opacity` | 변화를 부드럽게 줄 대상 속성. 
여기서는 opacity 값이 바뀔 때만 효과 적용 |
| `0.3s` | 변화에 걸리는 시간 (0.3초) |
| `ease-in-out` | 변화 속도의 곡선 (천천히 시작 → 빨라졌다가 → 천천히 끝남) |

> transition은 요소의 속성이 변화될 때 애니메이션처럼 부드럽게 보여주는 역할을 한다.
> 

---

### 💡 자주 사용하는 `transition-timing-function`

| 값 | 설명 |
| --- | --- |
| `linear` | 시작~끝까지 일정한 속도 |
| `ease` | 기본값, 빠르게 시작 후 느려짐 |
| `ease-in` | 천천히 시작해서 빨라짐 |
| `ease-out` | 빠르게 시작해서 천천히 끝남 |
| `ease-in-out` | 천천히 시작 → 빨라짐 → 천천히 끝남 (자연스러움 최상) ✅ 추천! |

---

### 📦 참고 예시: 여러 속성 동시에 적용하기

```css
cs
transition: all 0.3s ease-in-out;
/* 또는 */
transition: opacity 0.3s ease-in-out, transform 0.2s ease;

```

> 여러 속성을 한꺼번에 부드럽게 바꾸고 싶을 땐 쉼표로 나열하면 됨
> 

---

✅ 결론:

> transition은 단순히 “효과 주는 것”이 아니라,
> 
> 
> **변화의 과정을 시각적으로 부드럽게 보여주는 핵심적인 도구**
> 

## 🎯 둘을 조합하면?

- **기본 상태**: 이미지는 `opacity: 0.7`로 살짝 흐릿하게 표시됨
- **마우스를 올리면**: `opacity: 1`로 바뀌면서,
    
    `transition` 덕분에 **0.3초 동안 서서히 선명해지는 효과** 발생
    

---

## ❌ 만약 `transition`이 없다면?

- `opacity`가 바뀔 때 **툭! 끊기듯 갑자기 바뀜**
- 사용자 경험이 딱딱하고 부자연스러움

---

### 💡 자주 사용하는 `transition-timing-function`

| 값 | 설명 |
| --- | --- |
| `linear` | 시작~끝까지 일정한 속도 |
| `ease` | 기본값, 빠르게 시작 후 느려짐 |
| `ease-in` | 천천히 시작해서 빨라짐 |
| `ease-out` | 빠르게 시작해서 천천히 끝남 |
| `ease-in-out` | 천천히 시작 → 빨라짐 → 천천히 끝남 (자연스러움 최상) ✅ 추천! |

---

### 📦 참고 예시: 여러 속성 동시에 적용하기

```css

transition: all 0.3s ease-in-out;
/* 또는 */
transition: opacity 0.3s ease-in-out, transform 0.2s ease;

```

> 여러 속성을 한꺼번에 부드럽게 바꾸고 싶을 땐 쉼표로 나열하면 됨
> 

---

✅ 결론:

> transition은 단순히 “효과 주는 것”이 아니라,
> 
> 
> **변화의 과정을 시각적으로 부드럽게 보여주는 핵심적인 도구**
> 

## ✅ 정리 요약

| 속성 | 설명 |
| --- | --- |
| `opacity` | 요소의 투명도를 조절하는 속성 (0 ~ 1) |
| `transition` | 특정 속성이 바뀔 때 그 **과정을 자연스럽게 애니메이션처럼 표현** |

---

## 💬 기억할 문장

> "opacity는 투명도를 바꾸고, transition은 그 변화를 부드럽게 만든다."
>