middleware.ts에서 공개경로가 필요한 이유
===

## 공개 경로(publicPaths)란?
> 로그인하지 않은 사용자고 접근할 수 있도록 허용한 경로

ex: `/signin`, `/signup`, `/callback` 등..


# 왜 공개 경로가 필요하냐면?

### 1. 로그인 안 한 유저도 볼 수 있어야 하니까
- `middleware.ts` 는 기본적으로 **"로그인을 안했으면 막자"는 로직**
- 그런데 로그인 페이지(`/signin`)까지 막아버리면 로그인 자체를 못 하게 됨
- 그래서 특정 경로는 예외로 허용해줘야 함

```ts
if (!accessToken && !isPublicPath) {
    return redirect(`/signin`);
}
```
- `isPublicPath` 조건이 없으면 `/signin` 도 막히는 문제가 생김

---

### 2. OAuth 콜백처럼 로그인 과정 중 필요한 경로를 열어줘야 하니까
- 예: Google OAuth 로그인 -> `/callback?code=...`
- 그래서 `/callback` 도 보통 공개 경로로 지정한다.
- 이걸 막으면 "로그인 안 했으니 회원가입도 못해요" 같은 이상한 UX가 생김

## ✅ 실무 기준으로 보면

| 페이지 | 로그인 필요 여부 | 공개 경로에 포함? |
| --- | --- | --- |
| `/signin` | ❌ 로그인 전 접근 | ✅ 포함해야 함 |
| `/signup` | ❌ 회원가입 | ✅ 포함해야 함 |
| `/callback` | ❌ OAuth 인증용 | ✅ 포함해야 함 |
| `/stage` | ✅ 로그인 후 메인 | ❌ 보호 경로 |
| `/my` | ✅ 마이페이지 | ❌ 보호 경로 |

## 그래서 공개 경로는 "예외 처리"의 기준이 되는 것이다.

```ts
const publicPaths = [`/signin`, `/signup`, `/callback`];
const isPublicPath = publicPaths.includes(pathname);

if (!accessToken && !isPublicPath) {
    return redirect(`/signin`);
}
```
이렇게 하면:
- ✅ /signin은 로그인 없이도 접속 가능
- ❌ /my는 로그인 안 하면 강제 리디렉트됨


## 🔑 요약하면:
공개 경로는 로그인 없이 접근 가능해야 하는 예외 경로를 지정하는 필터!
로그인 검사 로직에서 "이 경로는 검사하지 마" 라고 알려주는 역할을 함.
