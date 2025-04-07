setTimeout vs setInterval, 그리고 화살표 함수에서의 this
===


### 1. `setTimeout`

- **지정한 시간 후에 한 번만 실행**
- 주로 **지연 실행**(delay) 목적에 사용

```jsx

setTimeout(() => {
  console.log('1초 뒤 한 번만 실행');
}, 1000);

```

---

### 2. `setInterval`

- **지정한 시간 간격마다 반복 실행**
- 주로 **주기적인 작업** 처리 시 사용

```jsx

setInterval(() => {
  console.log('1초마다 반복 실행');
}, 1000);

```

---

### 🔸 주요 차이점 비교표

| 항목 | `setTimeout` | `setInterval` |
| --- | --- | --- |
| 실행 횟수 | 한 번만 실행 | 지정한 간격마다 반복 실행 |
| 사용 목적 | 지연 실행 | 반복 작업 처리 |
| 중단 방법 | `clearTimeout()` | `clearInterval()` |

> ✅ 핵심 요약:
> 
> 
> `setTimeout`은 **예약된 한 번의 실행**,
> 
> `setInterval`은 **주기적인 반복 실행**
> 

---

## 3. 화살표 함수의 특징과 `this` 바인딩

### ✅ 화살표 함수란?

- **간결한 문법**으로 함수를 작성할 수 있게 해주는 ES6 문법
- 중괄호 `{}`와 `return` 생략 가능 (한 줄일 경우)
- 일반 함수와 달리 **자신만의 `this`를 가지지 않고**, **바깥 스코프의 `this`를 그대로 사용**

```jsx

const add = (a, b) => a + b;

```

---

### ✅ 화살표 함수에서 `this`가 중요한 이유

`setInterval` 또는 `setTimeout`을 객체 안에서 사용할 때, **this가 엉뚱한 곳을 가리키는 문제**가 자주 발생함.

하지만 화살표 함수는 **`this`를 외부 스코프에서 가져오기 때문에**, 이런 문제를 자연스럽게 해결할 수 있음.

---

### 💡 예제: 화살표 함수 덕분에 `this`가 유효하게 유지되는 예

```jsx

function Timer() {
  this.seconds = 0;

  setInterval(() => {
    this.seconds++;
    console.log(this.seconds);
  }, 1000);
}

const timer = new Timer();

```

### 🔍 동작 설명:

- `this.seconds = 0`으로 초기화
- 화살표 함수 내부의 `this`는 **Timer 인스턴스의 this를 유지**
- `this.seconds++`는 1초마다 실행되고, `this.seconds`가 계속 1씩 증가
- 출력 결과:

```

1
2
3
...

```

---

### ✨ 요약 문장

> "화살표 함수는 코드의 간결성을 위해 만들어졌으며, 중괄호와 return 없이 값을 반환할 수 있고, this는 외부 스코프를 유지한다. 특히 setInterval 안에서 사용할 때, 화살표 함수를 쓰면 this가 의도한 객체를 제대로 가리키게 되어 유용하다."
>