📘 TIL: Next.js 15에서 IParams 타입 사용 시 타입 오류 발생 원인과 해결 (+ interface vs type)
===

### 🔍 문제 상황

Next.js 15에서 강의 코드를 그대로 따라 작성했지만, 아래와 같은 타입 오류가 발생함:

```tsx

interface IParams {
  params: { id: string };
}

export async function generateMetadata({ params: { id } }: IParams) { ... }

export default async function MovieDetailPage({ params: { id } }: IParams) { ... }

```

```tsx

Type 'IParams' does not satisfy the constraint 'PageProps'.

```

---

### 🧠 원인 분석

### 📌 Next.js 15의 타입 변화

- Next.js 15부터 `generateMetadata`, `page.tsx` 등에서 **정해진 구조의 props**를 기대하며,
- 내부적으로 **`PageProps<T>` 같은 형태로 타입 체크**를 수행함.

### 🧩 왜 `interface`는 오류가 나고 `type`은 안 날까?

- `interface`는 **TypeScript에서 확장 가능성과 병합을 염두에 둔 선언 방식**이라
구조분해와 함께 쓰일 때 **타입 추론이 약간 애매하게 동작**할 수 있음.
- 반면 `type`은 **단일 고정 구조를 명확히 선언하는 데 강점이 있음**.
- 특히 구조분해와 함께 사용할 때 `type`이 **더 정확하고 일관된 타입 유추**를 가능하게 해줌.

```tsx

type IParams = {
  params: {
    id: string;
  };
};

```

이처럼 `type`으로 선언한 구조는 Next.js의 타입 시스템이 **기대한 형태 그대로** 받아들이기 때문에 오류가 사라짐.

---

### ✅ 해결 방법 요약

| 변경 전 | 변경 후 |
| --- | --- |
| `interface IParams` | `type IParams = { params: { id: string } }` |
| 구조분해 `{ params: { id } }` 그대로 사용 | 그대로 유지 가능 |

---

### ✅ 정리된 코드

```tsx

type IParams = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params: { id } }: IParams) {
  const movie = await getMovie(id);
  return {
    title: movie.title,
  };
}

export default async function MovieDetailPage({ params: { id } }: IParams) {
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

- **구조가 같아도 `interface`와 `type`의 차이로 인해 타입 오류가 발생할 수 있다.**
- `type`은 구조분해와 함께 쓸 때 더 안정적이고 정확한 타입 유추를 가능하게 한다.
- Next.js 15는 타입 검사 기준이 더 엄격해졌기 때문에 **Next가 기대하는 props 형태에 맞추는 것**이 매우 중요하다.
- 강의 코드를 따라할 때는 **현재 내 Next.js 버전과 문서 기준**을 꼭 함께 확인하자.