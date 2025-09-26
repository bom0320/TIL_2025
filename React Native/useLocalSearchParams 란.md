# useLocalSearchParams 란

- 웹의 useSearchParams (URL 쿼리스트링 읽는 용도)와 비슷한 역할을 React Native + Expo Router 버전으로 구현한 것이다.
- 현재 라우터에 붙어 있는 파라미터(URL 쿼리 또는 동적 세그먼트)를 가져온다.
- React Navigation 의 route.params의 route.params 역할과 거의 동일하지만, App Route 스타일에서 쓰는 방식이라고 생각하면 된다.

```tsx
//app/game/play.tsx
export default function PlayScreen() {
  const { level } = useLocalSearchParams<{ level?: string }>();
  console.log(level);
  // "/game/play?level=easy" 라면 level === "easy"
}
```

- `/game/play?level=easy` → `{ level: "easy" }`
- `/game/play?level=hard` → `{ level: "hard" }`

즉, URL 쿼리스트링이나 동적 라우팅 값이 `useLocalSearchParams`로 들어온다.
