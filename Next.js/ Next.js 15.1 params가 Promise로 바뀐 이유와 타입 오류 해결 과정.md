 Next.js 15.1 params가 Promise로 바뀐 이유와 타입 오류 해결 과정
===


## ✅ 함수 매개변수에서 구조분해 할당과 타입 지정 이해하기

처음에 작성한 코드:

```tsx
export default function Page({ params: { id } }: { params: { id: string } }) {
  // ...
}
```

이 구조가 처음 보면 헷갈릴 수 있다.

“`params`는 `id`로 받는다?”

“`string`으로 받으라는 건 무슨 의미지?”

이런 의문이 들 수 있는데, 사실 이건 **함수 매개변수에서 구조분해 할당과 타입 선언을 한꺼번에 적용한 예**이다.

자, 그럼 이 구조를 **하나씩 뜯어서** 이해해보자:

## ✅ 이 부분 하나씩 해석해보기

### 1. `({ params: { id } })`

이건 자바스크립트 문법에서의 **구조분해 할당 (Destructuring Assignment)** 이다.

```tsx

const props = { params: { id: "123" } };
const {
  params: { id },
} = props;

```

이걸 함수 매개변수에서 바로 쓰면 아래처럼 간결하게 표현할 수 있다:

```tsx

function Page({ params: { id } }) {
  // id 바로 사용 가능
}

```

즉, `props` 객체 안에 있는 `params` 속성 안에서 다시 `id`만 꺼내서 직접 변수처럼 쓰겠다는 의미다.

---

### 2. `: { params: { id: string } }`

이건 **TypeScript 문법**으로,

구조분해된 값의 **정확한 타입 구조를 설명하는 역할**을 한다.

- `params`는 객체여야 하고,
- 그 안에 `id`라는 속성이 있어야 하며,
- `id`는 문자열(`string`)이어야 한다

즉, 이 함수가 받는 props의 타입은 아래처럼 생겼다는 뜻이다:

```tsx

{
  params: {
    id: string;
  };
}

```

이걸 한 줄로 정리하면 아래와 같다:

```tsx

function Page({ params: { id } }: { params: { id: string } }) {
  // ...
}

```

---

이렇게 작성하면 구조도 깔끔하고, 변수 선언 없이 바로 `id`를 사용할 수 있어서 코드가 간결해진다.

하지만 **Next.js 15.1부터는 이 방식이 문제가 된다.**

그 이유는 `params`가 이제 **동기 객체가 아닌 비동기 객체(Promise)** 로 처리되기 때문이다.

이 내용은 아래에서 더 자세히 설명한다. ⬇️

---

## 🔍 동기 객체 vs 비동기 객체(Promise) 차이

### ✅ 동기 객체

- 값을 **즉시 사용할 수 있음**
- 예시:

```tsx

const params = { id: "123" };
console.log(params.id); // 바로 사용 가능

```

---

### ✅ 비동기 객체 (Promise)

- 값을 **즉시 사용할 수 없음**
- `await` 또는 `.then()`을 사용해야 함
- 예시:

```tsx

const params = Promise.resolve({ id: "123" });

const { id } = await params; // 기다려야 꺼낼 수 있음

```

---

## 🍿 그럼 Next.js에서는 어떤 일이 생긴 걸까?

### 🔸 Next.js 15.0까지는

- `params`를 `{ id: string }`처럼 **즉시 접근 가능한 동기 객체**로 제공했기 때문에,
- 아래와 같은 구조분해가 문제 없이 작동했다:

```tsx

export default function Page({ params: { id } }: { params: { id: string } }) {
  // 바로 사용 가능
}

```

---

### 🔥 그런데 Next.js 15.1부터는?

- Next.js 내부적으로 `params`를 **비동기(Promise)** 객체처럼 다루기 시작했다.
- 즉, 프레임워크가 라우트 파라미터를 가져오는 과정을 **await 처리해야 할 만큼 복잡한 흐름**으로 간주한다.
- 그래서 우리가 받는 `params`는 이제 다음과 같은 형태가 된다:

```tsx

Promise<{ id: "123" }>

```

---

## 💥 이게 왜 문제가 되냐면?

예전처럼 아래처럼 작성하면:

```tsx

export default function Page({ params: { id } }: { params: { id: string } }) {
  // ...
}

```

- TypeScript는 `params`가 그냥 `{ id: string }`인 동기 객체일 거라고 생각함
- 하지만 Next.js는 `params`를 **Promise로 처리하므로** 타입이 충돌하고, 아래와 같은 에러가 발생함:

```tsx

Type '{ id: string; }' is missing the following properties from type 'Promise<any>': then, catch, finally, ...

```

---

## ✅ 해결 방법은?

1. 먼저 `params`의 타입을 **Promise<{ id: string }>** 형태로 선언하고
2. 함수 내부에서 `await`으로 값을 꺼내야 한다

```tsx

type PageParams = Promise<{ id: string }>;

export default async function Page({ params }: { params: PageParams }) {
  const { id } = await params; // 이제 정확히 작동!
}

```

---

## ✨ 정리하면

| 항목 | 예전 방식 (동기) | 최신 방식 (비동기) |
| --- | --- | --- |
| 구조 | `{ id: string }` | `Promise<{ id: string }>` |
| 사용 방식 | `params.id` 바로 사용 가능 | `const { id } = await params` 필요 |
| Next.js 버전 | 15.0 이하 | 15.1 이상 |

---

### 🤔 왜 이렇게 바뀌었을까?

- Next.js가 내부에서 **Dynamic segments, layout, middleware 등 여러 흐름**을 조합하며 데이터를 처리함
- 이 흐름이 비동기이기 때문에, `params`도 **비동기로 await 처리**하는 방향으로 바뀐 것