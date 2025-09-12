# useColorScheme 이란?

요즘은 다크모드가 기본임

React Native 에선 이를 위한 훌륭한 API, useColorScheme() 을 제공한다.

```tsx
import { useColorScheme } from "react-native";
```

- **현재 시스템 테마(Light/Dark) 를 감지** 하는 Hook
- 반환값은 light 또는 dark
- 매 렌더링 마다 자동으로 업데이트 됨
