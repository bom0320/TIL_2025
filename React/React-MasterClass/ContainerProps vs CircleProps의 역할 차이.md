ContainerProps vs CircleProps의 역할 차이
===

| 름 | 역할 | 누가 이걸 사용하냐? |
| --- | --- | --- |
| `ContainerProps` | `styled.div`에 전달되는 스타일 전용 props. CSS 속성을 위한 **최종 props 타입** | `styled-components`인 `Container`가 사용 |
| `CircleProps` | 컴포넌트가 외부에서 받는 props. 즉, **외부 사용자가 Circle 컴포넌트에 넣는 props의 타입** | `Circle` 함수 컴포넌트가 사용 |

----

### 💡 비유해서 이해해보자
`CircleProps`는 **입구에서 손님이 신청서에 적는 내용**이고,

`ContainerProps`는 내부 **CSS 스타일 시스템에 전달하는 디자인 명세서**이다.

## 🔁 흐름 정리 (데이터가 어떻게 이동하는지)

1. 외부에서 Circle 컴포넌트에 props를 넣어줌:

```tsx
<Circle bgColor="tomato" />
```

2. 그 props는 이 타입에 따라 제한됨:

```tsx
interface CircleProps {
  bgColor: string;
  borderColor?: string; // optional
}
```

3. 이걸 기반으로 Container라는 styled-components에 props를 넘겨줌:

```tsx
<Container bgColor={bgColor} borderColor={borderColor ?? "white"} />
```

4. 이제 styled.div인 Container는 이 타입을 필요로 함:

```tsx
interface ContainerProps {
  bgColor: string;
  borderColor: string; // styled-components는 undefined 싫어함
}
```

## ✨ 왜 둘 다 필요한가?
- `CircleProps`는 외부 개발자가 편하게 쓰도록 optional로 설계 (`borderColor` 생략 가능)
- `ContainerProps` 는 내부 스타일을 위해 `borderColor`은 필수 string으로 강제  (styled-components는 undefined 처리에 민감하니까)


## ✅ 결론

| 질문 | 답 |
| --- | --- |
| 왜 props를 두 개로 나눴지? | 하나는 외부 사용자를 위한 것(`CircleProps`), 다른 하나는 내부 스타일 적용을 위한 것(`ContainerProps`)이니까 |
| 왜 `borderColor`는 한쪽만 optional이지? | 외부 사용자가 안 넣어도 되게 하면서, 내부에서는 무조건 넣도록 강제하려고 |