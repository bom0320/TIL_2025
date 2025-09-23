# Animated.stagger

## Animated.stagger의 시그니처(함수 형태)

React Native 공식 문서에 따르면:

```ts
Animated.stagger(delay: number, animations: Animated.CompositeAnimation[]) : Animated.CompositeAnimation
```

### 첫 번째 인자 : delay (number)

- 각 애니메이션 사이에 넣을 시작 지연(ms)

### 두 번째 인자: animations (배열)

- 실행할 여러 애니메이션 객체들 (Animated.timing, Animated.spring 같은 것들)

즉,

```ts
Animated.stagger(딜레이시간, [애니메이션1, 애니메이션2, 애니메이션3...])
```

이렇게 생길 함수야

## Hyoit

`shared/lib/animations/useCardFlip.ts`

```ts
return Animated.stagger(
  staggerDelay, // ← 첫 번째 인자 (지연 간격)
  flipsRef.current.map(
    (
      animatedValue // ← 두 번째 인자 (배열 생성)
    ) =>
      Animated.timing(animatedValue, {
        toValue,
        duration: MEMORY_GAME.FLIP_DURATION,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      })
  )
);
```

- staggerDelay -> 각 카드 뒤집기 시작 간격 (ex: 8ms)
- flipRef.current.map(...) -> Animated.Value 들을 돌면서 각 카드마다 애니메이션 객체 생성 -> 이게 배열이 됨

즉, map 부분의 결과는 이런 거랑 같아:

```ts
[
  Animated.timing(flipsRef.current[0], {...}),
  Animated.timing(flipsRef.current[1], {...}),
  Animated.timing(flipsRef.current[2], {...}),
  ...
]
```

그리고 staggerDelay와 이 배열이 Animated.stagger의 두 인자가 되는 것이다.

## 최종 형태 (구조적으로 보면)

```ts
Animated.stagger(
8, // ms 간격
[ // 애니메이션 객체 배열
anim0,
anim1,
anim2,
...
]
)

```

### 왜 이렇게 작성했는지

- staggerDelay 는 숫자 하나
- map 은 배열을 돌면서 Animated.timing(..)을 리턴하니까 애니메이션 배열이 만들어짐
  그래서 Animated.stagger(숫자, 배열) 형태가 완성 되는 것
