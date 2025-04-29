PropTypes vs TypeScript interface 정리
===

## 1.PropTypes란?
- **prop이 존재하는지를 확인해주는 역할**을 함
- 하지만 런타임(runtime), 즉 코드가 실행된 후에야 오류를 알 수 있음
- ⇒ 오류를 미리 방지할 수 없음.

## 2. TypeScript interface란?
- props의 타입을 미리 정의해놓는 방법
- 컴파일 타임(코드를 실행하기 전)에 오류를 잡을 수 있음
- 우리가 TS를 쓰는 목적: 코드가 **실행되기 전에** 타입 오류를 잡아서 안전하게 개발하기 위해서!
- ⇒ 따라서 interface를 써서 props 타입을 강제하는 게 목적에 맞음.

---

# 강의 코드 흐름

1. **App.tsx**

```tsx

import styled, { keyframes } from "styled-components";
import Circle from "./Circle";

function App() {
  return (
    <div>
      <Circle bgColor="teal" />
      <Circle bgColor="tomato" />
    </div>
  );
}

export default App;

```

- `App` 컴포넌트가 `Circle` 컴포넌트 두 개를 렌더링하면서 `bgColor` props를 각각 전달함.
1. **Circle.tsx**

```tsx

import styled from "styled-components";

interface ContainerProps {
  bgColor: string;
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 100px;
`;

interface CircleProps {
  bgColor: string;
}

function Circle({ bgColor }: CircleProps) {
  return <Container bgColor={bgColor}></Container>;
}

export default Circle;

```

- `CircleProps`를 정의해서 **Circle 컴포넌트에 들어오는 props 타입을 강제**함.
- `ContainerProps`를 정의해서 **styled-components에도 타입을 지정**함.
- `Container`에 `bgColor`를 넘겨주어 동적으로 배경색을 설정함.

---

# 요점 한 줄 요약

> prop-types는 실행 후 검사, interface는 실행 전 검사 → TS에서는 interface로 props를 타입 체크하는 게 더 안전하고 맞는 방법이다.
>