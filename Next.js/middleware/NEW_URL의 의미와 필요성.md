`new URL('/signin', request.url)`의 의미와 필요성
===

### 사용된 코드

```ts
if(!accessToke && isPublic) { 
    return NextResponse.redirect(new URL('/signin', request.url));
}
```

## 핵심 개념: `new URL(path, base)`
- `new URL(path, base)`는 `base` URL을 기준으로 전체 URL(절대 URL)을 생성하는 JavaScript 생성자이다.

예시:
```ts
new URL('/signin', 'https://example.com/my/page')
→ 'https://example.com/signin'
```

## 왜 `new URL()` 을 사용해야 하나?
- `NextResponse.redirect()`는 절대 URL을 인자로 요구한다.
    - 즉, 도메인까지 포함된 전체 주소를 줘야 정상적으로 리다이렉트된다.
    - 단순히 `/signin`만 넘기면 작동하지 않음
- 따라서 사용자가 요청한 `request.url`을 기준으로 우리가 이동시키고 싶은 경로(`/signin`)을 결합하여 전체 URL을 만들어주는 역할이 `new URL()`이다.

### ✅ 전체 흐름 요약

- 사용자가 인증되지 않았고(`!accessToken`), 접근하려는 페이지가 공개 경로가 아니라면(`!isPublic`)
- 우리는 사용자를 로그인 페이지(`/signin`)로 **리다이렉트 시켜야 한다**
- 이때 절대 URL(`https://도메인/signin`)이 필요하므로
- `new URL('/signin', request.url)`을 통해 정확한 **절대 URL을 생성**
- 생성된 URL을 `NextResponse.redirect()`에 넘겨 리다이렉트를 수행한다

---

### 🧠 정리된 한 줄 요약

> new URL('/signin', request.url)은 사용자의 현재 요청을 기준으로 /signin이라는 절대 URL을 만들어 리다이렉트에 사용하기 위한 필수 코드이다.
>