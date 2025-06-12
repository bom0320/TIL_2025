ESLint & Prettier 설정 파일 차이
===

## 1. ESLint 설정 파일 차이

| 구분 | `.eslintrc.json` | `eslint.config.ts` |
| --- | --- | --- |
| 형식 | JSON | TypeScript |
| 방식 | **기존 방식** (ESLint v8 이하) | **신규 방식** (Flat Config, ESLint v9 이상) |
| 구조 | `env`, `extends`, `rules`, `parser` 등 | `defineConfig()`로 모듈형 export |
| 유연성 | 정적 구조 (조건문 불가) | 동적 설정 가능 (조건문, 함수 등 가능) |
| 타입 지원 | 없음 | 있음 (defineConfig 사용 시 타입 추론 가능) |

### Flat Config 예시 (`eslint.config.ts`)

```tsx

import { defineConfig } from 'eslint-define-config';

export default defineConfig({
  files: ['src/**/*.ts'],
  languageOptions: {
    parser: require('@typescript-eslint/parser'),
  },
  rules: {
    semi: ['error', 'always'],
  },
});

```

---

## 2. Prettier 설정 파일 차이

| 구분 | `.prettierrc` / `.prettierrc.json` | `prettier.config.ts` |
| --- | --- | --- |
| 형식 | JSON 또는 YAML | TypeScript |
| 유연성 | 정적 설정만 가능 | 동적 설정 가능 (변수, 조건문 등 사용 가능) |
| 타입 지원 | 없음 | 있음 (defineConfig 사용 시) |
| 자동 인식 | 지원됨 | 지원됨 (파일명이 `prettier.config.ts`이면 자동 감지) |

### 기본 설정 예시 (`.prettierrc`)

```json

{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2
}

```

### TypeScript 설정 예시 (`prettier.config.ts`)

```tsx

import { defineConfig } from 'prettier';

export default defineConfig({
  semi: false,
  singleQuote: true,
  tabWidth: 2,
});

```

---

## 3. `defineConfig`란?

### → 설정 파일의 **타입 지원을 돕기 위해 사용하는 함수**

- 설정 파일이 TypeScript일 때 (`eslint.config.ts`, `prettier.config.ts` 등), TypeScript가 **자동으로 타입을 추론하고 오류를 방지**할 수 있도록 도와줌.
- 결국 `defineConfig`는 **객체를 반환하는 함수**일 뿐이지만, 해당 객체가 어떤 구조를 따라야 하는지 타입 정보를 제공함.

---

### ✨ `defineConfig` 없는 버전 예시

```tsx

export default {
  semi: false,
  singleQuote: true,
};

```

- 이렇게 해도 Prettier나 ESLint는 잘 작동함.
- 그러나 **TypeScript에서는 `semi`, `singleQuote`가 정확한 키인지 확인할 수 없음** → 오타가 있어도 감지 안 됨.

---

### `defineConfig` 사용 버전 예시

```tsx

import { defineConfig } from 'prettier';

export default defineConfig({
  semi: false,
  singleQuote: true,
});

```

- TypeScript가:
    - `semi`, `singleQuote`가 Prettier에서 지원하는 키인지 **정확히 체크**해줌
    - 오타나 잘못된 설정을 **사전에 방지**할 수 있음
    - **자동완성** 기능 제공

---

### 🔍 어떤 패키지에서 제공함?

| 도구 | 제공 패키지 |
| --- | --- |
| Prettier | `import { defineConfig } from 'prettier'` |
| ESLint | `import { defineConfig } from 'eslint-define-config'`(※ ESLint 자체는 제공하지 않으며 외부 패키지 필요) |

---

## 📌 총정리 요약

| 항목 | 전통 방식 (`.json`, `.rc`) | 새로운 방식 (`.config.ts`) |
| --- | --- | --- |
| 유연성 | 낮음 (정적 설정만 가능) | 높음 (조건문, 동적 설정 가능) |
| 타입 지원 | ❌ 없음 | ✅ 있음 (`defineConfig` 사용 시) |
| 추천 상황 | 빠르게 구성할 작은 프로젝트 | 유지보수가 필요한 중/대형 프로젝트 또는 Monorepo |
