# 메모리 게임에서 Index vs ID를 헷갈리지 않게 쓰는 법

### 오늘 배운 핵심 요약

- **카드의 정체성(개체 식별)** 은 `id`로, **화면상의 자리(슬롯)** 는 `index`로 다룬다.
- **렌더링과 데이터 모델**은 `id` 기반, **게임 상태와 애니메이션**은 (라운드 중 배열이 불변이라면) `index` 기반으로 두면 단순하고 안전하다.
- 애니메이션 훅의 `if (index < 0 || index >= flipsRef.current.length)` 같은 검사는 **카드 판별이 아니라 “애니메이션 배열 접근 가드”** 다.

---

## 1) 개념 잡기: **카드 vs 슬롯**

- **Card(개체)** = `id`로 식별 (예: `{ id: 'banana_3', fruit: 'banana' }`)
- **Slot(자리)** = `index`로 접근 (배열의 위치: 0,1,2…)

> 한 라운드 동안 items의 순서/길이를 바꾸지 않으면, 슬롯과 카드가 1:1로 고정 → index를 상태/애니에 써도 안정적.

---

## 2) 현재 구조(정답 패턴)

### 데이터 모델 & 렌더 (id 중심)

- `type Card = { id: string; fruit: FruitKey }`
- 리스트 key: `key={card.id}`
- 타일 표시: `fruitSrc[card.fruit]`

### 게임 상태 & 로직 & 애니메이션 (index 중심)

- 상태:
  - `open: number[]` (열려 있는 **슬롯 인덱스**)
  - `matched: Set<number>` (매치된 **슬롯 인덱스**)
  - `lock: boolean`
- 로직:
  - 클릭 핸들러 `handlePress(i)` → `i`는 슬롯 인덱스
  - 매칭 판정: `items[first].fruit === items[second].fruit`
- 애니메이션:
  - `useCardFlip(itemCount, revealAll)`
  - `flipCardSafe(i, toValue)` / `getCardTransforms(i)` 사용
  - 내부는 `Animated.Value[]` 배열을 **index**로 접근

> 왜 안전? 라운드 도중 items를 재정렬/삭제/추가하지 않기 때문.

---

## 3) 애니메이션 가드의 의미 (혼동 포인트 해소)

```tsx
const getCardTransforms = (index: number) => {
  if (index < 0 || index >= flipsRef.current.length) {
    return { frontRotateY: "0deg", backRotateY: "0deg", frontOpacity: 0, backOpacity: 1 };
  }
  const progress = flipsRef.current[index]; // 해당 "슬롯"의 Animated.Value
  …
};

```

- 이 `if`는 **배열 범위 보호(가드)** 다.
- 잘못된 인덱스 접근 시 **0ms 더미 애니메이션/기본 트랜스폼**을 반환해 호출부가 항상 안전하게 `.start()`/렌더를 할 수 있게 한다.
- **카드 동일성 판단과 무관**(그건 로직 레이어에서 `fruit` 비교).

---

## 4) 셔플(Fisher–Yates) 재확인

```tsx
for (let i = pairs.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1)); // 0..i
  [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
}
```

- 뒤에서 앞으로, 미확정 구간(0..i)에서 하나 뽑아 스왑 → **균등 랜덤**
- `sort(() => Math.random()-0.5)` 쓰지 말기

---

## 5) 핵심 스니펫 모음

### (A) 덱 생성: **id 부여 + 셔플**

```tsx
const deck = useMemo(() => {
  const pairs = [...base, ...base]; // 각 과일 2장
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  return pairs.map((fruit, index) => ({ id: `${fruit}_${index}`, fruit }));
}, [base]);
```

### (B) 매칭 판정(로직 레이어)

```tsx
const same = items[first].fruit === items[second].fruit;
```

### (C) useMemoryGameState: **제네릭으로** (데이터 타입 고정 X)

```tsx
export const useMemoryGameState = <T,>(
  items: T[],
  onPairMatched?: () => void,
  onMismatch?: () => void,
  onComplete?: () => void
) => {
  const [open, setOpen] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [lock, setLock] = useState(false);

  useEffect(() => {
    if (matched.size === items.length && items.length > 0) onComplete?.();
  }, [matched, items.length, onComplete]);

  useEffect(() => {
    setOpen([]);
    setMatched(new Set());
    setLock(false);
  }, [items]);

  return { open, matched, lock, setOpen, setMatched, setLock };
};
```

### (D) 리스트 렌더: **key는 id만**

```tsx
{
  items.map((card, i) => (
    <Pressable key={card.id} onPress={() => handlePress(i)}>
      {/* … */}
    </Pressable>
  ));
}
```

---

## 6) 언제 **id 기반으로 더 올려야** 하나 (전환 신호)

- 라운드 **도중**에 카드 **재정렬/삭제/추가/셔플**이 생긴다.
- 지연 콜백(`setTimeout`) 이후 **다른 덱**으로 바뀔 수 있다.
- 외부에서 “특정 카드”를 **항상 정확히** 지목해 애니/상태를 제어해야 한다.

### 전환 방법 2가지

**옵션 A) 얇은 어댑터 추가(변경 최소)**

보드/훅 경계에 `id ↔ index` 매핑 한 겹:

```tsx
const indexById = useMemo(
  () => new Map(items.map((c, i) => [c.id, i])),
  [items]
);

const flipByIdSafe = (id: string, toValue: 0 | 1) => {
  const i = indexById.get(id);
  return i == null
    ? Animated.timing(new Animated.Value(0), {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      })
    : cardAnimation.flipCardSafe(i, toValue);
};

const transforms = cardAnimation.getCardTransforms(
  indexById.get(card.id) ?? -1
);
```

**옵션 B) 풀 리팩터(완전 id 네이티브)**

`useCardFlip`을 `Map<string, Animated.Value>`로:

```tsx
const flipsRef = useRef<Map<string, Animated.Value>>(new Map());
// ensure/cleanup by id, flipById(id,…), getCardTransformsById(id) 구현
```

---

## 7) 네이밍 팁(헷갈림 차단)

- **슬롯 인덱스**임을 드러내기: `slotIndex`, `openSlotIndexes`, `matchedSlotIndexes`
- **개체 id**는 `cardId`, `matchedIds` 등으로 분리

---

## 8) 커밋 전 체크리스트

- [ ] 리스트 key는 `card.id`만 사용 (매칭 여부 등으로 key 바꾸지 않기)
- [ ] 매칭 판정은 `items[a].fruit === items[b].fruit`
- [ ] 애니메이션 접근은 현재 구조에선 `index` (라운드 중 배열 불변 전제)
- [ ] `useMemoryGameState<T>` 제네릭으로 변경 완료
- [ ] 셔플은 Fisher–Yates, 스왑은 `[pairs[i], pairs[j]] = [pairs[j], pairs[i]]`

---

## 결론 한 줄

> 지금: 데이터/렌더 = id, 상태/애니 = index(=slot) → 단순·안정.
>
> **나중**에 라운드 중 배열 변동이 생기면, 어댑터 또는 Map 기반으로 **id 중심**으로 올리면 된다.
