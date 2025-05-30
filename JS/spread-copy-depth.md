# 스프레드 연산자(...)의 복사 방식과 얕은 복사 vs 깊은 복사

프론트엔드에서 자주 쓰이는 `...` 스프레드 연산자는

**객체나 배열을 복사하거나 확장할 때 유용**하지만,

그 내부 동작 방식과 복사의 "깊이"를 이해하지 못하면 **예기치 않은 버그**가 생길 수 있다.

이번 TIL에서는 다음을 정리한다:

- 객체 vs 배열에서 `...`의 동작 차이
- 얕은 복사 vs 깊은 복사
- 언제 문제가 생기는지, 해결법은 무엇인지

---

## 스프레드 연산자란?

> ... 연산자는 배열 또는 객체를 펼쳐서 다른 곳에 복사하거나 합칠 때 사용된다.
> 

### ✅ 배열에서 사용

```
const arr = [1, 2, 3];
const copy = [...arr]; // [1, 2, 3]

```

### ✅ 객체에서 사용

```tsx

const obj = { a: 1, b: 2 };
const copy = { ...obj }; // { a: 1, b: 2 }

```

---

## ❗ 배열 복사 시 `{ ...array }`는 위험!

```tsx

const arr = ['a', 'b', 'c'];
const wrong = { ...arr };

console.log(wrong);
// { 0: 'a', 1: 'b', 2: 'c' } ← 객체가 되어버림!

```

### ✅ 올바른 복사 방식:

```tsx

const correct = [...arr]; // 배열 복사됨

```

---

## ✅ 얕은 복사 (shallow copy)

> 첫 번째 층만 복사하고, 안에 있는 객체/배열은 원본과 같은 참조를 공유한다.
> 

### 예시:

```tsx

const original = [{ id: 1 }, { id: 2 }];
const copy = [...original]; // 얕은 복사

copy[0].id = 999;

console.log(original[0].id); // ❗ 999 → 원본도 바뀜!

```

---

## ✅ 깊은 복사 (deep copy)

> 안에 있는 객체, 배열까지 전부 완전히 새로운 메모리로 복사하는 방식
> 

### 방법 1: `structuredClone` (최신 브라우저)

```tsx

const deepCopy = structuredClone(original);

```

### 방법 2: JSON 방식 (단, 함수/Date/undefined는 안 됨)

```tsx

const deepCopy = JSON.parse(JSON.stringify(original));

```

---

## 🎯 언제 얕은 복사로 충분한가?

- 배열이나 객체 안에 **원시 타입 (string, number, boolean 등)** 만 있다면 `...` 써도 OK
- ex: `const items = ['🍎', '🍌', '🍇']` → `[...items]`로 문제 없음

---

## 📌 정리 요약

| 항목 | 설명 | 주의사항 |
| --- | --- | --- |
| `{ ...obj }` | 객체 복사 | 안에 중첩된 구조가 있다면 얕은 복사 |
| `[ ...arr ]` | 배열 복사 | 내부 객체는 참조 공유됨 |
| 얕은 복사 | 첫 번째 층만 복사됨 | 원본 데이터가 바뀔 수 있음 |
| 깊은 복사 | 모든 값 완전 복사 | `structuredClone` 추천 |

---

## ✅ 한 줄 요약

> 스프레드 연산자는 배열/객체 복사에 유용하지만 얕은 복사만 수행한다.
> 
> 
> 내부에 객체나 배열이 있다면 **깊은 복사**를 따로 수행해야 안전하다.
>