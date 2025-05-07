컴포넌트 Props의 타입 지정과 기본값 설정
===

### 📌 1. Props 타입 지정 방법

컴포넌트에 전달되는 props의 타입은 `interface`를 사용해 지정한다.

```tsx

interface TextProps {
  text: string;
  active?: boolean; // optional (선택적 props)
}

```

- `text` → **필수 props**
- `active?` → **선택적 props**

---

### 📌 2. 선택적 props vs 필수적 props

- `:`만 쓰면 필수
- `?:`를 쓰면 선택적

```tsx

interface ExampleProps {
  requiredProp: string;       // 필수
  optionalProp?: number;      // 선택
}

```

---

### 📌 3. props에 기본값 설정

기본값은 **함수 파라미터에 직접 설정**한다:

```tsx

function Dummy({ text, active = false }: TextProps) {
  return <h1>{text}</h1>;
}

```

이렇게 하면 `active`를 전달하지 않아도 자동으로 `false`가 된다.

---

### 📌 4. Boolean props는 `true`일 때 생략된 형태로 작성 가능

```tsx

<Dummy text="hello" active />

```

- 위 코드는 `active={true}`와 완전히 동일하다.
- 이는 boolean 타입 props의 특징으로, `true`일 경우 속성 이름만 작성해도 된다.

---

### ✅ 실습 예시 요약

```tsx

interface TextProps {
  text: string;
  active?: boolean;
}

function Dummy({ text, active = false }: TextProps) {
  return <h1>{text}</h1>;
}

// 사용 예시
<Dummy text="hello" active />           // ✅ active는 true
<Dummy text="world" />                 // ✅ active는 false (기본값)

```

---

### 💡 마무리 요약

| 목적 | 문법 | 설명 |
| --- | --- | --- |
| props 타입 지정 | `interface` | 컴포넌트에 전달되는 값의 타입 명시 |
| 선택적 props | `propName?: Type` | 전달하지 않아도 되는 props |
| 기본값 설정 | `= defaultValue` | 함수 파라미터에서 기본값 설정 |
| Boolean props true 표현 | `<Component prop />` | `prop={true}`와 동일 |

---

필요한 경우 `defaultProps` 방식도 있지만, 함수형 컴포넌트에선 **파라미터 기본값 방식**을 더 권장한다고 한다.