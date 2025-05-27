TypeScript 인터페이스 안에 함수 정의하기
===
TypeScript의 `interface` 는 단순히 속성(property)의 타입만 정의하는 것이 아니라, **함수의 타입도 정의** 할 수 있다.
이는 React에서 props로 콜백 함수를 넘겨줄 때 특히 자주 사용된다.

### 기본 예시: 인터페이스 안에 함수 포함하기

```ts
interface UserProps {
    name: string;
    age: number;
    sayHi: () => void;
}

const user: UserProps = {
    name: '김봄';
    age: 18,
    sayHi: () => {
        console.log('Hi Bom!');
    },
};
```
- `sayHi`는 인자 없이 `void`를 반환하는 함수로 타입이 정의되어 있음

---

### 매개변수와 반환값이 있는 함수 정의

```ts
interface MathProps {
    add: (a: number, b:number) => number;
}

const math: MathProps = {
    add: (a,b) => a + b;
}
```
- `add` 함수는 두 개의 숫자를 받아 숫자를 반환하는 구조

## React 에서 props로 함수 넘길 때

```ts
interface Post {
    title: string;
    content: string;
}

interface Props {
    onAddPost: (post: Post) => void;
}
```
- `onAddPost` 는 `Post` 객체를 받아 아무것도 반환하지 않는 함수여야 한다.

- 컴포넌트에 적용 예:
```tsx
function PostForm({ onAddPost }: Props) {
  const handleSubmit = () => {
    const newPost = { title: '제목', content: '내용' };
    onAddPost(newPost); // App 컴포넌트의 addPost 실행됨
  };

  return <button onClick={handleSubmit}>작성</button>;
}

```

### 🧠 정리

| 문법 요소 | 설명 |
| --- | --- |
| `() => void` | 인자 없이 아무것도 반환하지 않는 함수 |
| `(a: number, b: number) => number` | 두 개의 숫자를 받아 숫자를 반환하는 함수 |
| `interface` | 객체, props 등의 구조(속성과 함수 포함)를 정의하는 데 사용 |
| `React props 함수 타입` | 자식 컴포넌트에서 상위 컴포넌트의 상태를 변경할 수 있게 함수를 넘길 때 사용 |

---

### 🔁 자주 나오는 패턴

```ts
interface Props {
    onClick: () => void;
    onChange: (value: string) => void;
    onSubmit: (data: FormData) => boolean;
}
```
+ React에서 자식 -> 부모로 데이터를 전달하고 싶을 때, props로 함수를 넘기면 된다.
