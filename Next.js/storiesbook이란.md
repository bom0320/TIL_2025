storiesBook이란
===

### **Storybook이란?**

> UI 컴포넌트를 페이지와 분리해서 독립적으로 개발하고 시각적으로 확인할 수 있는 툴이다.
> 

---

### 🧩 **주요 특징**

| 기능 | 설명 |
| --- | --- |
| **컴포넌트 단위 개발** | 버튼, 카드, 모달 같은 컴포넌트를 페이지와 분리해서 각각 개발 가능 |
| **시각적 테스트** | 브라우저에서 실제 컴포넌트 상태를 여러 조합으로 테스트 가능 |
| **문서화** | 컴포넌트의 사용법과 다양한 상태(variant)를 문서처럼 정리 가능 |
| **디자인 시스템 구축** | 일관된 UI를 만들기 위한 라이브러리 제작에 유용 |

---

### 🛠️ **예시**

```tsx

// Button.stories.tsx
import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
};

export const Primary = () => <Button variant="primary">Primary</Button>;
export const Disabled = () => <Button disabled>Disabled</Button>;

```

이렇게 하면 버튼 컴포넌트를 다양한 상태로 테스트하고 확인할 수 있어.

---

### 🎯 언제 쓰면 좋을까?

- 여러 명이 컴포넌트를 나눠서 개발할 때
- 디자이너와 협업하며 UI 조율할 때
- 디자인 시스템 구축할 때