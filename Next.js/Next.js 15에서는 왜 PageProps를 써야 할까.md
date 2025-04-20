Next.js 15에서는 왜 PageProps를 써야 할까
===

## `PageProps`란?

### 👉 정의:

**`PageProps`는 Next.js 14~15에서 페이지 컴포넌트나 함수(`generateMetadata`, `generateStaticParams` 등)에 자동으로 전달되는 `params`, `searchParams`의 타입을 명시하는 타입이다.**

Next.js는 URL에서 추출한 정보를 페이지에 전달해주는데, 그 구조를 타입스크립트에게 알려주는 공식적인 타입이 `PageProps<T>`

---

## 🧩 어떻게 생긴 타입이야?

```tsx

type PageProps<T> = {
  params: T;
};

```

### 예시:

```tsx

import { type PageProps } from "next";

export default function Page({ params }: PageProps<{ id: string }>) {
  return <h1>Movie {params.id}</h1>;
}

```

---

## 🔙 예전 코드 방식 (Next.js 13~14 초반)

```tsx

interface IParams {
  params: { id: string };
}

export default function Page({ params: { id } }: IParams) {
  return <h1>Movie {id}</h1>;
}

```

- 직접 타입을 만들고 구조분해까지 한 번에 처리했음
- 당시에는 `PageProps` 같은 공식 타입이 요구되지 않았기 때문에 자유롭게 작성 가능했음
- 간단하고 직관적이라 따라 하기 편했음

---

## ❌ 그런데 문제는?

Next.js 15부터는 타입스크립트 지원을 더 강화하면서:

- **페이지 함수, 메타데이터 함수 등은 내부적으로 `PageProps` 타입을 기대**하게 됐음
- `IParams`처럼 별도로 만든 타입은 Next.js가 기대하는 구조와 **100% 일치하지 않으면 에러** 발생

```tsx

Type 'IParams' does not satisfy the constraint 'PageProps'

```

→ 이건 Next.js가 "내가 원하는 props 타입은 그거 아니야!"라고 하는 것!

---

## 그래서 개선된 방식: `PageProps`

```tsx

import { type PageProps } from "next";

export async function generateMetadata({ params }: PageProps<{ id: string }>) {
  const movie = await getMovie(params.id);
  return { title: movie.title };
}

export default async function Page({ params }: PageProps<{ id: string }>) {
  return <h1>Movie {params.id}</h1>;
}

```

### 장점:

| 구버전 (`IParams`) | 신버전 (`PageProps`) |
| --- | --- |
| 직접 타입을 만들어야 함 | Next.js에서 제공함 (직관적) |
| 버전 바뀌면 타입 충돌 가능성 | Next.js 내부 구조와 일치 → 안정적 |
| 구조분해 편리하지만 위험 | 타입 충돌 없이 명확한 타입 구조 |

---

## ✨ 확실히 알고 가야 할 핵심 포인트

1. **Next.js 15부터는 `PageProps` 사용이 사실상 표준이다.**
2. **`PageProps<T>`는 `params`의 구조를 안전하게 전달하는 공식적인 타입이다.**
3. **옛날 코드(`IParams`)는 타입 충돌이나 컴파일 오류를 낼 수 있다.**
4. **지금은 구조를 조금만 바꿔도, 유지보수성과 안정성이 훨씬 높아진다.**

---

## 📦 덤: 같이 자주 쓰이는 것

| 개념 | 설명 |
| --- | --- |
| `params` | 동적 라우트에서 URL 파라미터 (ex: `/movies/[id]`) |
| `searchParams` | 쿼리 스트링 (ex: `/search?q=hello`) |
| `PageProps<T>` | 위 정보들을 타입스크립트에 명시해주는 공식 타입 |