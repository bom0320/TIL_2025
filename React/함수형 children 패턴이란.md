함수형 children 패턴이란?
===

# 📦 함수형 children 패턴이란?

> children을 JSX 요소가 아닌 함수로 넘기는 패턴.
> 
> 
> 컴포넌트가 자식에게 직접 값을 전달할 수 있게 한다.
> 

---

## ✅ 일반 children과의 차이

### 일반 방식

```tsx

<Component>
  <div>Hello</div>
</Component>

```

### 함수형 children 방식

```tsx

<Component>
  {(props) => (
    <div>{props.message}</div>
  )}
</Component>

```

---

## ✅ 왜 함수형 children을 쓰는가?

> 컴포넌트가 내부에서 계산한 값들 (예: ref, props, placeholder)을
> 
> 
> JSX로는 직접 children에게 줄 수 없기 때문에,
> 
> **함수 형태로 children을 넘겨서 그 값들을 전달**할 수 있게 함.
> 

---

## ✅ 예시: `Droppable`에서의 사용

```tsx

<Droppable droppableId="myList">
  {(provided) => (
    <ulref={provided.innerRef}
      {...provided.droppableProps}
    >
      ...
      {provided.placeholder}
    </ul>
  )}
</Droppable>

```

- `provided`는 Droppable이 만든 드래그 기능용 "부품 세트"
- `ref`, `droppableProps`, `placeholder` 등 드래그 기능을 위해 꼭 필요함
- JSX로는 전달이 어렵기 때문에 **함수형 children으로 제공**

---

## 🎮 비유로 이해하기

| 방식 | 비유 | 설명 |
| --- | --- | --- |
| 일반 children | "이 버튼은 항상 이렇게 생겼어!" | 자식이 고정된 구조 |
| 함수형 children | "컴포넌트야, 상황에 맞춰서 버튼 만들어줘!" | 자식이 부모가 넘겨준 값으로 동적으로 구성 |

---

## 💡 핵심 정리

| 구분 | 설명 |
| --- | --- |
| 함수형 children | children을 JSX 대신 함수로 전달 |
| 왜 쓰나? | 부모 컴포넌트가 계산한 값을 자식에게 넘기기 위해 |
| 어디서 많이 쓰나? | `Droppable`, `Draggable`, `react-table`, `react-window` 등 |

---

## 🎯 한 줄 요약

> "children을 함수로 넘겨서, 부모 컴포넌트가 만들어주는 값(ref나 props 등)을 자식에게 직접 줄 수 있게 하는 패턴."
>