TIL: React + localStorage + JSON.stringify ,JSON.parse 완전 이해하기
===

### 🧠 오늘의 학습 키워드

- `localStorage`
- `JSON.stringify()`, `JSON.parse()`
- React의 `useEffect()` 활용
- 상태(State) 저장 및 복원 흐름

---

### 💡 배경

React로 게시판 프로젝트를 만들면서, 사용자가 작성한 글 목록(`posts`)을 **localStorage에 저장하고**

페이지 새로고침 시에도 **다시 불러와 복원**할 수 있도록 구현했다.

이 과정에서 아래 두 함수의 구조와 필요성을 정확하게 이해하고 싶어졌고,

결국 **문자열 ↔ 객체 변환의 흐름**, 그리고 **렌더링 타이밍과 useEffect의 순서**까지 명확하게 정리하게 되었다.

---

### 🧩 구조 설명

### 🔁 전체 흐름

```tsx
// 저장
localStorage.setItem('posts', JSON.stringify(posts));

// 불러오기
const saved = localStorage.getItem('posts');
setPosts(JSON.parse(saved));

```

---

### 🔐 1. localStorage에는 왜 문자열만 저장할 수 있을까?

- localStorage는 내부적으로 **모든 데이터를 문자열(String)** 형식으로 저장함.
- 즉, 배열이나 객체를 그대로 저장하면 자동 변환되는 게 아니라 **[object Object]** 같은 이상한 값으로 깨짐.
- 그래서 **반드시 `JSON.stringify()`로 변환**해서 저장해야 함.

---

### 📮 2. 저장하기

```tsx
useEffect(() => {
  localStorage.setItem('posts', JSON.stringify(posts));
}, [posts]);

```

- `posts` 상태가 바뀔 때마다 실행됨
- `JSON.stringify(posts)`를 통해 객체(또는 배열)를 **JSON 문자열로 변환**
- 그 문자열을 localStorage에 저장
- 예시:

```tsx
const posts = [
  { title: '글1', content: '내용1', id: 101 },
  { title: '글2', content: '내용2', id: 102 }
];
```

→ JSON.stringify(posts) 결과:

```json
'[{"title":"글1","content":"내용1","id":101},{"title":"글2","content":"내용2","id":102}]'
```

---

### 📥 3. 불러오기

```tsx
useEffect(() => {
  const saved = localStorage.getItem('posts');
  if (saved) {
    setPosts(JSON.parse(saved));
  }
}, []);
```

- 앱이 처음 실행되면 **localStorage에 저장된 JSON 문자열을 가져와서**
- `JSON.parse()`로 **원래의 객체/배열 형태로 복원**
- 복원된 배열을 상태에 설정 (`setPosts(...)`) → 화면에 표시 가능해짐

---

### 📌 JSON.stringify / JSON.parse 요약 표

| 단계 | 함수 | 설명 | 예시 |
| --- | --- | --- | --- |
| 저장할 때 | `JSON.stringify(posts)` | 객체/배열을 JSON 문자열로 변환 | `[{title:'A'}]` → `'[{"title":"A"}]'` |
| 저장된 값 |  | 문자열로 저장됨 | `'[{"title":"A"}]'` |
| 불러올 때 | `JSON.parse(saved)` | JSON 문자열을 객체/배열로 복원 | `'[{"title":"A"}]'` → `[{title:'A'}]` |

---

### 💥 흔히 생기는 오해와 오류

```tsx
const saved = localStorage.getItem('posts');
saved.map(...) // ❌ TypeError: saved.map is not a function
```

- 이 에러는 `saved`가 문자열이라서 생김
- `map()`은 배열에만 쓰는 메서드이므로
- 반드시 `JSON.parse(saved)`로 배열로 변환해야 `.map()`이 동작함

---

### 🧠 핵심 개념 요약

- **localStorage는 문자열만 저장 가능**
- **객체/배열을 저장할 땐 → JSON.stringify()**
- **꺼내서 사용할 땐 → JSON.parse()**
- **useEffect의 순서**는 불러오기 → 저장하기가 가장 자연스러움

---

### 📌 한 줄 요약

> JSON.stringify()는 객체를 문자열로 바꿔서 localStorage에 저장하게 해주고,
> 
> 
> `JSON.parse()`는 문자열을 다시 객체로 복원해서 상태로 사용할 수 있게 해준다.
> 

---

### ✅ 마무리 & 느낀 점

이번 게시판 예제를 통해 React 상태 관리 + localStorage + JSON 흐름이 **전부 연결**되었다.

단순히 따라 쓰는 게 아니라, 데이터가 어떤 **형태로 바뀌는지**를 **직접 눈으로 보고**,

왜 변환이 필요한지까지 이해할 수 있었음

앞으로도 데이터를 저장하거나 불러올 일이 있다면,

**“항상 localStorage에는 문자열만 들어간다”**

**→ 그래서 stringify/parse는 짝꿍처럼 함께 다녀야 한다!**

라는 걸 명심할 것!