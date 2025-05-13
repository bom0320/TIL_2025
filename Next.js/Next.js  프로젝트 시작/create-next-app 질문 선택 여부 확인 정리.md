create-next-app 질문 선택 여부 확인 정리
===


| 질문 | 확인 방법 | 확인 기준 |
| --- | --- | --- |
| ✔ **Would you like to use TypeScript?** | 프로젝트에 `tsconfig.json`이 있는지 확인 | 있으면 TypeScript 사용 (`.ts`, `.tsx` 파일도 같이 사용됨) |
| ✔ **Would you like to use ESLint?** | `package.json`의 `devDependencies`에 `eslint`가 있는지 확인 | 있으면 ESLint 사용 중 |
| ✔ **Would you like to use Tailwind CSS?** | `package.json`에 `tailwindcss`, `postcss`, `autoprefixer`가 있는지 확인 | 이 3개가 있으면 Tailwind 사용 중 |
| ✔ **Would you like your code inside a `src/` directory?** | 프로젝트 루트에 `src/` 폴더가 있는지 확인 | 있으면 `src/` 구조 선택함 |
| ✔ **Would you like to use App Router?** | `src/` 또는 루트에 `app/` 폴더가 있는지 확인 | 있으면 App Router 사용 (없고 `pages/`만 있으면 전통 방식) |
| ✔ **Would you like to use Turbopack for `next dev`?** | `npm run dev` 실행 시 터미널 로그 확인 | `✔ Using Turbopack`이 뜨면 사용, 아니면 Webpack 사용 중 |
| ✔ **Would you like to customize the import alias?** | `tsconfig.json`(또는 `jsconfig.json`) 확인 | `"paths"` 항목에 `"@/*": ["src/*"]` 있으면 alias 설정한 것 |
| ✔ **What import alias would you like configured?** | 위 `"paths"` 설정을 보면 어떤 alias인지 알 수 있음 | 기본은 `"@/*"`이지만 직접 수정했을 수도 있음 |