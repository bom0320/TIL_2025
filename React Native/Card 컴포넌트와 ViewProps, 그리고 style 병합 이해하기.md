# React Native에서 Card 컴포넌트와 ViewProps, 그리고 style 병합 이해하기

## 1. Card 컴포넌트 기본 구조

```tsx
import React from "react";
import { View, StyleSheet, Platform, ViewProps } from "react-native";

export default function Card({ style, ...rest }: ViewProps) {
  return <View style={[styles.card, style]} {...rest} />;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
      },
      android: { elevation: 2 },
    }),
  },
});
```

- Card 는 단순히 `View`를 감싼 래퍼 컴포넌트이다.
  내부적으로 카드 모양(흰 배경, 둥근 모서리, 그림자)이 기본 스타일로 들어 있다.
- 외부에서 전달받은 스타일을 기본 스타일과 병합해서 최종적으로 View 에 적용

## 2. `ViewProps` 의 역할

- Card를 View 처럼 쓰고 싶기 때문에 View가 받을 수 있는 모든 prop를 받아야 한다.
  - ex) onLayout, pointerEvents, accessibilityLabel, testID 등
- ViewProps 안에는 이미 `style?: StyleProps<ViewStyle>`이 정의되어 있어서, Card에서도 style prop을 자연스럽게 받을 수 있다.
  다른 컴포넌트라면 그에 맞는 Props를 써야 한다.
- `<Text>` → TextProps (StyleProp<`TextStyle>`)
- `<Image>` → ImageProps 등

즉, ViewProps 는 단순히 style 때문이 아니라, 호환성 + 타입 정확도를 보장하기 위한 것이다.

## 3. `style`을 구조분해해서 꺼내는 이유

- `Card`는 **기본 스타일과 외부 스타일을 합쳐야** 하므로 `style`만 따로 분리.
- 나머지 prop은 `...rest`로 받아 그대로 `<View />`에 전달.
- 이렇게 하면 `style`이 `...rest`에 중복 전달되는 문제를 방지할 수 있다.

`({ style, ...rest })`는 **스타일 병합과 안전한 패스스루**를 위해 꼭 필요하다.

---

## 4. `style={[a, b]}` 배열 문법

React Native에서 `style` prop은 객체 하나뿐만 아니라 배열도 받을 수 있다.

배열로 주면 **앞 → 뒤 순서대로 병합**된다.

- `[a, b]`
  - `a` = 내부 기본 스타일 (`s.card`)
  - `b` = 외부에서 전달받은 스타일 (`style`)

뒤에 오는 게 앞의 걸 덮어쓴다.

즉, 사용자가 준 스타일이 최종적으로 우선 적용된다.

예시:

```tsx
<Card style={{ backgroundColor: "pink", margin: 16 }} />
```

- 내부: `backgroundColor: "#fff"` (기본)
- 외부: `backgroundColor: "pink"` (사용자)
- 최종: **핑크색 카드 + margin 16**

---

## 5. 정리

- `Card` = **View 래퍼 컴포넌트** (기본 카드 스타일 포함).
- `ViewProps` = **View와 동일하게 동작하도록 모든 prop을 받을 수 있게 하는 타입**.
- `style` 구조분해 = **기본 스타일과 외부 스타일 병합 + 안전한 패스스루**.
- `style={[s.card, style]}` = **첫 번째는 내부 기본 스타일, 두 번째는 외부에서 받은 스타일**.
  → 순서를 이렇게 둬야 사용자가 준 값이 최종 우선권을 갖는다.

---

- 단순히 `ViewProps`를 가져오는 이유는 style 때문만이 아니라, **전체 호환성과 타입 안정성**을 위해서다.
- `style`을 구조분해하는 건 **병합 로직을 위해 특별히 다뤄야 하는 prop**이기 때문이다.
