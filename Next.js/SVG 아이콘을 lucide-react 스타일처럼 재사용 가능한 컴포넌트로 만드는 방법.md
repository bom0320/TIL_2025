SVG 아이콘을 lucide-react 스타일처럼 재사용 가능한 컴포넌트로 만드는 방법
===

### ✅ 오늘 배운 핵심

React에서 SVG 아이콘을 재사용 가능한 방식으로 만들려면 `lucide-react`처럼 **props를 활용하는 구조로 만들면 좋다.**

---

### 🔸 기존 하드코딩 방식의 한계

```tsx

const MyIcon = () => (
  <svg width="24" height="24" fill="black">
    <circle cx="12" cy="12" r="10" />
  </svg>
)

```

- 이 방식은 **크기와 색상이 고정**되어 있어 **재사용성이 떨어짐**
- 다른 곳에서 크기나 색을 바꾸려면 컴포넌트를 복사해서 수정해야 하는 비효율 발생

---

### 🔹 lucide-react 스타일로 재작성한 예시

```tsx

import { type SVGProps } from "react"

const MyIcon = (props: SVGProps<SVGSVGElement>) => (
  <svgviewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
  </svg>
)

```

### ✅ 장점

- `className`, `size`, `color`, `strokeWidth` 등 자유롭게 커스터마이징 가능
- `currentColor`를 쓰면 부모 텍스트 컬러를 따라가서 Tailwind 등과 잘 연동됨

예시 사용:

```tsx

<MyIcon className="w-6 h-6 text-red-500" />

```

---

### 🔸 기본값을 주고 싶을 때

```tsx

const MyIcon = ({ width = 24, height = 24, ...props }: SVGProps<SVGSVGElement>) => (
  <svg width={width} height={height} {...props}>
    ...
  </svg>
)

```

- 크기 기본값을 지정하면서도 유연하게 덮어쓸 수 있음

---

### 🎯 요약 정리

| 방식 | 설명 |
| --- | --- |
| ✅ 하드코딩 방식 | 고정된 사이즈/색상으로 유연하지 않음 |
| ✅ props 구조 | `className`, `color`, `onClick` 등 유연하게 전달 가능 |
| ✅ lucide-react 스타일 | 모든 SVG 아이콘을 재사용 가능한 컴포넌트로 만들 수 있음 |

---

### ✨ 느낀점

그동안 SVG를 그냥 복붙해서 고정된 스타일로 썼었는데, 오늘 배운 방식처럼 `props`를 통해 외부에서 커스터마이징할 수 있도록 만들면 훨씬 유연하고 유지보수가 쉬워진다.

특히 `lucide-react`가 왜 그런 구조로 아이콘을 제공하는지 완전히 이해하게 되었다. 앞으로는 내가 직접 만든 SVG도 다 이런 식으로 포장해서 써야겠다