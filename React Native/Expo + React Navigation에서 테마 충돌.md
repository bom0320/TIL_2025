# Expo + React Navigation에서 테마 충돌 해결하기

## Issue

Expo 템플릿으로 프로젝트를 생성하고 React Navigation 을 같이 사용하다보면 Expo 템플릿의 Colors.ts와 react-navigation 에서 각자 제공하는 색상 시스템을 사용하다보니, 색 체계가 이중화 되면서 UI가 엇갈리는 걸 볼 수 있다.

- **Expo 템플릿의 Colors.ts :** 앱 전체 컴포넌트들(버튼, 텍스트, 배경 등)의 색상을 관리
- **react-navigation의 테마 :** 네비게이션 바, 탭바, 헤더 등 오직 네비게이션 요 소만 관리

> 💡 실제 이슈 사례
>
> 이 문제는 개발자 커뮤니티에서 자주 제기되는 이슈로, [Medium 가이드](https://hemanshum.medium.com/the-ultimate-guide-to-custom-theming-with-react-native-paper-expo-and-expo-router-8eba14adcab3)에서도 "React Native Paper와 Expo Router 설정이 까다로울 수 있다"고 언급하고 있다.

이는 **두 개의 서로 다른 테마 시스템**이 각자 동작하기 때문이다.

### 문제의 원인

### 1. Expo 템플릿의 `Colors.ts`

```tsx
// constants/Colors.ts - Expo가 제공
export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: "#0a7ea4",
    // ...
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: "#fff",
    // ...
  },
};
```

**역할**: 앱 전체 컴포넌트들의 색상 관리

### 2. React Navigation의 테마

```tsx
// @react-navigation/native에서 제공
import { DefaultTheme, DarkTheme } from "@react-navigation/native";
```

**역할**: 네비게이션 요소들(헤더, 탭바, 사이드바 등)의 색상 관리

### 결과: 이중화된 색 체계

- **앱 컴포넌트**: `Colors.ts`의 색상 사용
- **네비게이션 요소**: React Navigation 기본 테마 사용
- **문제**: 서로 다른 색상 팔레트로 인한 UI 불일치

## 해결 방법

Expo와 React Navigation의 테마 충돌을 해결하는 방법은 크게 **두 가지**가 있다. 각각의 장단점을 살펴보고 프로젝트에 맞는 방법을 선택하자.

## 방법 1: React Native Paper 사용 (복잡한 방법)

### 개요

React Native Paper의 테마 시스템을 활용하여 Material Design 3 기반의 통합 테마를 구축하는 방법이다.

### 왜 Paper 방법이 널리 퍼졌는가?

이 방법이 널리 알려진 이유는 다음과 같다:

1. **검색 결과의 편향성**: "expo theme react navigation" 검색 시 Paper 관련 가이드가 상위에 노출
2. **Material Design 3 트렌드**: 2023-2024년 MD3 도입으로 Paper 사용 증가
3. **공식 문서 영향**: React Native Paper 공식 문서에서 Navigation 통합을 강조
4. **유튜브 튜토리얼**: 대부분의 튜토리얼이 Paper 중심으로 제작됨

하지만 실제로는 **Paper를 사용하지 않는 프로젝트에서도 이 방법을 적용**하는 경우가 많아 불필요한 복잡성이 추가되고 있다.

### 단계별 구현

### 1. 필요한 패키지 설치

```bash
npm install react-native-paper deepmerge
```

### 2. Paper + Navigation 테마 통합

```tsx
// constants/theme.ts
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from "react-native-paper";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import merge from "deepmerge";
import { Colors } from "./Colors";

const customDarkTheme = { ...MD3DarkTheme, colors: Colors.dark };
const customLightTheme = { ...MD3LightTheme, colors: Colors.light };

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

export const CombinedLightTheme = merge(LightTheme, customLightTheme);
export const CombinedDarkTheme = merge(DarkTheme, customDarkTheme);
```

### 3. 이중 Provider 구조

```tsx
// app/_layout.tsx
import { PaperProvider } from "react-native-paper";
import { ThemeProvider } from "@react-navigation/native";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? CombinedDarkTheme : CombinedLightTheme;

  return (
    <PaperProvider theme={theme}>
      <ThemeProvider value={theme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </PaperProvider>
  );
}
```

### 장점

- **극도로 단순함**: 추가 패키지 불필요
- **가벼움**: React Navigation 기본 기능만 사용
- **빠른 설정**: 10분 내 완료
- **작은 번들**: 불필요한 라이브러리 없음

### 단점

- Material Design 컴포넌트 직접 구현 필요
- Paper 생태계 혜택 없음

---

## 방법 선택 가이드

### React Native Paper 선택 시점

```tsx
// 이런 경우 Paper 방법 선택
const shouldUsePaper =
  프로젝트가크고복잡함 &&
  MaterialDesign을완벽구현해야함 &&
  Paper컴포넌트를많이사용함 &&
  개발팀이테마복잡도를감당가능함;
```

**적합한 프로젝트:**

- 대규모 엔터프라이즈 앱
- Material Design 가이드라인 엄격 준수 필요
- Paper의 풍부한 컴포넌트 활용
- 복잡한 테마 커스터마이징 요구사항

### 직접 병합 선택 시점

```tsx
// 이런 경우 직접 병합 선택
const shouldUseDirectMerge =
  빠른개발이우선순위 ||
  작은중간규모프로젝트 ||
  최소한의의존성선호 ||
  Paper컴포넌트불필요;
```

**적합한 프로젝트:**

- 스타트업, 개인 프로젝트
- MVP, 프로토타입
- 커스텀 디자인 시스템 구축
- 번들 크기 최적화 중요

---

## 실제 경험담

### Paper 방법을 선택했다가 후회한 경우

```tsx
// 실제 경험: "Paper 쓸 일이 별로 없었는데..."
import { Button } from 'react-native-paper';  // 이것만 씀
// 하지만 3개 패키지 + 복잡한 설정은 그대로...

// 6개월 후 리팩토링하면서...
npm uninstall react-native-paper deepmerge  // 제거
// 결국 직접 병합 방식으로 마이그레이션

```

**커뮤니티 반응**:

- "Paper 설정이 너무 복잡해서 포기했다"
- "Paper 없이도 충분히 해결된다"
- "왜 처음에 Paper를 썼나 후회"

### 검색 결과의 함정

**Google/Stack Overflow 검색 시 나오는 순서**:

1. React Native Paper 가이드 (복잡한 방법)
2. Medium 튜토리얼 (Paper 중심)
3. YouTube 강의 (대부분 Paper 사용)
4. 단순한 해결책 (검색 하위에 위치)

**결과**: 개발자들이 불필요하게 복잡한 방법을 먼저 접하게 됨

### 직접 병합으로 만족한 경우

```tsx
// 단순하고 깔끔
const theme = useTheme();
// 끝. 추가 설정 없이 모든 곳에서 일관된 테마 사용
```

---

- Material Design 3 완벽 지원
- Paper 컴포넌트 사용 시 자동 테마 적용
- 풍부한 UI 컴포넌트 라이브러리

### 단점

- 복잡한 설정 (3개 패키지 필요)
- 이중 Provider 구조로 인한 복잡성
- Paper 미사용 시 오버헤드
- 번들 크기 증가
- **불필요한 경우가 많음**: Paper 컴포넌트를 실제로 사용하지 않는 프로젝트에서도 적용하는 경우 빈번

### Paper 방법을 권장하지 않는 이유

```tsx
//  실제 현실: 이런 코드를 많이 본 적 있을 것이다
import { PaperProvider } from "react-native-paper";
// ... 복잡한 테마 설정

export default function App() {
  return (
    <PaperProvider theme={complexTheme}>
      <ThemeProvider value={complexTheme}>
        {/* 실제로는 Paper 컴포넌트 거의 안 씀 */}
        <MyCustomButton /> {/* Paper Button 아님 */}
        <MyCustomInput /> {/* Paper TextInput 아님 */}
      </ThemeProvider>
    </PaperProvider>
  );
}
```

**결과**: 복잡한 설정은 그대로, Paper의 이점은 활용 안 함

---

## 방법 2: 직접 병합 (권장하는 단순한 방법)

### 개요

React Navigation 테마에 Expo Colors.ts를 직접 병합하여 하나의 통합된 테마 시스템을 만드는 방법이다.

### 단계 1: 테마 통합 파일 생성

```tsx
// constants/theme.ts
import {
  DarkTheme as RNDark,
  DefaultTheme as RNLight,
} from "@react-navigation/native";
import { Colors } from "./Colors";

// Colors.ts와 React Navigation 병합
export const LightTheme = {
  ...RNLight,
  colors: {
    ...RNLight.colors,
    primary: Colors.light.tint,
    background: Colors.light.background,
    card: Colors.light.background,
    text: Colors.light.text,
    border: "#E5E7EB",
    notification: Colors.light.tint,
    // 커스텀 색상 추가
    icon: Colors.light.icon,
    tabIconDefault: Colors.light.tabIconDefault,
    tabIconSelected: Colors.light.tabIconSelected,
  },
};

export const DarkTheme = {
  ...RNDark,
  colors: {
    ...RNDark.colors,
    primary: Colors.dark.tint,
    background: Colors.dark.background,
    card: Colors.dark.background,
    text: Colors.dark.text,
    border: "#374151",
    notification: Colors.dark.tint,
    // 커스텀 색상 추가
    icon: Colors.dark.icon,
    tabIconDefault: Colors.dark.tabIconDefault,
    tabIconSelected: Colors.dark.tabIconSelected,
  },
};
```

### 단계 2: 단일 Provider 적용

```tsx
// app/_layout.tsx
import { useColorScheme } from "react-native";
import { ThemeProvider } from "@react-navigation/native";
import { LightTheme, DarkTheme } from "../constants/theme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : LightTheme;

  return (
    <ThemeProvider value={theme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
```

### 단계 3: 컴포넌트에서 통일된 테마 사용

```tsx
// app/(tabs)/_layout.tsx
import { useTheme } from "@react-navigation/native";

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.tabIconDefault,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
        },
      }}
    >
      {/* 탭 화면들 */}
    </Tabs>
  );
}
```

## 핵심 원리

### Before (문제 상황)

```
앱 컴포넌트 → Colors.ts
네비게이션 → DefaultTheme/DarkTheme (기본값)
결과: 색상 불일치

```

### After (해결 후)

```
모든 컴포넌트 → 통합된 테마
Colors.ts ← 병합 ← React Navigation 테마
결과: 일관된 색상

```

## 장점

## 장점과 결론

### 권장사항: **직접 병합 방법**

대부분의 경우 직접 병합 방법을 권장한다. 이유는 다음과 같다:

### 1. **개발 속도**

- React Navigation 기본 기능만 사용
- 10분 내 설정 완료
- 추가 학습 비용 최소

### 2. **유지보수성**

- `Colors.ts` 수정만으로 전체 테마 변경
- 단일 테마 파일 관리
- 디버깅 용이성

### 3. **성능과 번들**

- 최소한의 의존성
- 작은 번들 크기
- 빠른 앱 시작 시간

## 결론

Expo 템플릿과 React Navigation을 함께 사용할 때 발생하는 테마 충돌은 **두 가지 방법**으로 해결할 수 있다:

1. **React Native Paper 방법**: Material Design이 중요하고 복잡한 UI가 필요한 경우
2. **직접 병합 방법**: 대부분의 프로젝트에 권장하는 단순하고 효과적인 방법

**80% 이상의 프로젝트에서는 직접 병합 방법이 최선의 선택이다.** 단순하고, 빠르고, 유지보수하기 쉽기 때문이다.

핵심은 React Navigation의 테마 시스템을 기반으로 Expo의 `Colors.ts`를 병합하는 것이다. 이렇게 하면 복잡한 라이브러리 없이도 일관되고 깔끔한 테마 시스템을 구축할 수 있다.

## 참고 자료

- [The Ultimate Guide to Custom Theming with React Native Paper, Expo and Expo Router](https://hemanshum.medium.com/the-ultimate-guide-to-custom-theming-with-react-native-paper-expo-and-expo-router-8eba14adcab3) - Paper 방법의 대표적인 가이드
- [React Navigation - Theming](https://reactnavigation.org/docs/themes) - 공식 테마 가이드
- [Expo - Dark Mode](https://docs.expo.dev/develop/user-interface/color-themes/) - Expo 테마 공식 문서

---

**다음 글 예고**: "Expo + React Navigation에서 타입 안전한 테마 시스템 구축하기"
