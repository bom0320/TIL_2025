# 대괄호 표기법과 ReferenceError vs undefined

### 1. 점 표기법과 대괄호 표기법

객체 프로퍼티 접근 방식에는 두 가지가 있다.

```jsx
obj.prop; // 점 표기법
obj["prop"]; // 대괄호 표기법 (문자열 키)
obj[prop]; // 대괄호 표기법 (변수의 값으로 키 지정)
```

---

### 2. 대괄호 표기법에서 주의할 점

대괄호 표기법의 안쪽은 **표현식**으로 평가된다.

따라서 **따옴표를 생략하면 문자열이 아니라 식별자(변수)로 인식**한다.

```jsx
var person = { name: "Lee" };
console.log(person["name"]); // ✅ "Lee"
console.log(person[name]); // ❌ ReferenceError
```

- `person['name']` → 문자열 `"name"`으로 프로퍼티 접근 → 정상 동작
- `person[name]` → `name`이라는 **변수**를 먼저 찾으려 함 → 그런 변수 없음 → ReferenceError

---

### 3. 왜 ReferenceError가 발생하는가?

위 코드에서 `person[name]`의 해석 과정:

1. 엔진은 대괄호 안을 **표현식으로 평가**하려고 한다.
2. `name`을 변수로 인식하고 스코프에서 찾는다.
3. `let name` / `var name` / `const name` 등으로 선언된 적이 없으니,

   👉 **ReferenceError: name is not defined** 발생.

**이 시점에서 객체 프로퍼티를 찾기 전에 이미 에러가 난다.**

---

### 4. 객체에 존재하지 않는 프로퍼티 접근 시는?

객체에 없는 프로퍼티를 접근하는 건 에러가 아니다. 단순히 `undefined`를 반환한다.

```jsx
var person = { name: "Lee" };
console.log(person["age"]); //  undefined (ReferenceError 아님)
```

---

### 5. 헷갈리기 쉬운 포인트

질문에서 이렇게 혼동하기 쉽다:

> ❌ “ReferenceError는 객체에 존재하지 않는 프로퍼티에 접근했을 때 발생한다.”

→ **아니다!**

✔️ **정확히는:**

- **ReferenceError** → 스코프에 해당 식별자가 전혀 없을 때 발생
- **없는 프로퍼티 접근** → 단순히 `undefined` 반환

---

### 6. 정리

| 상황                         | 동작                          | 결과               |
| ---------------------------- | ----------------------------- | ------------------ |
| `person['name']`             | 문자열 `"name"`으로 접근      | `"Lee"`            |
| `person[name]` (name 미선언) | `name` 식별자 평가 실패       | **ReferenceError** |
| `person['foo']` (없는 키)    | `'foo'`로 접근, 프로퍼티 없음 | `undefined`        |

---

### ✨ **핵심 요약**

- 대괄호 안에 문자열을 쓰지 않고 식별자를 쓰면, **엔진이 변수로 인식해서 평가**한다.
- 그 변수가 스코프에 없으면 **ReferenceError**가 난다.
- 객체에 없는 프로퍼티를 접근하는 건 에러가 아니라 **undefined**를 반환한다.

---

💡 **느낀 점**

- 대괄호 표기법에서 문자열과 식별자의 동작 차이를 이해했다.
- ReferenceError는 “식별자가 정의되지 않았을 때” 발생한다는 점을 주의해야 한다.
- 객체 프로퍼티 부재는 단순히 `undefined`를 반환할 뿐이다.
