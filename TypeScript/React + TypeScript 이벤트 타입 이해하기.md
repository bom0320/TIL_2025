React + TypeScript 이벤트 타입 이해하기
===


React에서 이벤트 핸들러에 타입을 붙이는 건 처음엔 정말 헷갈린다.

예를 들어 `onChange` 이벤트에 `event: string`처럼 지정하면 왜 안 되는지도 처음엔 잘 모른다.

이번에 공부하면서 아래와 같이 개념을 정리해봤다.

---

## ✅ 이벤트(Event)란?

`onClick`, `onChange`, `onSubmit` 같은 건 전부 **"이벤트"**이다.

- 버튼 클릭 → `click` 이벤트
- input에 입력 → `change` 이벤트
- form 제출 → `submit` 이벤트

이런 이벤트가 발생하면, **React가 자동으로 이벤트 객체(Event Object)를 전달**해준다.

---

## ✅ 이벤트 객체(Event Object)란?

이벤트가 발생했을 때 전달되는 **정보 묶음**이다.

예를 들어 input 값을 입력하면:

```tsx
const onChange = (event) => {
  console.log(event.target.value);
}

```

우리가 실제로 원하는 문자열 값은 `event.target.value` 안에 들어 있다.

👉 즉, `event` 자체가 `string`이 아니다!

---

## ✅ TypeScript에선 이 event 객체에도 "타입"을 붙여줘야 한다

JavaScript에서는 타입 없이 그냥 써도 되지만,

**TypeScript는 타입 명시가 필수**다. 그래야 `.target.value`나 `.preventDefault()` 같은 걸 쓸 때 오류가 안 난다.

```tsx
const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  console.log(event.target.value);
}
```

---

## ✅ React가 미리 타입을 정의해놨어

React는 이런 상황별로 사용할 수 있는 타입들을 미리 정의해두었다.

| 상황 | 타입 이름 | 설명 |
| --- | --- | --- |
| input 값 변경 | `React.ChangeEvent<HTMLInputElement>` | `target.value` 사용 가능 |
| form 제출 | `React.FormEvent<HTMLFormElement>` | `preventDefault()` 사용 가능 |
| 버튼 클릭 | `React.MouseEvent<HTMLButtonElement>` | 클릭 정보 포함 |
| 키보드 입력 | `React.KeyboardEvent<HTMLInputElement>` | 어떤 키를 눌렀는지 정보 포함 |

---

## ✅ 헷갈리는 포인트 정리

### ❌ 이런 건 틀림

```tsx
const onChange = (event: string) => {
  // ❌ string이 아니기 때문에 오류남!
}
```

### ✅ 이렇게 써야 함

```tsx

const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  console.log(event.target.value);
}

```

---

## 💬 강의에서 말한 "정답은 구글링이다"의 의미

> React에서 TS로 개발할 때, 상황에 맞는 타입이 너무 많다.
> 
> 
> `onClick`, `onChange`, `onSubmit`, `onKeyDown` 등 이벤트마다 다르다.
> 
> 이걸 모두 외우는 건 불가능. 그래서 **필요할 때마다 구글링해서 적절한 타입을 찾아서 써야 한다!**
> 

---

## 📚 자주 구글링하게 되는 이벤트 타입들

| 상황 | 추천 검색어 | 사용할 타입 |
| --- | --- | --- |
| input 값 바뀔 때 | `react typescript input onChange` | `React.ChangeEvent<HTMLInputElement>` |
| form 제출 시 | `react typescript form onSubmit` | `React.FormEvent<HTMLFormElement>` |
| 버튼 클릭 | `react typescript button onClick` | `React.MouseEvent<HTMLButtonElement>` |
| 키보드 입력 감지 | `react typescript onKeyDown input` | `React.KeyboardEvent<HTMLInputElement>` |

---

## 🔑 결론 한 줄 요약

> React에서 TypeScript 쓸 때는, "정확히 외우는 능력"보다 "필요한 걸 검색해서 찾아쓰는 능력"이 훨씬 더 중요하다!
> 

---

✅ 앞으로도 이벤트 핸들러를 만들 때 헷갈리면,

"상황 + typescript + react + 이벤트 이름"으로 구글링하자!