# refreshMembers vs invalidateQueries: React Query를 제대로 쓰는 법

## 들어가며

React Query를 사용하다 보면, 다음 두 방식 중 어떤 것을 써야 할지 고민이 된다.

```ts
// 1. 직접 다시 데이터를 fetch해서 상태에 넣기
const refreshMembers = async () => {
  const newMembers = await fetchMembers();
  setMembers(newMembers);
};

// 2. React Query에게 캐시를 무효화시키고 refetch를 유도하기
await queryClient.invalidateQueries({ queryKey: ["memberList"] });
```

단순히 보면 둘 다 "데이터를 다시 가져온다"는 공통점을 가지지만, **React Query의 철학과 이점** 을 살리기 위해선 2번 방식이 훨씬 권장된다.

---

## 🧩 1. refreshMembers: 전통적인 방식

이 방식은 흔히 `useState()` 로 상태를 관리하던 시절의 전통적인 접근 방식이다.

```ts
const [members, setMembers] = useState<MemberType[]>([]);

const refreshMembers = async () => {
  const newMembers = await fetchMembers();
  setMembers(newMembers); // 직접 상태 갱신
};
```

### 장점

- 이해하기 쉽고 즉시 겨과를 다룰 수 있다.

### 단점

- 상태가 로컬에만 존재 -> 다른 컴포넌트에서 공유 불가
- 중복 상태 발생 위험 (React Query 캐시와 별도로 존재)
- 리팩터링/추적 어려움: 누가 상태를 관리하는지 추적해야 함
- 캐시를 활용하지 못함 -> 불필요한 네트워크 요청 발생

---

## ⚡ 2. invalidateQueries: React Query 방식

React Query는 데이터를 전역적으로 캐싱한다.
즉, `['memberList']` 라는 쿼리 키로 관리되고 있다면, 이 캐시를 무효화(invalidate)하는 것만으로 자동으로 다시 fetch된다.

```ts
const queryClient = useQueryClient();

await queryClient.invalidateQueries({ queryKey: ["memberList"] });
```

### 장점

- 전역 캐시와 일관성 유지 (어디에서나 같은 데이터)
- 자동으로 `useQuery()`가 실행되므로, 코드 중복이 줄어듦
- loading, error, stale 상태 등 React Query의 상태 관리 기능을 그대로 활용 가능
- 비동기 흐름이 깔끔해지고, 유지보수가 쉬움

### 단점

- 처음엔 약간 개념이 생소할 수 있음

---

## 🎯 React Query의 핵심 철학

> **"데이터는 상태가 아니다. 서버 상태는 쿼리 키를 기준으로 관리한다."**
> React Query 는 상태(state)를 직접 관리하지 않는다.

대신 서버 상태(server state)를 쿼리 키(`queryKey`) 기반으로 캐싱하고, 이를 자동으로 refetch/ invalidate/ update 하는 방식으로 앱을 구상한다.

---

## 예시 비교

| 항목                  | `refreshMembers` (수동) | `invalidateQueries` (React Query) |
| --------------------- | ----------------------- | --------------------------------- |
| 상태 관리             | `useState` 직접         | `useQuery` 자동                   |
| 중복 위험             | O (state vs cache)      | X                                 |
| React Query 캐시 활용 | ❌ 못함                 | ✅ 가능                           |
| 코드 위치 추적        | 어렵다                  | 한 쿼리 키로 통합                 |
| 로딩/에러 처리        | 직접 구현               | React Query가 제공                |
| 유지보수              | 어렵다                  | 쉽다 (통합 관리)                  |

---

### 언제 `invalidateQueries` 를 써야 할까?

- 서버 데이터를 변경(Mutation)한 후,
- 해당 데이터가 사용되는 곳이 `useQuery()`로 fetch 되고 있다면,
- 무조건 `invalidateQueries` 를 써야 한다.

```ts
await changeMemberRole(id, newRole);
await queryClient.invalidateQueries({ queryKey: ["memberList"] });
```

## 결론: React Query 의 힘을 제대로 쓰고 싶다면

> "fetch → setState → 상태 갱신" 대신
> "invalidateQueries → 자동 refetch" 패턴으로 옮겨가라.

이것이 React Query가 의도한 효율적인 데이터 흐름 방식이다.

### 📌 보너스 팁: 캐시 직접 수정도 가능

```ts
queryClient.setQueryData(["memberList"], (old) => {
  return [...old, newMember];
});
```

→ 이런 식으로 캐시를 직접 조작하는 고급 패턴도 가능하지만,
기본적으로는 invalidateQueries()가 가장 안전하고 깔끔한 방법이다.

## 요약 한 줄

React Query를 쓴다면, 데이터를 다시 가져올 땐 refresh + setState 대신 invalidateQueries를 써라.
그래야 캐시, 상태, 컴포넌트가 하나로 연결된다.
