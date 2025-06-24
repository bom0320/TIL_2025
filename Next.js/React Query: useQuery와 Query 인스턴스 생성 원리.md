React Query: useQuery와 Query 인스턴스 생성 원리
===

오늘은 React Query에서 `useQuery`를 사용할 때 내부적으로 어떤 일이 벌어지는지 정리했다.

처음에는 `QueryClient`, `useQuery`, `useQueryClient`, `Query 인스턴스` 등의 개념이 헷갈렸지만, 내부 구조를 파악하니 훨씬 명확해졌다.

---

## 🔍 `useQuery` 호출 시 내부 동작

```tsx

useQuery(['todos'], fetchTodos);

```

이 한 줄이 실행되면 React Query 내부에서는 다음과 같은 일이 벌어진다:

1. `queryClient.getQueryCache()`를 통해 캐시 저장소(QueryCache)에 접근한다.
2. `queryCache.build()`가 호출되면서 내부적으로 다음과 같은 인스턴스 생성이 일어난다:
    
    ```tsx
    
    new Query({
      queryKey: ['todos'],
      queryFn: fetchTodos,
      ...
    });
    
    ```
    
3. 이로써 만들어진 Query 인스턴스는:
    - `queryHash = JSON.stringify(queryKey)` 값(예: `'["todos"]'`)을 기준으로
    - `QueryCache`의 **Map** 구조 (`queriesMap`)에 저장되고
    - 동시에 `QueryCache`의 **배열** 구조 (`queries`)에도 추가된다
4. 이 전체 과정을 React Query에서는 **“Query를 생성한다”**고 표현한다.

---

## 🧠 핵심 정리

- `QueryClient`: 캐시 저장소 전체를 다루는 객체 (🏢 창고)
- `Query`: 쿼리 하나하나의 인스턴스 (📦 박스)
- `useQuery`: 쿼리를 "등록하고 실행"하는 훅 → 내부적으로 `new Query(...)`가 실행됨
- 사용자는 `useQuery()`만 호출하면 되고, **Query 인스턴스 생성, 캐시 등록 등은 자동 처리됨**

---

## 💡 내부 구조 도식 (예시)

```tsx

queryClient = new QueryClient({
  queryCache: {
    queries: [ QueryA, QueryB, ... ],
    queriesMap: {
      '["todos"]': QueryA,
      '["users"]': QueryB,
    }
  }
});

```

- `queries`: 쿼리 인스턴스들의 배열
- `queriesMap`: queryHash를 key로 사용하는 인스턴스 조회용 Map

---

## ✅ 결론

- `useQuery`를 호출하면 내부적으로 자동으로 `new Query(...)`가 실행되며, 캐시에 등록된다.
- `QueryClient`는 비어 있는 저장소를 만드는 것이고,
- 각각의 쿼리(`['todos']`)는 `useQuery`가 실행될 때 **자동으로 Query 인스턴스를 만들어 저장소에 넣는다.**
- 개발자는 단지 `useQuery`만 사용하면 되고, React Query가 내부 동작을 모두 처리해준다.

---

필요하면 이 TIL에 이어서 `invalidateQueries`, `useQueryClient`, `QueryCache`의 메서드 등도 정리