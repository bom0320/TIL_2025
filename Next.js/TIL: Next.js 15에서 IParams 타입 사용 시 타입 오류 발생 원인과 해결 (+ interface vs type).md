# 📘 TIL: Next.js 15에서 IParams 타입 사용 시 타입 오류 발생 원인과 해결 (+ interface vs type, Promise 처리)

### 🔍 문제 상황

Next.js 15에서 강의 코드를 그대로 따라 작성했지만, 아래와 같은 타입 오류가 발생함:

```tsx
interface IParams {
  params: { id: string };
}

export async function generateMetadata({ params: { id } }: IParams) { ... }

export default async function MovieDetailPage({ params: { id } }: IParams) { ... }
```

```bash
Type 'IParams' does not satisfy the constraint 'PageProps'.
Types of property 'params' are incompatible.
  Type '{ id: string; }' is missing the following properties from type 'Promise<any>': then, catch, finally, [Symbol.toStringTag]
```

### 🧠 원인 분석

### 📌 1. interface vs type의 차이

- `interface`는 확장성과 병합에 유리하지만, 구조분해와 함께 사용할 때 타입 추론이 불안정하게 작동할 수 있음
- `type`은 고정된 구조를 정의하기 때문에 구조분해와 함께 사용할 때 더 정확한 타입 추론이 가능
- 그래서 `type`으로 바꾸면 문제가 해결되는 경우가 실제로 있었음

```tsx

type IParams = {
  params: {
    id: string;
  };
};

```

---

### ⚠️ 하지만 실제 원인은 따로 있었다

> 이후 확인한 바에 따르면, 이 오류는 단순히 interface 때문이 아니라
> 
> 
> **Next.js 15.1 이후 버전에서 `params`가 Promise로 처리되도록 변경된 구조** 때문이었음.
> 

### 📌 2. Next.js 15.1+ 버전의 변화: `params`는 이제 Promise

- `params`와 `searchParams`가 내부적으로 **비동기 처리 기반 (Promise 형태)** 으로 작동
- 우리가 동기적으로 `params: { id: string }` 라고 선언하면 타입 충돌 발생
- 따라서 타입을 `Promise<{ id: string }>`로 선언하고 내부에서 `await` 해야 함

---

### ✅ 해결 방법 요약

| 변경 전 | 변경 후 |
| --- | --- |
| `params: { id: string }` | `params: Promise<{ id: string }>` |
| 구조분해 바로 사용 | `const { id } = await params` |

### 🔧 수정된 코드 예시

```tsx

type PageParams = Promise<{ id: string }>;

export async function generateMetadata({ params }: { params: PageParams }) {
  const { id } = await params;
  const movie = await getMovie(id);
  return { title: movie.title };
}

export default async function MovieDetailPage({ params }: { params: PageParams }) {
  const { id } = await params;
  return (
    <div>
      <Suspense fallback={<h1>Loading movie info</h1>}>
        <MovieInfo id={id} />
      </Suspense>
      <Suspense fallback={<h1>Loading movie videos</h1>}>
        <MovieVideos id={id} />
      </Suspense>
    </div>
  );
}

```

---

### ✨ 배운 점

- 구조가 같아도 `interface`보다 `type`이 구조분해 상황에서 더 안정적일 수 있다.
- 그러나 이번 오류의 진짜 원인은 **Next.js 15.1부터 `params`가 Promise로 처리되도록 바뀐 것**이었다.
- 앞으로는 `page.tsx`, `generateMetadata` 등에서 props로 `params`를 받을 때 **Next.js가 Promise를 기대하는지 확인하고 `await` 처리하는 습관이 필요**하다.
- 강의 코드를 따라할 때는 **현재 내 Next.js 버전과 공식 문서의 API 규칙이 일치하는지 꼭 확인**하자.

---

### 🔗 참고 자료

- Next.js 공식 릴리즈 노트 (15.1)
- [관련 GitHub 이슈 예시](https://github.com/vercel/next.js/issues)