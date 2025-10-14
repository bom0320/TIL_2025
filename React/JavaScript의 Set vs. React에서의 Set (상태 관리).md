# JavaScript의 Set vs. React에서의 Set (상태 관리)

핵심은 **"JavaScript 문법"** 과 **"React 프레임워크의 규칙"** 은 서로 다르다는 점이다.

| **구분**      | **JavaScript 자체의 `Set`**              | **React에서의 `Set` (State)**    |
| ------------- | ---------------------------------------- | -------------------------------- |
| **목적**      | **데이터 저장 및 조작 (언어 기능)**      | **UI 렌더링을 위한 상태 관리**   |
| **가변성**    | **가변적 (Mutable)**                     | **불변적으로 사용 (Immutable)**  |
| **메서드**    | **`add()`, `delete()` 등으로 직접 수정** | **직접 수정 금지, 새 객체 생성** |
| **변화 감지** | **JS 엔진은 내부 변화를 처리**           | **React는 참조 주소만 비교**     |
| **결과**      | **데이터는 변경됨**                      | **UI 리렌더링 안 됨**            |

---

# 💡 다시는 헷갈리지 않는 사용 규칙

## 1. JavaScript 환경 (React 밖)

**👉 자유롭게 `add()`, `delete()`를 사용**

데이터의 효율적인 조작이 목적이므로, 메모리 주소를 바꾸지 않고 내부 내용을 직접 변경하는 것이 일반적이다.

```js
const mySet = new Set(['a']);
mySet.add('b'); *// 가능*
console.log(mySet); *// Set(2) {"a", "b"}*`
```

코드를 사용할 때는 주의가 필요하다.

## 2. React 환경 (State로 사용할 때)

**👉 절대로 직접 수정하지 말고, 항상 새로운 `Set`을 만들자**

React는 메모리 주소(참조)가 바뀌어야만 변화를 감지하고 UI를 업데이트한다.

### ❌ 잘못된 사용 (리렌더링 안 됨)

```js
const [items, setItems] = useState(new Set(["apple"]));

const addItem = () => {
  items.add("banana");
  _; // 기존 객체를 직접 수정_
  setItems(items);
  _; // 동일한 참조 주소 전달_
};
```

코드를 사용할 때는 주의가 필요하다.

### ✅ 올바른 사용 (리렌더링 됨)

**방법 A (가장 명확한 방법)**

```js
const [items, setItems] = useState(new Set(["apple"]));

const addItem = () => {
  const newSet = new Set(items);
  _; // 새 Set 객체 생성 (복사)_
  newSet.add("banana");
  setItems(newSet);
  _; // 새로운 참조 주소 전달_
};
```

코드를 사용할 때는 주의가 필요하다.

**방법 B: 콜백 함수 및 스프레드 사용 (더 간결한 방법)**

```js
const addItem = () => {
  *// 이전 상태(prevItems)를 사용하여 새로운 Set을 즉시 반환*
  setItems(prevItems => new Set([...prevItems, 'banana']));
};
```

코드를 사용할 때는 주의가 필요하다.

---

## 최종 정리

"JS의 `Set`은 원래 수정 가능하지만, **React의 State**에서는 **불변성**이라는 특별한 규칙을 지켜야 하므로 `Set.add()`를 직접 쓰지 않고 **새로운 `Set` 인스턴스**를 만들어서 사용한다."
