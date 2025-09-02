# TIL - React Query와 QueryProvider, 그리고 Context API

===

## 1. Context API 기본 개념

- **Context** = 전역으로 공유할 수 있는 "값 박스".
- **Provider** = 박스에 값을 담아 하위 컴포넌트에 공급하는 장치.
- **useContext** = 박스에서 값을 꺼내 쓰는 훅.

즉,

`createContext → Provider로 공급 → useContext로 소비`

이 흐름으로 전역 상태나 설정을 관리한다.

---

## 2. React Query와 Context

- React Query도 내부적으로 Context API를 사용한다.
- `QueryClientProvider`라는 Provider가 이미 구현되어 있고, 우리가 만든 `queryClient`를 공급해준다.
- `useQuery`, `useMutation` 같은 훅은 결국 이 Context에서 `queryClient`를 읽어서 동작한다.
- 그래서 우리가 직접 Context를 만들 필요는 없다.
- 대신 `QueryProvider.tsx`라는 래퍼를 만들어 관리하면 깔끔하다.

---

## 3. QueryProvider의 역할

`QueryProvider`는 단순히 `QueryClientProvider`를 감싼 **전역 주입기**다.

여기서 하는 일은 크게 3가지다.

### (1) Client 초기화

```tsx
const queryClient = new QueryClient();
```

- React Query 엔진(캐시/네트워크 관리)을 앱에서 단 한 번만 만든다.
- 화면마다 새로 만들면 캐시가 리셋되므로 전역 싱글턴으로 관리해야 한다.

### (2) 옵션 설정

```tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 60_000, refetchOnWindowFocus: false },
    mutations: { retry: 0 },
  },
  queryCache: new QueryCache({
    onError: (err, query) => console.warn("Query Error", query.queryKey, err),
  }),
  mutationCache: new MutationCache({
    onError: (err, _vars, _ctx, mutation) =>
      console.warn("Mutation Error", mutation.options.mutationKey, err),
  }),
});
```

- `staleTime`, `retry`, `refetchOnWindowFocus` 등 **기본 정책**을 한 번에 통일.
- 전역 에러 핸들러에서 토스트/로그/로그아웃 같은 공통 처리 가능.

### (3) RN 환경 브릿지 연결

```tsx
onlineManager.setOnline(Boolean(state.isConnected));
focusManager.setFocused(status === "active");
```

- 네트워크 연결(NetInfo), 앱 포커스(AppState)를 React Query에 알려줘서
  → 온라인 복귀/앱 재실행 시 자동으로 재패칭되게 한다.

---

## 4. 사용법

### `shared/providers/QueryProvider.tsx`

```tsx
export function QueryProvider({ children }: { children: ReactNode }) {
  useReactNativeEnvironmentBridges();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
```

### `app/_layout.tsx`

```tsx
<ThemeProvider value={theme}>
  <QueryProvider>
    <Stack>...</Stack>
  </QueryProvider>
</ThemeProvider>
```

이제 앱 내부에서는 단순히:

```tsx
const { data, isLoading } = useQuery({
  queryKey: ["users"],
  queryFn: fetchUsers,
});
```

바로 React Query를 사용할 수 있다.

---

## 5. 요약

- Context API는 전역 상태를 관리하는 기본 원리.
- React Query는 이미 Context API로 `QueryClientProvider`를 제공한다.
- 우리가 만든 `QueryProvider`는 **client 초기화 + 옵션 설정 + RN 환경 브릿지 연결**을 한 번에 처리하는 래퍼.
- 덕분에 루트 레이아웃이 깔끔해지고, 전역 정책이 통일되어 일관된 데이터 관리가 가능하다.

---

배운 점: **"QueryProvider는 새로운 Context를 만든 게 아니라, React Query의 Context Provider를 래핑해 전역 환경을 세팅하는 도우미"**
