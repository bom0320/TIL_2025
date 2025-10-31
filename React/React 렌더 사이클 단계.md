# React 렌더 사이클 단계

React 컴포넌트는 **"렌더 -> 커밋 -> 업데이트 -> 언마운트"** 흐름으로 동작한다.

## 렌더(render) 단계

- 컴포넌트 함수가 호출되어 JSX 를 반환하는 단계
  - 즉, React가 JSX를 JS 객체(가상 DOM)으로 변환해서 "UI 설계도"를 만든다는 의미
- React가 "이 컴포넌트가 어떻게 보여야 하는가"를 계산한다.
- DOM 에는 아직 아무런 일도 일어나지 않는다.
  - 즉, 아직 **브라우저 화면에는 표시되지 않는다는 것**

#### 이 단계에서 실행되는 Hook

- `useState()` -> 현재 상태값 반환
- `useMemo()`/ `useCallback()` -> 이전 계산 결과 재사용
- `useRef` -> 저장된 참조값 반환

즉, 이 단계에서는 **렌더링에 필요한 데이터 계산**만 한다.

## 커밋(Commit) 단계

- React가 계산한 결과 (JSX -> Virtual DOM diff)를 **실제 브라우저 DOM에 반영**하는 단계이다.
- DOM 업데이트, 스타일 적용, 화면 표시 등이 일어난다.

### 이 단계에서 실행되는 Hook

- `useLayoutEffect()` -> DOM이 갱신된 직후, 화면 그리기 전에 동기 실행
- `useEffect()` -> DOM이 그려진 후에 비동기적으로 실행

차이 정리:

| Hook              | 실행 시점                         | 사용 목적                              |
| ----------------- | --------------------------------- | -------------------------------------- |
| `useLayoutEffect` | DOM 업데이트 직후, **paint 이전** | 레이아웃 측정, 스크롤 위치 계산 등     |
| `useEffect`       | 화면이 실제로 그려진 **이후**     | 데이터 패칭, 콘솔 로그, 이벤트 등록 등 |

## 업데이트(Update) 단계

- 상태(setState)나 props가 바뀌면 **다시 렌더 단계로 돌아가서 반복** 된다.
- React는 변경된 부분만 효율적으로 업데이트(diffing)

#### Hook 관련 동작

- `useEffect` / `useLayoutEffect`는 의존성 배열이 바뀌면 다시 실행
- `useMemo` / `useCallback`은 의존성 배열이 바뀌면 재계산

## 언마운트(Unmount) 단계

- 컴포넌트가 화면에서 사라질 때 실행된다.

#### 이때 실행되는 Hook 동작

- `useEffect`의 cleanup 함수 실행
- 타이머 제거, 이벤트 해제, 구독 종료 등

```jsx
useEffect(() => {
  const timer = setInterval(() => console.log("tick"), 1000);
  return () => clearInterval(timer); // 언마운트 시 실행
}, []);
```

## 요약: 렌더 사이클 순서

| 단계                | 설명                                | 관련 Hook                                      |
| ------------------- | ----------------------------------- | ---------------------------------------------- |
| **1.Render 단계**   | JSX 계산 (아직 화면엔 반영 X)       | `useState`, `useMemo`, `useCallback`, `useRef` |
| **2. Commit 단계**  | DOM 반영 및 화면 표시               | `useLayoutEffect`, `useEffect`                 |
| **3. Update 단계**  | 상태·props 변경 시 다시 렌더 → 커밋 | (위 Hook들이 다시 실행)                        |
| **4. Unmount 단계** | 컴포넌트 제거 시 정리 작업 실행     | `useEffect`의 cleanup                          |

---
