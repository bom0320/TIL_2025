TIL: TypeScript에서의 세 가지 버전 충돌 문제 + CRA의 한계
===

### 오늘의 이슈
`npm install --save-dev @types/react-query` 명령어 실행 시, 아래와 같은 에러가 발생함

```kotlin
npm error ERESOLVE could not resolve
...
Conflicting peer dependency: typescript@5.8.3
peerOptional typescript@"^3.2.1 || ^4" from react-scripts@5.0.1

```

## 원인 분석: 세가지 버전 충돌 중 하나
TypeScript 프로젝트에서는 다음 세가지 버전이 서로 영향을 주고 받는다:

| 구분 | 설명 | 지금 내 상황과의 연관성 |
| --- | --- | --- |
| ① **라이브러리 버전** | 예: `react-scripts@5.0.1`프로젝트 내부의 빌드 및 실행 도구 | CRA(Create React App)로 프로젝트를 시작했기 때문에 `react-scripts`가 자동 설치됨. 해당 버전은 TypeScript 5를 지원하지 않음 |
| ② **타입 선언 버전 (@types)** | 예: `@types/react-query`타입스크립트에서 사용할 수 있도록 타입 정보만 제공하는 라이브러리 | 설치하려 했지만 TypeScript와 `react-scripts`의 충돌로 인해 설치 실패 |
| ③ **TypeScript 버전** | 예: `typescript@5.8.3`내가 설치한 최신 TS 버전 | 최신 버전이지만 `react-scripts@5.0.1`에서 요구하는 버전보다 높아서 충돌 발생 |

---

## 🔥 에러 발생 구조 요약

```graphql
타입스크립트 버전이 너무 높음
→ react-scripts가 이걸 감당하지 못함
→ @types/react-query 같은 타입 선언 설치도 실패
```

## CRA가 왜 이 문제를 만들었을까?

### CRA의 핵심 빌드 툴 = `react-scripts`
- CRA는 내부적으로 `react-scripts`라는 패키지를 사용해 빌드, 테스트, 타입 검사 등을 자동으로 해준다.
- 그러나 현재 사용하는 `react-script@5.0.1`은 Typescript 5버전을 아직 지원하지 않는다.
- `react-scripts`가 허용하는 TS 버전 범위는 다음과 같다.

```
^3.2.1 || ^4 (즉, TS 3 또는 TS 4.x까지만 가능)
```

## 그래서 무슨 일이 벌어졌나면?
너는 최신 버전인 `TypeScript 5.8`을 설치했는데, CRA 내부의 `react-scripts`는 이렇게 말하는 거다.

```
react-scripts: "나 TS 4까지만 쓸 수 있어!"
TypeScript 5.8: "난 최신 버전이야!"

```

→ 둘이 버전이 안 맞아서 싸움 발생 → npm install 실패

---

## 해결 방법

### 🔧 방법 1: TypeScript 버전을 낮춰서 CRA에 맞춘다 (가장 쉬움)

```bash
npm uninstall typescript
npm install --save-dev typescript@4.9.5
npm install --save-dev @types/react-query
```
- 이렇게 하면 `react-script@5.0.1`과 TS 버전이 일치하므로 충돌 없이 설치 가능

### 🔧 방법 2: CRA를 탈출하고 Vite나 Next.js 같은 현대적인 도구로 전환한다

- CRA는 2024년 이후 유지보수가 사실상 중단된 상태이다.
- 많은 개발자들이 더 빠르고 가벼운 빌드 도구인 `Vite`, `Next.js`, `Parcel` 등으론 넘어가는 중이다.
- 최신 TS 기능을 무리 없이 사용하고 싶다면 장기적으로는 전환을 고려하는 것이 좋다.

## 느낀 점 및 교훈

- TypeScript 프로젝트에서는 **세 가지 버전의 호환성**을 꼭 확인해야 한다:
    1. 라이브러리 버전 (ex. `react-scripts`)
    2. 타입 선언 버전 (ex. `@types/react-query`)
    3. 타입스크립트 자체 버전 (ex. `typescript@5.8`)
- 하나라도 어긋나면 “설치가 안 되거나”, “엉뚱한 곳에서 에러가 터지는” 문제가 생긴다.
- **CRA는 더 이상 최신 스택을 따라가지 못하고 있으며**, 새로운 프로젝트에서는 대체 도구(Vite, Next.js 등)를 사용하는 것이 더 좋다.