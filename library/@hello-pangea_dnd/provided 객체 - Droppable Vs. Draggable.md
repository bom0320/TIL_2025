provided 객체 - Droppable Vs. Draggable
===

## Provided 란?
- @hello-pangea/dnd 라이브러리에서 `Droppable`, `Draggable` 컴포넌트가 드래그 기능을 동작시키기 위해 자식 함수(children)에 넘겨주는 필수 **도구 세트** 객체

##  왜 존재하는가?
React에선 DOM 요소를 직접 조작하지 않기 때문에, 라이브러리가 드래그 기능을 위해 꼭 필요한 값들 (ref, props 등)을 우리가 직접 붙일 수 있도록 제공해주는 방식이 바로 provided

## Droppable의 provided

```ts
<Droppable droppableId="myList">
  {(provided) => (
    <ul
    ref={provided.innerRef}
      {...provided.droppableProps}
    >
      {items.map(...)}
      {provided.placeholder}
    </ul>
  )}
</Droppable>

```

### DroppableProvided 구조 (필수)
- innerRef : 드롭 가능한 DOM 요소에 ref 연결
- droppableProps : 드롭 기능을 위한 속성(data) 들
- placeholder : 드래그 중 비는 공간을 채우는 가짜 요소

### 중요 포인트
- `provided.placeholder` 는 반드시 `<ul>` 안에 있어야 한다.
    - `<ul>` 바깥에 두면 React가 HTML 구조 에러로 판단함

## Draggable 의 provided

```ts

<Draggable draggableId={item} index={index}>
  {(provided) => (
    <li
    ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={{
        ...provided.draggableProps.style,
        ...
      }}
    >
      {item}
    </li>
  )}
</Draggable>

```

### DraggableProvided 구조 (필수)
- innerRef : 드래그 가능한 요소에 ref 연결
- draggableProps : 위치 계산, 드래그 이동 등 기본 props
- dragHandleProps : 사용자가 마우스로 잡는 "핸들" 역할

## 🧠 Droppable vs Draggable 비교

| 항목 | Droppable | Draggable |
| --- | --- | --- |
| 역할 | 드롭 가능한 **영역** | 드래그 가능한 **요소** |
| 내부 속성 | `innerRef`, `droppableProps`, `placeholder` | `innerRef`, `draggableProps`, `dragHandleProps` |
| ref 연결 대상 | `<ul>`, `<div>` 등 드롭 영역 | `<li>`, 카드, 요소 등 드래그 대상 |
| 공통점 | 모두 **React에서 DOM을 직접 연결해야 하기 때문에 ref와 props가 필요** |  |

---

## 💡 헷갈렸던 점 & 배운 것

| 질문 | 정리된 개념 |
| --- | --- |
| `provided`는 Droppable이랑 Draggable이 공통으로 쓰는 거야? | 이름은 같지만 **완전히 다른 타입과 역할을 가짐** |
| `ref`, `props`를 왜 붙여야 해? | 드래그 위치 계산과 이벤트 처리를 위해 **실제 DOM에 연결해야 하기 때문** |
| `provided.placeholder`는 꼭 `<ul>` 안에 있어야 해? | ✅ 그래야 HTML 구조가 맞고 드래그 시 레이아웃도 깨지지 않음 |
| JSX 안에서 왜 `{(provided) => (...)}`처럼 함수로 써야 해? | Droppable이 값을 넘겨주기 위해 **children을 함수로 받기 때문 (함수형 children)** |

---

## 🎯 한 줄 요약

> provided는 드래그 기능을 DOM에 정확히 연결하기 위해 라이브러리가 넘겨주는 “도구 세트”이고,
이걸 제대로 붙여야만 드래그 앤 드롭이 정상 작동한다.
Droppable과 Draggable은 각각 전혀 다른 provided 구조를 가진다!
>
