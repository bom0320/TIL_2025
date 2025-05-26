## ✅ 전체 구조

```

<DragDropContext>
  <Droppable>
    <Draggable /> x N
    {provided.placeholder}
  </Droppable>
</DragDropContext>

```

---

## 🧠 1. 컴포넌트 시작

```tsx

'use client';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useState } from 'react';

const initialItems = ['🍎 Apple', '🍌 Banana', '🍇 Grape', '🍑 Peach'];

```

- 드래그 앤 드롭 관련 컴포넌트들을 임포트
- 상태 관리를 위해 `useState` 사용
- `initialItems`: 리스트 초기값

---

## 🧠 2. 상태와 드래그 끝 처리 함수

```tsx

const [items, setItems] = useState<string[]>(initialItems);

const handleDragEnd = (result: DropResult) => {
  const { source, destination } = result;
  if (!destination) return;

  const newItems = [...items];
  const [movedItem] = newItems.splice(source.index, 1); // 원래 자리에서 제거
  newItems.splice(destination.index, 0, movedItem);     // 새 위치에 삽입
  setItems(newItems);
};

```

- `handleDragEnd`: 드래그가 끝났을 때 호출됨
- `source.index`: 아이템이 어디서 왔는지
- `destination.index`: 어디에 떨어졌는지
- 아이템 순서 바꿔서 상태 업데이트

---

## 🧠 3. DragDropContext

```tsx

<DragDropContext onDragEnd={handleDragEnd}>

```

- 모든 드래그 기능의 최상위 감싸는 컴포넌트
- **드래그 끝났을 때 실행될 함수 등록**

---

## 🧠 4. Droppable

```tsx

<Droppable droppableId="fruitList">
  {(provided) => (
    <ulref={provided.innerRef}
      {...provided.droppableProps}
      style={{ padding: 20, backgroundColor: '#f0f0f0' }}
    >

```

- `droppableId`: 이 리스트의 고유 ID
- `provided.innerRef`: 이 DOM 요소를 드롭 대상 DOM으로 지정
- `droppableProps`: 내부적으로 드롭 이벤트가 작동하게 하는 속성들
- **`ul`이 드롭 가능한 리스트 공간이 됨**

---

## 🧠 5. items.map → 각 Draggable

```tsx

{items.map((item, index) => (
  <Draggable key={item} draggableId={item} index={index}>
    {(provided) => (
      <liref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={{
          ...provided.draggableProps.style,
          padding: '8px 12px',
          margin: '8px 0',
          background: 'white',
          border: '1px solid #ccc',
          borderRadius: '4px',
          cursor: 'grab',
        }}
      >
        {item}
      </li>
    )}
  </Draggable>
))}

```

### 💡 각각의 역할

- `key={item}`과 `draggableId={item}`는 같아야 함 (유일한 ID)
- `index={index}`: 배열 내 위치 (필수)
- `provided.innerRef`: 이 li가 드래그 가능한 요소라는 걸 DOM에 알려줌
- `draggableProps`: 위치 이동, 드래그 상태 처리
- `dragHandleProps`: **어디를 잡고 드래그할 수 있는지 설정** (여기선 `li` 전체)

---

## 🧠 6. placeholder

```tsx

{provided.placeholder}

```

- 드래그 중 아이템이 비워진 자리에 **가짜 공간을 만들어줌**
- UI가 튕기거나 무너지지 않도록 해주는 역할
- 반드시 `ul` 내부, `li`들과 나란한 위치에 있어야 함

---

## ✅ 최종 작동 흐름 요약

1. 사용자가 아이템을 누르고 끌면
2. `DragDropContext`가 이벤트 추적 시작
3. `Draggable`이 마우스 움직임에 따라 위치 업데이트
4. 아이템이 놓이면 `onDragEnd` 실행
5. source/destination 정보를 기반으로 아이템 재정렬
6. `setItems()`로 상태 업데이트 → 화면 자동 재렌더링

---

## 🎯 진짜 한 줄 요약

> 이 코드는 🍎🍌🍇🍑 리스트를 드래그해서 순서를 바꿀 수 있게 만들어주며,
> 
> 
> **Droppable + Draggable + provided 객체**를 정확히 연결해
> 
> **drag & drop이 자연스럽게 작동하게 한다!**
> 

---