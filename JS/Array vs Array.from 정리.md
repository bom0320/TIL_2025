# Array vs Array.from

## 1. `Array` 생성자

```jsx
const arr = new Array(3);
console.log(arr); // [ <3 empty items> ]
```

- 숫자를 인자로 주면, **그 길이만큼의 “빈 칸”을 가진 배열**을 만든다.
- 각 칸은 “empty slot” 상태 → 실제 값이 없음.
- 그래서 바로 `map` 같은 걸 쓰면 동작하지 않음:
  ```jsx
  new Array(3).map(() => 0);
  // 결과: [ <3 empty items> ] (채워지지 않음)
  ```

👉 즉, `new Array(n)`은 “**껍데기 배열**”만 만들 뿐, 값은 채워주지 않는다.

---

## 2. `Array.from`

```jsx
const arr = Array.from({ length: 3 }, (_, i) => i);
console.log(arr); // [0, 1, 2]
```

- 첫 번째 인자: **유사 배열 객체** 또는 이터러블
  - `{ length: n }`을 주면 길이 n짜리 배열을 생성.
- 두 번째 인자(선택): **매퍼 함수**
  - 각 칸을 어떻게 채울지 지정.
  - `(_, i) => i` 는 인덱스를 그대로 넣는 예시.

👉 즉, `Array.from({ length: n }, fn)`은

**“길이 n 배열을 만들고 각 칸에 fn의 리턴값을 넣어라”**라는 뜻.

---

## 3. 비교 예시

### `Array`

```jsx
const arr = new Array(3);
console.log(arr); // [ <3 empty items> ]
console.log(arr[0]); // undefined도 아님, “비어 있음”
console.log(arr.map((x) => 0)); // [ <3 empty items> ] → map이 안 먹힘
```

### `Array.from`

```jsx
const arr = Array.from({ length: 3 }, () => 0);
console.log(arr); // [0, 0, 0]
console.log(arr[0]); // 0
console.log(arr.map((x) => x + 1)); // [1, 1, 1]
```

---

## 4. 왜 `Array.from`을 쓰나?

- **빈 칸이 아니라 실제 값으로 채워진 배열**을 만들 수 있다.
- 카드 게임 같은 경우:
  ```jsx
  flipsRef.current = Array.from(
    { length: itemCount },
    () => new Animated.Value(0)
  );
  ```
  → 카드 수만큼 배열을 만들고, 각 칸에 `Animated.Value` 객체를 채워 넣는다.

---

## 요약

- `new Array(n)` → 길이만 있는 빈 배열 (값 없음, 바로 사용 불가)
- `Array.from({ length: n }, fn)` → 길이 n 배열을 만들고 각 칸에 **값/객체를 넣음**
- → `Array.from`은 “초기화까지 한 번에” 할 때 유용하다.
