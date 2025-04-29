TIL: 타입스크립트에서 styled-components 사용 시 theme 타입 지정 문제 완전 이해하기
===

## ✨ 문제 상황

- 리액트 프로젝트에 타입스크립트를 추가하고 styled-components를 썼다.
- `ThemeProvider`를 사용해서 `theme={darkTheme}`처럼 테마 객체를 넘겼다.
- 그런데 `props.theme.textColor` 같은 부분에서 타입스크립트 에러가 발생했다.

```
Property 'textColor' does not exist on type 'DefaultTheme'
```

**❓ 나의 의문:**

> "아니 분명 ThemeProvider theme={darkTheme} 로 넘겨줬는데, 타입스크립트는 왜 몰라?"
> 

---

## 🔥 문제의 본질

- *JS(자바스크립트)**와 **TS(타입스크립트)**의 관점 차이 때문이었다.

| 구분 | 설명 |
| --- | --- |
| JS (자바스크립트) | 실행할 때 실제 값(`darkTheme`)을 넘기니까 문제 없음. |
| TS (타입스크립트) | 실행되는 **값**은 안 보고, 오직 "타입 정의(설계도)"만 보고 코드 검사를 한다. |

**타입스크립트는 런타임(실행) 중 값이 뭔지 모른다.
그래서 "theme 안에 textColor가 있다는 공식적인 타입 정의"를 요구하는 것이다.**

---

## ✅ 해결 방법

### 1. `styled.d.ts` 파일을 만들어 타입스크립트에게 "공식 메뉴판"을 제공한다.

**src/styled.d.ts**

```tsx
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    textColor: string;
    backgroundColor: string;
  }
}
```

**이 작업을 통해:**

- `theme` 객체는 `textColor`와 `backgroundColor`를 가진다고 타입스크립트에 명확히 알려준다.
- 이제 props.theme.textColor 같은 코드를 타입스크립트가 인정하고, 에러가 사라진다.

---

## 📜 타입스크립트 관점에서 정리

- darkTheme는 "값"이다. (실행 시 존재)
- DefaultTheme는 "타입"이다. (컴파일 시 검사)
- 타입스크립트는 오직 "타입"만 보고 검사를 하기 때문에,
`theme`에 어떤 값들이 있는지 타입 정의가 반드시 필요하다.

**"값을 넘겼다고 타입이 자동으로 생기는 것은 아니다!"**

---

## 🧠 처음 헷갈렸던 포인트 정리

| 헷갈렸던 부분 | 진짜 이유 |
| --- | --- |
| ThemeProvider에 theme 넘겼는데 왜 몰라? | 타입스크립트는 값을 보지 않고 타입 설명서를 요구함 |
| props.theme.textColor 썼는데 왜 에러? | "theme에 textColor가 있다"는 타입 선언이 없어서 에러 |
| styled-components 설치만 하면 된다던데? | JS에서는 맞지만, TS에서는 타입 추가작업(styled.d.ts)이 필요 |

---

## 🚀 최종 요약

> 값과 타입은 다르다.
> 
> 
> 타입스크립트는 항상 타입(설계도)만 보고 코드 검사를 한다.
> 
> 그래서 ThemeProvider로 값을 넘겨도, 타입을 별도로 선언해줘야 에러가 해결된다.
> 

---

# ✨ 이 경험에서 얻은 교훈

- 타입스크립트를 쓸 때는 항상 **"값"이 아니라 "타입"을 별도로 정의해줘야 한다**는 것을 기억한다.
- styled-components에서는 `styled.d.ts` 파일로 DefaultTheme를 확장하는 것이 필수다.
- 타입스크립트는 **"코드 실행 전"**에 코드를 보고 판단하는 컴파일러다. (값은 신경 안 씀)

---

# 📋 요약된 작업 흐름

1. `npm install styled-components @types/styled-components`
2. `ThemeProvider theme={darkTheme}`로 테마 넘기기
3. `src/styled.d.ts` 파일 생성해서 DefaultTheme 타입 확장
4. props.theme.xxx 사용할 때 타입스크립트 에러 없이 사용 가능!

---

# 🏁

> **"타입스크립트는 실행되는 값을 보는 게 아니라, 사전에 작성된 타입 정의만 본다."**
>