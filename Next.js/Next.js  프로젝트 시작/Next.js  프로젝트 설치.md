# Next.js 프로젝트 시작하기

## 1. 프로젝트 생성

Next.js 프로젝트를 생성할 디렉토리로 이동한 뒤, 아래 명령어를 입력한다:

```lua

npx create-next-app@latest .

```

> .을 붙이면 현재 디렉토리에 프로젝트가 생성된다.
> 

### TypeScript 사용 시

TypeScript를 함께 사용하고 싶다면, `--typescript` 옵션을 추가한다:

```lua

npx create-next-app@latest --typescript

```

---

## 2. 프로젝트 실행

생성된 프로젝트에는 `package.json` 파일이 있으며, 기본적으로 다음과 같은 `scripts` 항목이 포함되어 있다:

```json

"scripts": {
  "dev": "next dev",         // 개발 모드 실행
  "build": "next build",     // 프로덕션 모드용 빌드
  "start": "next start",     // 빌드된 결과로 프로덕션 모드 실행
  "lint": "next lint"        // ESLint 실행 (기본 설정 적용)
}

```

개발 서버를 실행하려면 다음 명령어를 입력한다:

```arduino

npm run dev

```

> 기본적으로 http://localhost:3000에서 애플리케이션을 확인할 수 있다.
>