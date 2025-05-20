🧩 드래그 앤 드롭 순서 바꾸는 로직 (with splice)
===

### 📌 목적

드래그로 아이템 순서를 바꿨을 때, 배열의 순서를 바꾸고 화면에 반영하는 코드

```tsx

const newItems = [...items];
const [movedItem] = newItems.splice(source.index, 1);
newItems.splice(destination.index, 0, movedItem);
setItems(newItems);

```

---

### 🧠 한 줄씩 해석

### ① `const newItems = [...items];`

- 상태 배열(`items`)을 **복사**한다
- 이유: React에서는 상태를 직접 수정하면 안 되니까 **복사해서 작업**

---

### ② `const [movedItem] = newItems.splice(source.index, 1);`

- `source.index` 위치의 아이템을 **잘라낸다**
- `.splice(시작인덱스, 몇 개 자를지)`
- `movedItem`에 잘라낸 아이템을 담는다

예시:

```

// newItems = ['A', 'B', 'C', 'D']
// source.index = 2

const [movedItem] = newItems.splice(2, 1);
// movedItem = 'C'
// newItems = ['A', 'B', 'D']

```

---

### ③ `newItems.splice(destination.index, 0, movedItem);`

- 잘라낸 `movedItem`을 원하는 위치에 **끼워 넣는다**
- `.splice(넣을 위치, 자를 개수, 넣을 값)`
- `자를 개수`를 0으로 해서 **안 자르고 끼워넣기만 함**

예시:

```

// newItems = ['A', 'B', 'D']
// destination.index = 1

newItems.splice(1, 0, 'C');
// newItems = ['A', 'C', 'B', 'D']

```

---

### ④ `setItems(newItems);`

- 새로운 순서를 **상태로 저장**
- 화면이 바뀜 (리렌더링)

---

### 🎯 전체 흐름 예시 (🍇 Grape를 Banana 앞에 옮기기)

**초기 배열:**

```

[0] 🍎 Apple
[1] 🍌 Banana
[2] 🍇 Grape ← 이걸
[3] 🍑 Peach

```

**드래그: source.index = 2, destination.index = 1**

**변경 후:**

```

[0] 🍎 Apple
[1] 🍇 Grape ✅
[2] 🍌 Banana
[3] 🍑 Peach

```

---

### ✅ 핵심 요약

| 단계 | 설명 |
| --- | --- |
| 1️⃣ `...items` | 배열 복사 (원본 수정 X) |
| 2️⃣ `.splice(source.index, 1)` | 기존 위치에서 잘라내기 |
| 3️⃣ `.splice(destination.index, 0, item)` | 새로운 위치에 끼워 넣기 |
| 4️⃣ `setItems()` | 상태 업데이트로 화면 반영 |

---

필요하면 이 내용 `TIL/ReactDnD.md`나 `TIL/useState-drag-drop.md` 같은 파일로 정리해도 좋아!

이거 복붙해서 저장해놔도 되고, 필요할 때마다 다시 불러달라고 해도 돼 😄

다음엔 `splice`만 연습할 수 있는 연습 예제도 만들 수 있어!
