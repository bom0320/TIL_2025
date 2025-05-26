Context API란?
===

React 앱에서는 보통 부모 -> 자식 -> 손자 -> ... 식으로 데이터를 `props` 를 통해 전달하게 된다. 

하지만 이 방법은 너무 깊은 컴포넌트 계층이 있을 경우 중간 컴포넌트들이 데이터 전달만 하는 역할이 되어서 코드가 지저분해지고 관리가 힘들어진다. 그리고 이걸 **Prop Drilling(프롭 드릴링)** 이라고 한다.

> 💡 Context API는 그런 중간 다리 없이도 데이터를 필요한 곳에 바로 전달해주는 도구!

### 예시로 쉽게 이해해보기

**🍱 비유: 도시락 전달**

1. `App`이라는 부모가 있고, 그 안에 `Sub1 → Sub2 → Sub3` 자식이 줄줄이 있어요.
2. `App`은 `도시락(데이터)`을 `Sub3`에게 주고 싶어요.
3. `props`로 한다면 `Sub1`, `Sub2`에게 "도시락 좀 들고 있어봐" 하고 전달해야 하죠. 😵

> 💥 이게 바로 Prop Drilling
> 
1. **Context API를 쓰면?**
    - 그냥 "공중에 띄워놓고" → `Sub3`가 바로 "필요하면 꺼내서" 먹을 수 있어요! 😎

---

## 🔧 Context API 사용 순서 요약

1. `createContext()`로 **데이터 창고 만들기**
2. `<Provider>`로 **창고에 데이터 보관**
3. `useContext()`로 **꺼내서 사용**

## 코드로 다시 보기

```js
// 1. 데이터 창고 만들기

const ThemeContext = createContext({ border: '10px solid red' });

// 2. 최상위 컴포넌트에서 Provider 로 감싸기

export default function App() {
    return (
        <ThemeContext.provider value={{ border: '1opx solid blue' }}>
            <Sub1 />
        </ThemeContext.provider>
    )
}
```

```js
// 3. 하위 컴포넌트에서 데이터 꺼내쓰기
function Sub1() {
  const theme = useContext(ThemeContext); // 창고에서 border 값 꺼내옴
  return (
    <div style={theme}>
      <h1>Sub1</h1>
      <Sub2 />
    </div>
  );
}
```

## ❗ 예제 코드에서 중요한 포인트

이 코드는 각 단계에서 다른 색의 border를 주고 있어요.

- `App`에서는 `파란색`
- `Sub1`에서는 `초록색`
- `Sub2`, `Sub3`는 `Sub1` 안에 있어서 `초록색`을 따라감

> 💡 즉, 가장 가까운 Provider의 value를 따라간다는 게 핵심이에요!
> 

---

## ✅ Context API는 이런 상황에 좋아요

- **로그인한 사용자 정보 공유**
- **다크모드 / 라이트모드 테마 설정**
- **앱 전체에 영향을 주는 언어 설정**

하지만 **상태를 자주 바꾸는 데이터**에는 적합하지 않아요.

왜냐면 Provider에서 값을 바꾸면 **그 하위 모든 컴포넌트가 리렌더링**되기 때문이에요.

그래서 상태 관리가 복잡해지면 `Redux`, `Zustand`, `Recoil` 같은 라이브러리를 사용해요.

---

## 정리 ✍️

| 개념 | 설명 |
| --- | --- |
| Context API | props 없이 컴포넌트 간 데이터를 전달 |
| Prop Drilling | 데이터를 중간 컴포넌트 거쳐서 전달해야 하는 불편함 |
| Provider | 데이터를 공급하는 컴포넌트 |
| useContext() | 데이터를 꺼내쓰는 Hook |
| 사용 용도 | 테마, 로그인 정보, 언어 설정 등 자주 바뀌지 않는 값 공유 |