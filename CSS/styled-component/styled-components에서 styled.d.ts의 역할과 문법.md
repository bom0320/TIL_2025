styled-components에서 styled.d.ts의 역할과 문법
===

### 배운 내용
- `styled-components`에서 테마를 사용할 때, TypeScript 에게 `theme` 객체의 구조를 알려주기 위해 `styled.d.ts` 라는 타입 선언 파일을 사용한다.
- 이 파일은 테마 개체의 타입을 명시해 **자동완성과 타입 추론을 가능하게 해주는 역할** 을 한다.

## 예시 코드

```ts
// styled.d.ts
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    btnColor: string;
  }
}
```

## 주요 문법 설명

| 문법 | 설명 |
| --- | --- |
| `import 'styled-components'` | 기존 `styled-components`의 타입 정보를 불러옴 |
| `declare module` | 특정 모듈의 타입을 확장하거나 보완할 때 사용 |
| `export interface DefaultTheme` | 테마 객체의 타입 정의. 이후 `theme.xxx`로 사용할 수 있음 |


## 활동 예

```tsx
const StyledBox = styled.div`
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.textColor};
`;
```
`theme.bgColor`, `theme.textColor`에 자동완성과 타입 안정성이 적용된다.

## 느낀점
- 그냥 외우기보단 **왜 이 코드가 필요한지** 이해하는 게 중요했다.
- 앞으로 테마 관련 설정을 할 땐 이 패턴을 그대로 참고해서 써도 될 듯