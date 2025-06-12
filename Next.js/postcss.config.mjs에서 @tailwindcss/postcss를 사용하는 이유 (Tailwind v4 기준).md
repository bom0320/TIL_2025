postcss.config.mjs에서 @tailwindcss/postcss를 사용하는 이유 (Tailwind v4 기준)
===

## Issue
`npx create-next-app`로 프로젝트를 만들면서 Tailwind CSS를 선택했더니, `postcss.config.mjs`가 자동으로 생성되었고, 그 안에는 다음과 같은 설정이 있었음

```js
const config = {
  plugins: ["@tailwindcss/postcss"],
};

export default config;
```
그런데 기존에 공식 문서나 블로그에서 봤던 예제들은 대부분 이랬다:

```js
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
```
내가 봤던 예제와, 자동으로 생성된 설정의 코드가 달라 혼란이 생겼고, 
챗 gpt 도 처음엔 @tailwindcss/postcss 방식이 잘못됐다라는 식으로 설명을 해서 더 헷갈리기 시작했다.

하지만 CNA에서 자동으로 생성되는 설정이 문제 있는 방식이라면 이미 이슈가 터졌을 테고,
공식에서 사용하는 템플릿이 틀릴 리가 없지 않은가?


그래서 더 챗gpt에 의존하지 않고 구글링을 더 해보기로 했다.

## 최신 Tailwind v4 및 Next.js의 변화

### Tailwind CSS v4.1 이상 공식 문서에서 명시한 방식:

```js
export default {
    plugins: {
        "tailwindcss/postcss": {}.
    }
}

```
Tailwind CSs v4부터는 새로운 공식 PostCSS 플러그인인 `@tailwindcss/postcss`를 사용하도록 설정 방식이 바뀌었다.
- 기존(v3): `tailwindcss`,`autoprefixer`를 직접 설정
- 변경(v4): `@tailwindcss/postcss` 하나로 통합 (내부적으로 처리)

> 이 플러그인은 Tailwind 설정, 변환, 최적화 과정을 모두 담당한다.
>

## Next.js의 최신 템플릿
Next.js v15.2 이상에서 Tailwind를 포함해 생성한 프로젝트는 다음 설정을 자동으로 생성한다.

```bash
npx create-next-app my-app --tailwind
```
- `postcss.config.mjs` 파일 생성
- 내부에는 `"@tailwindcss/postcss"` 플러그인이 문자열로 등록됨
- 이는 Tailwind v4.1 기준의 공식 설정이다



하지만 Tailwind CSS 공식 문서에는 여전히 다음과 같은 예제가 많이 등장한다:

```js
plugins: {
  tailwindcss: {},
  autoprefixer: {},
}
```
하지만 이건 **Tailwind CSS v3 이하** 의 설정 방식이며, v4부터는 더 이상 권장되지 않는다.

## 요약 비교

| 항목 | Tailwind v3 이하 | Tailwind v4.0 | Tailwind v4.1 이상 |
| --- | --- | --- | --- |
| PostCSS 설정 방식 | `tailwindcss: {}` | 가능하지만 권장 안 함 | ✅ `@tailwindcss/postcss` |
| 설정 방식 | 직접 명시 | 중간 과도기 | 공식 통합 방식 |
| Next.js 템플릿 | 수동 설정 | 일부 혼재 | 자동으로 `@tailwindcss/postcss` 생성됨 |

## 내가 얻은 인사이트
- Tailwind CSS는 **v4.1부터 설정 구조가 확실히 바뀌었고**, 이에 따라 문서도 공식적으로 업데이트되었다.
- 공식 문서만이 절대적인 기준이다. 오래된 블로그, GPT 답변, 커뮤니티 포스트는 참고하되 반드시 **버전 기준 확인이 필수**다.
- `create-next-app`으로 Tailwind를 선택한 경우, `@tailwindcss/postcss`가 자동으로 설정되는 건 **정확하고 공식적인 동작**이다.

