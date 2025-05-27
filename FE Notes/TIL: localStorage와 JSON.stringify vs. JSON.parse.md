TIL: localStorage와 JSON.stringify vs. JSON.parse
===

브라우저 저장소인 localStorage의 개념과 JSON 변환 처리의 필요성 이해하기 위해서 다음과 같은 포스터를 작성했다.

## localStorage 란?

**localStorage** 는 **브라우저가 제공하는 클라이언트 측 저장소**이다.

HTML5에서 도입된 **Web Storage AP**I 중 하나이며, key-value 형태의 데이터를 **브라우저에 영구적으로 저장**할 수 있다.

### 💡 주요 특징

| 항목 | 설명 |
| --- | --- |
| 지속성 | 브라우저를 꺼도, PC를 재부팅해도 데이터가 남아있음 |
| 저장 용량 | 보통 도메인당 약 5MB ~ 10MB 저장 가능 (쿠키보다 훨씬 큼) |
| 접근 범위 | 같은 도메인에서만 접근 가능 (보안 보호) |
| 저장 형식 | 반드시 **문자열(string)**만 저장 가능 |
| 사용 예시 | 자동 로그인 유지, 글 임시 저장, 테마 설정 등 |

---

### 사용 예시

```tsx
// 저장
localStorage.setItem('nickname', '김봄');

// 불러오기
const name = localStorage.getItem('nickname');

// 삭제
localStorage.removeItem('nickname')l

// 전체 삭제
localStorage.clear();
```

## ❓ 그런데 객체/배열은 왜 안 되는가?

localStorage는 문자열만 저장 가능하므로, 

**자바스크립트의 객체나 배열을 바로 저장할 수 없다.**

이럴 때 사용하는 것이 바로:

- `JSON.stringify()`  : 객체 → 문자열
- `JSON.parse()`: 문자열 → 객체

---

## 🔄 JSON.stringify / JSON.parse 흐름

### 🔷 저장 시 (객체 → 문자열)

```tsx
const post = { title: "안녕", content: "첫 글이얌" };

localStorage.setItem('posts', JSON.stringify([post]));

```

- `[post]` 는 자바스크립트 배열
- `JSON.stringify()` 로 변환 시, 아래처럼 JSON 문자열로 바뀜:

```json
"[{\"title\":\"안녕\",\"content\":\"첫 글이야\"}]"

```

---

### 🔶 꺼낼 때 (문자열 → 객체)

```tsx
const saved = localStorage.getItem('posts');

if (saved) {
  const parsed = JSON.parse(saved);
  console.log(parsed[0].title);  // "안녕"
}
```

- `JSON.parse()` 는 문자열을 다시 자바스크립트 객체 배열로 복원
- 이후 배열처럼 다루기 가능

---

## 📦 전체 흐름 정리

```jsx
[ JS 객체/배열 ]
    ↓ JSON.stringify
"문자열" (localStorage에 저장됨)
    ↑ JSON.parse
[ JS 객체/배열 복원 ]

```

---

## 🔥 핵심 요약

| 질문 | 답변 |
| --- | --- |
| localStorage에 왜 stringify가 필요해? | 문자열만 저장 가능하기 때문 |
| 왜 다시 parse 해야 해? | 문자열로는 `.title` 등 프로퍼티 접근이 안 되기 때문 |
| 변환 형태는 어떻게 생김? | 객체가 `"{...}"` 형태의 JSON 문자열로 바뀜 |
| 언제 써야 해? | localStorage, sessionStorage, 서버 통신 시 필수 |

---

## ✅ 실전에서 적용한 코드 예시 (React 게시판 프로젝트)

```tsx

// 저장
useEffect(() => {
  localStorage.setItem('posts', JSON.stringify(posts));
}, [posts]);

// 불러오기
useEffect(() => {
  const saved = localStorage.getItem('posts');
  if (saved) {
    setPosts(JSON.parse(saved));
  }
}, []);

```

> posts 상태가 바뀌면 자동으로 localStorage에 저장
> 
> 
> 페이지가 새로고침되면 localStorage에서 다시 불러와 복구됨
> 

---

## 💬 느낀점

이번 학습을 통해 단순히 데이터를 저장하는 것만이 아니라,

**자바스크립트 객체와 문자열 간의 변환 로직이 왜 필요한지**,

그리고 그 과정에서 어떤 데이터 형상이 오가는지 구체적으로 이해하게 되었다.

프론트엔드 개발에서 localStorage를 활용할 때는 무조건 `JSON.stringify` / `JSON.parse`가 함께 사용된다는 점을 명확히 인지하게 되었다.