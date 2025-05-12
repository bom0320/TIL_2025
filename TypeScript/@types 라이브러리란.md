@types 라이브러리란?
===

## 개념 요약
- 대부분 **자바스크립트 라이브러리에는 타입스크립트용 타입 정보**가 없다.
- 타입스크립트를 사용할 때는 해당 라이브러리에 대한 타입 정보를 따로 설치해야 한다.
- 이때 사용하는 것이 바로 `@types/라이브러리명` 형식의 패키지다.
- 이 타입 정보들은 **DefinitelyTyped**라는 오픈소스 저장소에서 관리되고, npm 에 `@types/*` 형태로 배포된다.

[DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)


## 왜 따로 필요할까?
- 타입스크립트는 **정적 타입 검사 도구**다.
- 실행 전에 타입 오류를 잡기 위해선, 라이브러리의 **함수, 객체, 메서드에 대한 타입 정보** 가 필요하다.
- 자바스크립트에는 타입 정보가 없기 때문에, `@types` 를 통해 보완해야 한다.


## 설치 방법 예시

```bash
npm install react                    # 실행에 필요한 라이브러리
npm install --save-dev @types/react # 개발용 타입 정보
```
- 라이브러리는 `dependencies`에
- 타입 정보는 `devDependencies`에 넣는 것이 일반적이다.

## 대표적인 @types 패키지들
- `@types/react`
- `@types/node`
- `@types/express`
-  `@types/lodash`
- `@types/jquery` 등

---

## 🧪 jQuery 타입 정의 예시

### 설치 방법

```bash
npm install jquery                    # 실제 jQuery 코드
npm install --save-dev @types/jquery # jQuery 타입 정의
```

### 설치하면 생기는 효과
- $, .text(), .css() 같은 jQuery 함수들에 대해 자동완성, 타입 추론이 가능해진다.
- 에디터에서 마우스 오버 시 함수 설명이 뜨고, 타입 오류도 미리 잡아준다.

```ts
import $ from "jquery";

$("#myDiv").text("Hello"); // ✅ text 메서드 자동완성 가능!
```

## 왜 `--save-dev` 로 설치할까?
- `jQuery`는 실행 시 필요한 라이브러리이기 때문에 `dependencies`에 설치하고,
- `@types/jQuery`는 **개발 중 타입 검사에만 필요**하므로 `devDependencies`에 설치한다.

## ✅ 한눈에 정리

| 항목 | 설명 |
| --- | --- |
| `jquery` | 실제 실행되는 jQuery 코드 |
| `@types/jquery` | 타입스크립트를 위한 설명서 (타입만 있음) |
| 설치 위치 | `dependencies`, `devDependencies` 분리 |
| 설치 명령어 | `npm install jquerynpm install --save-dev @types/jquery` |

---

필요한 라이브러리가 있다면 항상 `@types/라이브러리명` 형태로 검색해서 설치할 수 있다!