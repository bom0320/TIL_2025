# React Hook 이란

## React Hook의 등장 배경

리액트의 컴포넌트는 **함수형 컴포넌트(Functional Component)**와 **클래스형 컴포넌트(Class Component)** 로 나뉜다.

> 리액트 초기에는 일반적으로 함수형 컴포넌트(Functional Component)를 사용하였으나, **값의 상태를 관리(state) 혹은 Life Cycle Method(생명 주기 = 컴포넌트가 생성되고 사라지는 과정이 존재 할 때)를 사용하여야 할 때에만 클래스형 컴포넌트(class Component)를 사용** 하였다.

### 클래스형 컴포넌트의 한계

초기 React에서는 state나 **라이프사이클 메서드(componentDidMount 등)** 를 사용하려면 **클래스형 컴포넌트**를 써야 했다.

```js
class Counter extends React.Component {
  state = { count: 0 };

  componentDidMount() {
    console.log("마운트됨");
  }

  return() {
    return (
      <button onClick={() => this.setState({ count: this.state.count + 1 })}>
        {this.state.count}
      </button>
    );
  }
}
```

하지만 이런 구조는

- 코드가 길고 가독성이 떨어진다.
- 또한 로직 재사용이 어렵고,
- 함수형보다 최적화가 어렵다는 단점이 있었다.

## 함수형 컴포넌트의 장점 + 한계

함수형 컴포넌트는 **간결하고 가볍지만** 원래는 state나 lifecycle 기능을 사용할 수 없었다.

```js
function Counter() {
  let count = 0; // 그냥 변수 -> 상태로 관리 안 됨
  return <button>{count}</button>;
}
```

그래서 React 팀은 "함수형 컴포넌트 안에서도 상태나 생명주기를 쓸 수 있게 하자"라는 목표로 Hook을 도입했다.

- 즉, Hook = 클래스형의 기능을 함수형에서도 쓸 수 있게 해주는 연결고리

## React Hook이란?

> "Hook"은 React의 핵심 기능(State, Lifecycle 등)에 "연결(hook info)" 할 수 있는 함수이다.
> 대표적인 예로는 useState, useEffect 등이 존재한다.

함수형 컴포넌트에서도

- 상태 관리(useState)
- 렌더링 이후 동작(useEffect)
- 복잡한 상태 로직(useReducer)
  같은걸쓸 수 있게 만든 것이다.

즉, **함수형 + 클래스형의 장점을 합친** 개념이다.

## Hook의 규칙 (반드시 지켜야 하는 이유)

1. 최상위에서만 호출해야함

```
if (true) useState(); // 조건문 안에 넣으면 안됨
```

React는 Hook이 항상 같은 순서로 호출될 것을 기대한다. Hook 내부적으론 "1번째 useState 는 count", 2번째 useEffect는 log... " 이런식으로 순서 기반 배열로 관리하기 때문이다.

- 즉 호출 순서가 바뀌면 React가 상태를 잘못 연결한다.

2. React 함수(컴포넌트 or 커스텀 Hook) 안에서만 사용 가능

- 일반 함수나 이벤트 핸들러 밖에서는 x
- `function useMyHook() {...}` 처럼 직접 만든 커스텀 Hook에서는 사용 가능

| Hook                      | 역할                    | 클래스형 대응                                     |
| ------------------------- | ----------------------- | ------------------------------------------------- |
| `useState`                | 상태 관리               | `this.state`, `setState`                          |
| `useEffect`               | 사이드 이펙트, 생명주기 | `componentDidMount` / `DidUpdate` / `WillUnmount` |
| `useReducer`              | 복잡한 상태 로직        | `setState` + reducer 패턴                         |
| `useRef`                  | DOM 접근 / 값 기억      | `createRef`                                       |
| `useContext`              | 전역 상태 공유          | `Context API`                                     |
| `useMemo` / `useCallback` | 렌더링 최적화           | `shouldComponentUpdate`                           |

## 결론

React Hook은 단순히 "새로운 문법"이 아니라,

> React의 "함수형 철학"을 유지하면서도 상태, 생명주기, 최적화를 유연하게 다루게 해주는 핵심 매커니즘이다.

즉,

- 함수의 간결함 + 클래스혀으이 가능성
- 로직 재사용 (커스텀 Hook)
- 렌더링 최적화 (useMemo, useCallback)
- 이 세가지를 가능하게 해주는 React의 가장 중요한 기술 중 하나이다.
