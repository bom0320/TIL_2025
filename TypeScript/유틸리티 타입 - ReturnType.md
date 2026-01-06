# [TypeScript]유틸리티 타입 - ReturnType 가이드

TypeScript를 사용하다 보면 함수의 반환 타입을 활용해야 할 때가 많다. 이럴 때마다 매번 타입을 정의하는 것은 번거롭고, 코드 유지보수에도 좋지 않다. TypeScript의 내장 유틸리티 타입인 `ReturnType` 을 사용하면 이러한 문제를 깔끔하게 해결할 수 있다.

## 1. Return Type이란 무엇일까?

ReturnType은 **함수의 반환 타입을 추론하며 새로운 타입을 생성해주는 유틸리티 타입**이다. 쉽게 말해, "이 함수의 반환 타입이 뭐지?"라는 질문에 대한 답을 자동으로 찾아주는 똑똑한 친구라고 생각하면 된다.

## 2. ReturnType의 정의

ReturnType은 다음과 같이 정의되어 있다.

```ts
type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : any;
```

복잡해 보이지만, 핵심은 `infer` 키워드이다. `infer` R은 함수의 반환 타입을 R이라는 타입 변수로 추론하겠다는 의미이다. 만약 T가 함수 타입이라면 추론된 반환 타입 R을 반환하고, 그렇지 않다면 any를 반환한다.

## 3. ReturnType 사용 예시

### 1. 기본 함수의 반환 타입 추출

```ts
function getMessage() {
  return "Hello World!";
}
type MessageType = ReturnType<typeof getMessage>; // string
```

getMessage 함수의 반환 타입은 string이다. `ReturnType<typeof getMessage>` 를 사용하면 MessageType은 자동으로 string 타입이 된다.

### 2. 객체를 반환하는 함수의 타입 추출

```ts
function createUser() {
  return {
    id: 1,
    name: "Kim",
    age: 25,
  };
}
type User = ReturnType<typeof createUser>;
// type User = { id: number; name: string; age: number; }
```

createUser 함수의 반환 타입은 {id: number; name: string; age: number; }이다.
ReturnType을 사용하면 User타입은 자동으로 함수의 반환 타입과 동일하게 정의된다.

### 3. void 함수의 타입 추출

```ts
function logMessage(msg: string): void {
  console.log(msg);
}
type LogType = ReturnType<typeof logMessage>; // void
```

void 함수는 값을 반환하지 않지만, ReturnType을 사용하면 void 타입으로 정확하게 추론된다.

## 4. Return Type의 장점

- **타입 정의 중복 방지 :** 함수의 반환 타입을 직접 정의할 필요가 없어 코드가 간결해진다.
- **타입 안전성 보장 :** 함수의 실제 반환 타입과 일치하는 타입을 생성하므로 타입 불일치로 인한 버그를 예방할 수 있다.
- **코드 유지보수성 향상 :** 함수 구현이 변경되더라도 ReturnType을 사용한 타입은 자동으로 업데이트되므로 유지보수가 용이하다.

## 5. 주의사항

### 1. 함수 타입에만 사용 가능

```ts
// 잘못된 사용
type WrongType = ReturnType<string>;
// 에러: 'string' 형식은 '(...args: any) =. any' 제약 조건을 만족하지 않는다.
```

ReturnType은 함수 타입에만 사용할 수 있다. 일반적인 타입에는 사용할 수 없다.

### 2. typeof 와 함께 사용

```ts
function example() {
  return 42;
}
// 올바른 사용
type CorrectType = ReturnType<typeof example>;
// 잘못된 사용
type WrongType = ReturnType<example>; // 에러
```

함수의 타입을 가져올 때는 typeof 연산자를 함께 사용해야한다.

### 3. 직접적인 타입 지정 지양

```ts
// 비권장 사례
type CustomReturnType<T extends (...args: any) => any> = string;
```

ReturnType을 사용하는 이유는 함수의 반환 타입을 자동으로 추론하기 위함이다. 직접 타입을 지정하는 것으 ReturnType의 장점을 활용하지 못하는 방법이다.

## 결론

ReturnType은 TypeScript 개발 생산성을 높여주는 유용한 유틸리티 타입이다. 함수의 반환 타입을 쉽게 추론하고 재사용할 수 있도록 도와주어 코드의 가독성과 유지보수성을 향상시킬 수 있다. ReturnType을 적극적으로 활용한다면 더 깔끔하고 안전한 TS 코드를 작성하 게 가능해진다.
