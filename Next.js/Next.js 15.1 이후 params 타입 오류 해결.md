Next.js 15.1 이후 params 타입 오류 해결
===

### ❗ 문제 상황

Next.js 15.2.4에서 `npm run build` 실행 시 다음과 같은 **타입 오류(Type error)** 발생:

```bash
src/app/book/[id]/page.tsx
Type error: Type '{ params: { id: string | string[]; }; }' does not satisfy the constraint 'PageProps'.
  Types of property 'params' are incompatible.
    Type '{ id: string | string[]; }' is missing the following properties from type 'Promise<any>': then, catch, finally, [Symbol.toStringTag]
```

### 📎 문제 원인

Next.js 15.1 버전부터 `App Router`에서 `params`와 `searchParams`가 **비동기(Promise 기반)** 로 처리되도록 변경되었다.

이로 인해 기존처럼 `params: { id: string }`와 같이 **동기적인 타입으로 선언할 경우**, Next.js 내부에서 `params`를 Promise로 처리하려고 하면서 **타입 불일치 에러가 발생**한다.

즉, `params`가 `{ id: string }`일 것이라 가정하고 코드를 작성하면, 실제로는 `Promise<{ id: string }>`이 들어오므로 타입 충돌이 발생하게 된다.

---

### 🧩 문제 요약

빌드 시 발생한 오류는 Next.js 내부적으로 `params`를 비동기로 처리하는 방식으로 바뀌었음에도, 코드에서는 여전히 동기 타입으로 선언했기 때문에 발생했다.

이는 Next.js 15.1 이후의 중요한 구조 변경 사항 중 하나다.

### **✅ 해결 방법**

`params`의 타입을 `Promise`로 감싸 비동기 처리로 변경해야 한다.

아래와 같은 방식으로 코드를 수정하면 됨

- `params`의타입을 `Promise<{ id: string }>`로 감싸고, 내부에서 `await` 로 비동기적으로 처리

```tsx
import ClientComponent from "@/app/components/ClientComponent";

// 변환된 타입 정의
type PageParams = Promise<{ id: string }>;

const Page = async ({ params }: { params: PageParams }) => {
  const { id } = await params; // 비동기로 변환

  return (
    <div>
      Page {id}
      <ClientComponent>
        <></>
      </ClientComponent>
    </div>
  );
};

export default Page;
```

이 방법은 Next.js 15.1 이후 업데이트로 변경된 `params`의 비동기 처리 규칙에 따라 타입 오류를 해결한다.

### 🔗 참고 자료

- 📄 [Next.js 공식 문서 - 버전 15 업그레이드 가이드](https://nextjs.org/docs/app/building-your-application/upgrading/version-15#params--searchparams)
- 💬 [Inflearn 질문 게시글 - 비슷한 사례 참고](https://www.inflearn.com/questions/1413123)

---

---

### 🧠 배운 점

- Next.js의 App Router 구조가 업데이트되면 **타입 처리 방식도 함께 바뀔 수 있다.**
- 공식 문서 및 변경 로그(Changelog)를 자주 확인하며 사용하는 버전의 기준에 맞춰 코드를 작성해야 한다.
- 타입 오류가 발생했을 때는, **단순한 타입 실수가 아닌 프레임워크의 구조 변경 가능성도 고려**해야 한다.