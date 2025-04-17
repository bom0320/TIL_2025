TIL: Next.js에서 async 함수 처리 차이에 따라 컴포넌트 출력 결과가 달라지는 이유
===

## 문제 상황
API로부터 데이터를 가져오는 `getVideo()` 함수는 잘 작성했는데, 아래 코드에서는 화면에 JSON 데이터가 출력되지 않았음:

```tsx
// ❌ 출력 안 됨
export default function MovieVideos({ id }: { id: string }) {
  const videos = getVideos(id); // await 안 씀
  return <div>{JSON.stringify(videos)}</div>
}
```

## 원인 분석
- `getVideos()` 는 `async function` 으로, **항상 Promise 객체를 반환함**
- 위 코드에서는 `await` 없이 바로 사용했기 때문에,
- `videos`에서는 실제 데이터가 아니라 **Promise 자체**가 들어감
- 따라서 `JSON.stringify(videos)`는 의미 없는 값 또는 `[object Promise]`처럼 출력됨

## 정상 작동하는 코드

```tsx
export default async function MovieVideos({ id }: { id: string }) {
  const videos = await getVideos(id); // ✅ Promise가 끝날 때까지 기다림
  return <div>{JSON.stringify(videos)}</div>
}
```
- 컴포넌트를 `async function`으로 선언하고 `await`을 사용사면, 실제 데이터를 받은 후에 화면에 렌더링할 수 있음

---

## 🧠 팁: 왜 await가 중요할까?
- `async` 함수는 항상 **Promise 객체를 반환**함
- 즉, `getVideos(id)`는 "결과를 나중에 줄께요~" 라는 **"약속(Promise)"**이기 때문에 `await` 없이 바로 사용하면 아직 도착하지 않은 데이터를 처리하려는 꼴이 됨

```tsx
JSON.stringify(Promise) // ❌ 의미 없음
```
- 반드시 `await`을 사용해서 **Promise가 해결(resolved)된 이후의 값을 받아야 실제 데이터를 사용할 수 있음** 

---
### 🔁 핵심 요약

| 항목 | 설명 |
| --- | --- |
| `async function` | 항상 **Promise**를 반환함 |
| `await` | 실제 값을 얻기 위해 Promise가 **끝날 때까지 기다림** |
| `await 없이 Promise를 사용` | 화면에 의미 없는 객체 출력 or 아무것도 안 보임 |
| 해결 방법 | `await` 사용 + 컴포넌트를 `async function`으로 선언 |

---

> 🎯 이 실수는 클라이언트 컴포넌트, 서버 컴포넌트, API 호출 등에서 자주 발생할 수 있음.
> 
> 
> `async/await`의 동작 원리를 정확히 이해하고 있어야 안정적인 비동기 렌더링이 가능하다!
>