# ES5/6 메서드, super, 상속 정리

## 1. ES5 vs. ES6에서의 메서드 정의 차이

### ES5 (과거)

- 객체 리터럴에서 메서드를 정의할 때, 프로퍼티 값엥 함수를 할당하면 메서드로 취급했다.
- 사양상 이런 함수는 일반 함수 객체로, `[[Call]]` 과 `[[Construct]]` 를 모두 가진다.
  - **[[Call]] :** 그냥 함수처럼 호출 가능
  - [[**Construct]] :\*\* new 로 호출하면 인스턴스를 생성하는 생성자 역할 가능

```jsx
const obj = {
  bar: function () {
    console.log(this);
  },
};

new obj.bar(); // 가능 (셍성자 호출)
```

### ES6 (현재)

- **메서드 축약 표현**이라는게 생김
- 이렇게 정의한 메서드는 사양상 메서드(MethodDefinition) 로 분류된다.

```jsx
cons obj = {
	foo() {
		console.log(this);
	}
};
```

**ES6 메서드 특징**

- non-constructor
  - [[Construct]] 를 가지지 않음
  - new obj.foo() 호출 불가 (TypeError 발생)
- [[HomeObject]] 내부 슬롯을 가짐
  - super 를 사용할 수 있는 근거가 됨

**일반 함수 표현식과 차이**

- `bar: function(){}`는 여전히 constructor 기능이 있고 `[[HomeObject]]`는 없음.
- `foo() {}`는 메서드로 취급되며 `[[HomeObject]]`가 있음, 하지만 `new` 불가.

---

## 2. [[HomeObject]]란?

`[[...]]`로 표시되는 것은 **ECMAScript 사양에서만 쓰이는 내부 슬롯**이다.

- **직접 접근 불가** (코드로 obj.[[HomeObject]] 같은 건 못 함)
- 엔진이 내부적으로 관리하는 비밀 메모 같은 것.

**`[[HomeObject]]`**

- “이 메서드가 원래 속한 객체”를 기억한다.
- `super` 호출 시 상위 객체를 찾는 기준이 된다.

---

## 3. super란?

`super`는 **상속 관계**에서 상위(부모)의 메서드나 생성자를 호출할 때 사용한다.

### 클래스 상속에서

```jsx
class Parent {
  constructor(name) {
    this.name = name;
  }
  greet() {
    console.log(`Hello, I'm ${this.name}`);
  }
}

class Child extends Parent {
  constructor(name, age) {
    super(name); // 부모 constructor 호출
    this.age = age;
  }
  greet() {
    super.greet(); // 부모 메서드 호출
    console.log(`I'm ${this.age} years old`);
  }
}

const c = new Child("봄", 17);
c.greet();
// Hello, I'm 봄
// I'm 17 years old
```

### 객체 리터럴 상속에서

```jsx
const parent = {
  hello() {
    console.log("부모 인사");
  },
};

const child = {
  hello() {
    super.hello(); // parent의 hello 호출
    console.log("자식 인사");
  },
};

Object.setPrototypeOf(child, parent);
child.hello();
// 부모 인사
// 자식 인사
```

**`super`가 동작하려면 `[[HomeObject]]`를 가진 ES6 메서드여야 한다.**

---

## 4. “메서드로서만 쓰인다”는 의미

ES6 메서드 축약 표현은 **객체의 동작을 정의하기 위한 전용 메서드**로써 설계되었다.

- 생성자처럼 `new`로 호출 ❌ (non-constructor)
- `super`로 상위 메서드를 호출 (HomeObject 덕분)

---

## 5. 상속 vs 단순한 값 복사

처음에는 이런 의문이 생길 수 있다:

> “공통 기능이 필요하면 그냥 매개변수로 넘겨서 처리하거나, 스프레드 연산자로 복사하면 되지 않나?”

- **단순한 데이터 전달**만 필요하면 매개변수나 스프레드로 충분하다.
- **하지만 상속 기반 설계의 목적**은 공통 로직과 구조를 **한 곳에 정의하고 재사용**하는 것.

```jsx
// 상속 기반 설계의 장점
// 부모 클래스에 공통 로직 정의 → 자식은 super()로 호출
// 유지보수성과 재사용성이 높아짐
```

---

## 6. React에서의 혼동

React에서는 보통 **상속보다는 조합(Composition)**을 권장한다.

→ 공통 로직은 부모 컴포넌트에 두고 props로 자식에게 내려주는 방식이 더 자연스럽다.

```jsx
function Parent() {
  const eat = () => console.log("냠냠"); // 공통 로직
  return <Child eat={eat} />;
}

function Child({ eat }) {
  return <button onClick={eat}>밥먹기</button>;
}
```

- 이건 React 패러다임이고,
- **일반적인 OOP 상속**과는 다른 개념이니 혼동할 수 있다.
- 하지만 **일반적인 객체지향 프로그래밍(OOP)에서는 상속을 쓸 때 `super`를 사용한다는 점이 핵심.**

---

## 7. 핵심 정리

| 구분               | ES5 일반 함수 | ES6 메서드 축약 표현   |
| ------------------ | ------------- | ---------------------- |
| constructor(`new`) | 가능          | 불가                   |
| [[HomeObject]]     | 없음          | 있음 (super 호출 가능) |
| super 사용         | 불가          | 가능                   |

✔️ **상속 기반 설계에서는 super를 사용해 부모 로직을 호출한다.**

✔️ **ES6 메서드는 메서드로서만 사용되며, 생성자로는 못 쓴다.**

✔️ **React처럼 조합 패턴을 쓰는 환경은 별개로 생각해야 한다.**

---

**느낀 점**

- 예전에는 “프로퍼티 값이 함수면 메서드”로 뭉뚱그려 생각했지만,
  ES6 이후 사양에서는 **메서드 축약 표현**을 진짜 메서드로 구분하며 목적을 명확히 함
- `[[HomeObject]]`, `[[Construct]]` 같은 내부 슬롯을 이해하니
  왜 `super`가 되는 경우와 안 되는 경우가 있는지 알게됨
- React 개발 중 혼동했던 부분도, **OOP 상속과 React 조합 패턴이 다른 개념**임을 이해
