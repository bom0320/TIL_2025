# Memory Game 현재 구조에서 Index vs ID 정리

### 1. **Index 기반으로 관리하는 부분**

- **게임 상태(state)**
  - `open: number[]` → 현재 열려 있는 카드들의 _배열 위치_
  - `matched: Set<number>` → 짝 맞춘 카드들의 _배열 위치 집합_
  - `lock: boolean` → 현재 판정 중인지 여부
- **로직 처리**
  - `handlePress(i)` → `i`는 배열 순서
  - 짝 판단:
    ```tsx
    const same = items[first].fruit === items[second].fruit;
    ```
    → index로 바로 `items[]` 접근
- **애니메이션 훅(useMemoryCardAnimation)**

  - `itemCount: items.length`
  - `flipCardSafe(i, toValue)`
  - `getCardTransforms(i)`
  - → 전부 index 기반으로 카드 위치를 추적

  **정리**: 게임 로직과 애니메이션은 **index 중심**으로 동작

---

### 2. **ID 기반으로 관리하는 부분**

- **렌더링 안정성**
  - React list key:
    ```tsx
    key={card.id}

    ```
    → React에서 리스트 re-render 최적화를 위해 id 사용
- **Card 타입**
  ```tsx
  export type Card = {
    id: string; // 카드 고유 식별자
    fruit: FruitKey;
  };
  ```
  → 데이터 모델은 고유 id를 보장하고 있음
- **렌더링 UI**

  - `MemoryTile`에서 보여줄 때 `card.fruit` 같이 데이터 자체는 id와 상관없이 fruit 사용

  **정리**: 데이터 모델과 렌더링 식별에는 **id** 사용

---

### 3. **왜 이렇게 나눴는가**

- **Index 장점**
  - 배열이 한 라운드 동안 변하지 않으면 index는 빠르고 단순
  - `items[i]`로 바로 접근 가능
  - 애니메이션 훅도 index 기반이므로 구현이 간단
- **ID 장점**
  - React 렌더링 시 안정적 key 제공 (index만 쓰면 warning 가능)
  - 배열이 바뀌어도 동일 개체임을 보장

---

### 4. **앞으로 바꿀 가능성이 있는 경우**

- 현재: `items`가 게임 중 바뀌지 않음 → **index로 충분**
- 나중에:
  - **shuffle 기능**을 게임 도중 적용
  - **특정 카드 추가/삭제/교체**
    → 이때는 `open`/`matched`까지 `id` 기반으로 바꿔야 안전

---

**정리 메모**

- **Index**: 상태(state) + 애니메이션 로직
- **ID**: 데이터 모델 + React 렌더링 key
