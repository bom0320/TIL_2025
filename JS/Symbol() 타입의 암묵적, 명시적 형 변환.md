# Symbol() 타입의 암묵적 형 변환과 명시적 형 변환

### Symbol 이란?

- 고유한 값을 생성하는 데이터 타입, 주로 객체의 고유한 식별자로 사용된다.
- 두개의 Symbol 값은 항상 다르다.

## 1. `Symbol()` 과 다른 타입들과의 차이점

- Symbol은 다른 기본 타입들(숫자, 문자열, 불리언, null, undefined, 객체 등)과 다르게 동작한다. 특히 `Symbol` 은 **암묵적 형 변환**을 허용하지 않는다.

> 여기서 **암묵적 형 변환** 이라는 말에 집중!

- 예를 들어, 숫자나 문자열은 암묵적으로 변환될 수 있지만, `Symbol` 은 그 고유성을 보호하기 위해 암묵적인 형 변환을 허용하지 않는다.

## 2. `Symbol()` 과 다른 기본 타입들 비교

자바스크립트 엔진은 문자열 타입이 아닌 값을 문자열 타입으로 변환을 수행할 때 다음과 같이 동작한다.

```js
// 숫자 타입
0 + ''  // -> "0"
-0 + ''  // -> "-0"
1 + ''  // -> "1"
-1 + ''  // -> "-1"
NaN + '' // -> "NaN"
Infinity + '' // -> "Infinity"
-Infinity + ''  // -> "-Infinity"


// 불리언 타입
true + '' // -> "true"
false + '' // -> "false"


// null 타입
null + '' // -> "null"


// undefined 타입
undefined + '' // -> "undefined"


// 심벌 타입
(Symbol()) + '' // -> TypeError: Cannot convert a Symbol value to a string


// 객체 타입
({}) + '' // "[object object]"
Math + '' // -> "[object Math]"
[] + '' // -> ""
[10,20] + '' // -> "10,20"
(function(){}) + '' // -> "function(){}"
Array + '' // -> "function Array"
```

### Symbol TypeError

- `Symbol`은 암묵적 형 변환이 안되는거지, **명시적 형 변환**은 허용한다.
- 즉, `toString()` 메서드를 사용하여 문자열로 변환할 수 있다.
- 하지만 자동 변환 즉, 암묵적 형 변환은 허용되지 않는다.

```js
var a = Symbol();
console.log(a.toString()); // "Symbol()"
console.log(String(a)); // "Symbol()"
```

## 3. 왜 `Symbol` 은 암묵적 형 변환이 불가능할까?

#### 고유성

- `Symbol()`은 고유한 값으로 설계되었다.
- 다른 값들과 자동으로 형 변환될 경우, 고유성에 대한 문제가 생길 수 있다.

#### 안전성

- `Symbol()`을 다른 타입으로 변환하면 의도하지 않은 오류가 발생할 수 있으므로, 암묵적 형 변환을 방지하여 안전하게 다루기 위해 **자동 변환을 제한**하고 있다.

## 결론

- `Symbol`은 다른 기본 타입들과 다르게 암묵적 형 변환을 허용하지 않는다. `+ ""`와 같은 자동 변환시 `TypeError`가 발생한다.
- **명시적 형 변환**은 가능하여 `toString()` 또는 `String()`을 사용하면 `Symbol`을 문자열로 변환할 수 있다.

따라서 Symbol은 고유성을 유지하기 위해 암묵적 형 변환을 방지하고, 명시적인 형 변환만을 허용한다.
