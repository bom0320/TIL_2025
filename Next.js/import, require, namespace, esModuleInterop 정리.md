import, require, namespace, esModuleInterop 정리
===

### 1. 📦 `export default`와 `named export`의 차이

| 구분 | 설명 | 예시 |
| --- | --- | --- |
| `export default` | 하나의 기본 값을 export | `export default React` |
| `named export` | 여러 개의 이름 있는 값 export | `export const useState = ...` |
| `import default` | 이름은 자유롭게 설정 가능 | `import React from 'react'` |
| `import named` | 이름 정확히 맞춰서 가져와야 함 | `import { useState } from 'react'` |

---

### 2. 🧠 namespace 형태란?

- 여러 named export를 **하나의 객체로 묶어서 가져오는 것**
- `import * as React from 'react'` 와 같이 작성
- 그러면 `React.useState`, `React.createElement`처럼 사용할 수 있음
- 즉, `React`는 단순한 이름이 아니라 여러 export를 포함한 **“이름공간(namespace)” 객체**

### 예시:

```tsx

// react 모듈에서
export const useState = ...
export const useEffect = ...

// 가져올 때
import * as React from 'react';

React.useState(); // 가능

```

---

### 3. 🧨 문제 상황: CommonJS 모듈을 import로 가져올 때 생기는 오류

- `CommonJS` 모듈은 기본적으로 `module.exports = React`처럼 default export가 없음
- 그런데 `import React from 'react'` 같이 **ES6 방식의 import**를 쓰면 에러 발생
- 해결책은 `require('react')` 또는 `import * as React from 'react'`

---

### 4. 🔧 TypeScript의 `esModuleInterop` 옵션

- `tsconfig.json`에 설정하는 컴파일러 옵션
- `CommonJS` 모듈을 ES6 방식의 import 구문으로 불러올 수 있도록 도와줌

### 설정 방법:

```json
{
  "compilerOptions": {
    "esModuleInterop": true}
}

```

### 작동 방식:

- 내부적으로는 `require('module').default || require('module')` 형태로 처리
- 그래서 `import React from 'react'`가 가능해짐

---

### 5. 💬 요약

| 내용 | 요점 |
| --- | --- |
| `namespace import` | `import * as React from 'react'` 형태로 여러 export를 하나의 객체로 묶어 가져오는 방식 |
| `default export 없음 문제` | React 18 이후 default export가 없기 때문에 `import React from 'react'`는 에러가 남 |
| `esModuleInterop` 역할 | CommonJS 모듈을 ESModules처럼 `import React from 'react'` 형태로 사용할 수 있게 해줌 |
| 설정 위치 | `tsconfig.json`의 `"compilerOptions"` 안에 `"esModuleInterop": true` 추가 |