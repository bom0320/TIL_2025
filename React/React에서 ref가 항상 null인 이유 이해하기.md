# React에서 ref가 항상 null인 이유 이해하기

React개발을 하면서 자주 마주치는 "ref가 항상 null이에요" 라는 문제에 대해서 자세히 알아보도록 하자.

## 들어가며

React에서 DOM에 직접 접근해야 할 때 `useRef` 를 사용하는데, 가끔 ref 값이 `null` 로 나와서 당황스러울 때가 있다.

```ts
function MyComponent() {
  const divRef = useRef<HTMLDivElement>(null);

  // 이렇게 하면 항상 null
  console.log(divRef.current?.offsetHeight);

  return <div ref={divRef}>내용</div>;
}
```

이런 상황이 발생하는 이유와 해결 방법에 대해 자세히 알아보도록 하자

## React의 렌더링 생명주기 이해하기

React 컴포넌트가 화면에 그려지는 과정은 크게 세 단계로 나눌 수 있다.

1. Render Phase (렌더 단계)
2. Commit Phase (커밋 단계)
3. Effect Phase (이펙트 단계)

각 단계를 코드로 살펴보도록 하자

```ts
interface Props {
    title: string;
}

function ExampleComponent({title} : Props) {
    conse elementRef = useRef<HTMLDivElement>(null);

    // 1. Render Phase
    console.log("렌더 단계: ", elementRef.current); // null

    // 2. Commit Phase
    // React가 Virtual DOM을 실제 DOM으로 변환

    // 3. Effect Phase
    useEffect(() => {
        console.log("이펙트 단계: ", elementRef.current); // 실제 DOM 요소
    },[]);

    return (
        <div ref={elementRef}>
            <h1>{title}</h1>
        </div>
    )
}
```

## 왜 ref는 처음에 null일까?

이유는 간단하다. **컴포넌트 함수가 실행되는 시점에는 아직 설계 DOM이 생성되지 않았기 때문**이다.

좀 더 자세히 살펴보도록 하자.

```ts
function DetailedExample() {
  // 1. ref 객체 생성
  const buttonRef = useRef<HTMLButtonElement>(null);

  // 2. 컴포넌트 함수 실행
  console.log(buttonRef.current); // null

  // 3. JSX 반환
  return <button ref={buttonRef}>Click!</button>;

  // 4. React가 Virtual DOM을 실제 DOM 으로 변환
  // 5. ref.current에 실제 DOM 요소가 할당됨
}
```

## 올바른 ref 사용법

그렇다면 ref를 어떻게 사용해야 할까? 크게 세 가지 방법이 있다.

### 1. useEffect 사용하기

```ts
function CorrectExample() {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // DOM이 생성된 후에 실행됨
    if (imageRef.current) {
      const width = imageRef.current.offsetWidth;
      console.log("이미지 너비: ", width);
    }
  }, []);

  return <img ref={imageRef} src="example.jpg" alt="예시" />;
}
```

### 2. 이벤트 핸들러에서 사용하기

```ts
function ButtonExample() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    // 이벤트 발생 시에는 DOM이 이미 존재함
    if (buttonRef.current) {
      buttonRef.current.disabled = true;
    }
  };

  return (
    <button ref={buttonRef} onClick={handleClick}>
      클릭하세요
    </button>
  );
}
```

### 3. useLayoutEffect 사용하기

DOM 측정이 필요하고, 화면 깜빡임을 방지하고 싶을 때 사용한다.

```ts
function LayoutExample() {
  const divRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // DOM이 생성된 직후, 브라우저가 화면을 그리기 전에 실행
    if (divRef.current) {
      const height = divRef.current.getBoundingClientRect().height;
      // 높이에 따른 추가 처리...
    }
  }, []);

  return <div ref={divRef}>내용</div>;
}
```

## TS에서 ref 타입 지정하기

TS를 사용할 때는 ref의 타입을 명확히 지정해주는 것이 좋다.

```ts
// 기본적인 ref 타입 지정
const divRef = useRef<HTMLDivElement>(null);
const buttonRef = useRef<HTMLButtonElement>(null);
const inputRef = useRef<HTMLInputElement>(null);

// 커스텀 컴포넌트의 경우
interface CustomComponentRef {
  focus(): void;
  reset(): void;
}

const componentRef = useRef<CustomComponentRef>(null);
```

## 마무리

이제 ref가 처음에 null 인 이유를 알게 되었다. 이는 React의 렌더링 생명주기와 깊은 관련이 있으며, Virtual DOM을 사용하는 React의 핵심 동작 원리 중 하나이다.

ref를 사용할 때는:

1. useEffect나 이벤트 핸들러 내에서 사용하기
2. null 체크 확실히 하기
3. 필요한 경우 useLayoutEffect 사용하기

이 세가지만 기억하면 된다.
