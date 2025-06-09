 TIL - Tailwind CSS v4에서 npx tailwindcss init -p 명령어가 작동하지 않는 이유와 해결 과정
===

### 🐛 문제 상황

Tailwind를 CLI로 설치할 때 다음 명령어를 입력했다:

```bash

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

```

그런데 `npx tailwindcss init -p` 명령어에서 다음과 같은 에러가 발생함:

```

npm ERR! could not determine executable to run

```

또한, `node_modules/.bin/tailwindcss`가 존재하지 않음.

---

### 📌 원인 분석

이 문제는 **Tailwind CSS v4부터 공식적으로 CLI 기반 init 명령어를 제거했기 때문**이다.

### 🚨 Tailwind CSS v3 vs v4 차이

| 항목 | Tailwind v3 | Tailwind v4 |
| --- | --- | --- |
| `npx tailwindcss init` | ✅ 지원됨 (자동으로 설정 파일 생성) | ❌ 제거됨 (수동 작성 필요) |
| 설정 파일 생성 | CLI로 자동 생성 | 사용자가 직접 파일 생성 |
| `autoprefixer` 필요 | 필요함 | ❌ 내장된 Lightning CSS가 처리함 |
| content 설정 방식 | 직접 명시해야 함 (`tailwind.config.js`) | 자동 감지 또는 명시 (선택 사항) |

---

### 🔧 해결 방법 (Tailwind CSS v4 기준)

### 1. 필요한 패키지 수동 설치

```bash

npm install -D tailwindcss postcss autoprefixer

```

> 참고: 사실 v4에서는 autoprefixer, postcss는 없어도 동작은 가능. Vite처럼 특정 빌드 툴을 쓰는 경우엔 더 단순화됨.
> 

### 2. 설정 파일을 **직접 작성**

- `tailwind.config.js` 예시:

```jsx

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

```

- `postcss.config.js` 예시:

```jsx

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

```

### 3. 글로벌 CSS 파일 설정 (`globals.css` 등)

```css

@tailwind base;
@tailwind components;
@tailwind utilities;

```

---

### 💡 결론 및 배운 점

- Tailwind v4부터는 더 이상 `npx tailwindcss init` 명령어를 사용할 수 없다.
- 대신 **설정 파일을 직접 작성하는 방식으로 변경**되었으며, 이는 불편해 보이지만 더 유연한 커스터마이징을 위한 구조이다.
- 문서와 커뮤니티 블로그에서 보던 예전 설치법을 그대로 따라하면 위와 같은 오류가 생기므로, **버전에 맞는 공식 문서를 참고하는 습관이 중요하다.**

### 💬 참고 링크

https://tailwindcss.com/docs/installation/framework-guides/nextjs