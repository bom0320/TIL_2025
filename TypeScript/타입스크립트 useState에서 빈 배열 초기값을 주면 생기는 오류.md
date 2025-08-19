# 타입스크립트 useState에서 빈 배열 초기값을 주면 생기는 오류

```tsx
const [coins, setCoins] = useState<CoinInterface[]>([]);
```

이렇게 `CoinInterface[]`를 명시해야만, 아래와 같은 에러가 사라진다:

```
Argument of type 'never[]' is not assignable to parameter of type 'CoinInterface | (() => CoinInterface)'.
```

이 에러는 빈 배열 `[]`(타입: `never[]`)을 `useState`의 초기값으로 넣었는데, 그 `useState`가 **배열이 아닌 `CoinInterface` 단일 객체를 기대할 때** 발생한다.

---

## 빈 배열 리터럴 `[]`의 기본 타입은 `never[]`

> **never[]란?**
>
> - `never` = “어떤 값도 될 수 없음”을 뜻하는 **바닥 타입(bottom type)**
> - `never[]` = “원소를 가질 수 없는 배열”
> - 즉, 빈 배열인데 앞으로도 어떤 값도 추가할 수 없는 배열로 본다.

```tsx
const a = []; // a: never[]
a.push(123); // ❌ number는 never에 할당 불가
```

왜 이렇게 되냐면, `[]` 안에 요소가 전혀 없으니 **“어떤 타입의 배열인지” 단서가 전혀 없음**.

그래서 타입스크립트는 안전을 위해 가장 좁은 타입(`never[]`)으로 추론한다.

---

## 맥락적 타이핑(컨텍스트)이 있으면 `[]`는 “그 타입의 빈 배열”로 해석된다

`[]`는 혼자 있으면 `never[]`지만, **맥락(context)** 이 주어지면 그 타입의 빈 배열로 해석된다.

```tsx
const xs: string[] = []; // []가 string[]의 빈 배열로 해석됨
const [coins, setCoins] = useState<CoinInterface[]>([]);
// []가 CoinInterface[]의 빈 배열로 해석됨
```

- 여기서 제네릭 `S`를 `CoinInterface[]`로 명시했기 때문에,
- 초기값 `[]`도 “S에 맞는 값”, 즉 `CoinInterface[]`로 통과한다.

---

## 반대로 실패하는 경우

```tsx
const [coin, setCoin] = useState<CoinInterface>([]);
// S = CoinInterface (객체 하나)
// [] = never[] (배열)
// ❌ 객체 자리(S)에 배열을 넣었으니 타입 불일치 에러
```

- `useState<CoinInterface>(...)`라고 하면, 상태가 `CoinInterface` 객체 하나여야 한다고 선언한 것.
- 하지만 실제 초기값은 배열(`never[]`).
- 타입이 맞지 않기 때문에 에러 발생.

---

## 왜 이런 일이 생기는가?

- `useState<S>(initialState)`에서 `S`는 **상태 그 자체의 타입**을 의미한다.
- 즉, `S`는 “상태가 어떤 모양이어야 하는지”를 TypeScript에게 알려주는 약속이다.
- 따라서 `initialState`는 반드시 그 약속에 맞는 값이어야 한다.
- `useState<CoinInterface>(…)` → “상태는 `CoinInterface` 객체 하나”
- `useState<CoinInterface[]>(…)` → “상태는 `CoinInterface` 객체들의 배열”

이 차이를 제대로 잡아야 한다.

---

## 정리

- `useState<CoinInterface>([])`
  → 상태가 객체 하나여야 한다고 해놓고 배열을 넣은 꼴 → 타입 불일치 에러 발생
- `useState<CoinInterface[]>([])`
  → 상태가 배열이라고 명시했기 때문에 `[]`가 해당 타입의 빈 배열로 해석 → 정상 작동

  - 배열을 관리하려면 `CoinInterface[]`,
  - 객체 하나만 관리하려면 `CoinInterface | null`\*\*을 사용하면 된다.
