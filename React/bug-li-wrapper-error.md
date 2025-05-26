# 🐛 React DnD에서 예상보다 `<li>`가 하나 더 생기는 문제

## 🤔 문제 상황

드래그 앤 드롭 리스트를 구현하는 중, `initialItems`는 3개였는데

화면에 리스트가 **4개처럼 보이는 현상**이 발생함.

코드 상에서 `items.map()`만 돌리고 있으니 이상했음.

---

## 🔍 문제 코드 (일부)

```tsx
<Droppable droppableId="fruitList">
  {(provided) => (
    <li ref={provided.innerRef} {...provided.droppableProps}>
      {items.map((item, index) => (
        <Draggable key={item} draggableId={item} index={index}>
          {(provided) => (
            <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
              {item}
            </li>
          )}
        </Draggable>
      ))}
      {provided.placeholder}
    </li>
  )}
</Droppable>

```

## ❗️원인 분석

- JSX에서 `<li>` 태그가 **리스트 전체를 감싸고 있음**
- 그 안에서 또 각각의 `<li>`가 생성되니까
    
    → **`<li>` 안에 `<li>`가 중첩된 잘못된 HTML 구조**가 됨
    
- HTML에서 `<li>`는 반드시 `<ul>`이나 `<ol>` 안에 있어야 하는데,
    
    그렇지 않으면 브라우저가 자동으로 보정하거나 구조가 깨짐
    
- 추가로 placeholder가 `<li>`처럼 렌더링되기 때문에
    
    리스트 수가 실제보다 더 많아 보일 수 있음
    

---

## ✅ 해결 방법

### 🔧 수정된 코드

```tsx

<Droppable droppableId="fruitList">
  {(provided) => (
    <ul ref={provided.innerRef} {...provided.droppableProps}>
      {items.map((item, index) => (
        <Draggable key={item} draggableId={item} index={index}>
          {(provided) => (
            <liref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              {item}
            </li>
          )}
        </Draggable>
      ))}
      {provided.placeholder}
    </ul>
  )}
</Droppable>

```

- 외부를 `<li>` → ✅ `<ul>`로 변경
- `<li>`는 **각 아이템마다만** 존재하게 함
- HTML 구조가 올바르게 되면서 아이템 수가 정확히 보임

---

## 📌 정리

| 문제 | 해결책 |
| --- | --- |
| `<li>`를 전체 리스트를 감싸는 데 사용함 | `ul`로 바꾸고 `li`는 item 하나당 하나만 |
| `<li>`가 하나 더 생김 | placeholder는 추가 요소로 렌더링되므로 `<ul>` 내부에 있어야 자연스러움 |
| HTML 구조가 잘못됨 | `<li>`는 반드시 `<ul>`, `<ol>` 안에 있어야 함 |

---

## ✅ 한 줄 요약

> React에서 리스트를 만들 땐 반드시 <ul>로 감싸고,
각 항목만 <li>로 렌더링해야 HTML 구조도 정상이고 드래그 앤 드롭도 예상대로 작동한다!
>