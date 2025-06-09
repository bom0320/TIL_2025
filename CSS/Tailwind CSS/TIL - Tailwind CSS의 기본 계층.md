TIL - Tailwind CSS의 기본 계층
===

### 📁 global.css 설정 시 꼭 들어가는 세 가지 핵심 계층

```css

@tailwind base;
@tailwind components;
@tailwind utilities;

```

---

### ✅ 각 계층의 역할

- **`@tailwind base;`**
    - 브라우저 기본 스타일을 초기화하고, Tailwind의 기본 스타일을 적용함
    - 예: `<h1>`, `<ul>`, `<strong>` 등의 태그에 일관된 기본 스타일 적용
- **`@tailwind components;`**
    - 사용자 정의 컴포넌트 스타일을 정의할 수 있는 영역
    - 예: `.btn-primary`, `.card` 같은 재사용 가능한 클래스들을 직접 정의하여 사용
- **`@tailwind utilities;`**
    - Tailwind의 핵심인 유틸리티 클래스들을 사용할 수 있게 함
    - 예: `text-center`, `bg-red-500`, `mt-4`, `flex` 등

---

### ❗ 빠지면 생기는 문제

| 계층 | 없으면 어떻게 됨? |
| --- | --- |
| `@tailwind base` | 브라우저마다 기본 스타일 다르게 적용되어 디자인 깨질 수 있음 |
| `@tailwind components` | 내가 만든 컴포넌트 클래스들이 작동하지 않음 |
| `@tailwind utilities` | Tailwind 유틸리티 클래스들(`text-center`, `bg-*`, `flex` 등)이 전부 작동 안 함 |

---

### 💡 결론

- 이 세 가지 계층은 Tailwind 프로젝트에서 **거의 필수 요소**
- 특히 `utilities`는 Tailwind의 정체성과도 같기 때문에 빠지면 안 됨
- **global.css에서 항상 세 줄 모두 작성하는 습관을 들이자!**