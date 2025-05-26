NextAuth.js란?
===
**Next.js에서 로그인 기능을 쉽게 구현할 수 있게 도와주는 라이브러리** 이다.

구글, 깃허브, 카카오, 네이버 등 **다양한 소셜 로그인** 을 쉽게 붙일 수 있다.
게다가 이메일 로그인이나 비밀번호 없는 로그인도 가능하고, 로그인한 유저정보를 서버와 클라이언트에서 편하게 관리할 수 있도록 도와준다.

## 어떤 원리로 작동해?
1. 소셜 로그인 버튼 클릭
2. 구글/카카오 등에서 로그인 -> 허용하면 서버로 '허락됨'이라는 코드가 옴
3. NextAuth가 그걸 받아서 세션 or JWT 토큰으로 저장
4. 이제 로그인 상태가 유지되고, 어디서든 `useSession()` 으로 로그인 정보를 꺼내 쓸 수 있음

## 📦 기본 사용 흐름 요약 (Page Router 기준)
1. 1. 설치
    
    ```bash
    npm install next-auth
    
    ```
    
2. 2. API 라우트 만들기
    
    파일 위치: `pages/api/auth/[...nextauth].js`
    
    ```jsx
    
    import NextAuth from "next-auth"
    import GithubProvider from "next-auth/providers/github" // 나중에 Kakao로 바꾸면 됨
    
    export const authOptions = {
      providers: [
        GithubProvider({
          clientId: process.env.GITHUB_ID,
          clientSecret: process.env.GITHUB_SECRET,
        }),
      ],
    }
    
    export default NextAuth(authOptions)
    
    ```
    
    👉 이걸로 로그인/로그아웃/callback 등 NextAuth 관련 요청들을 다 처리할 수 있어!
    
3. 3. 세션 공유를 위한 설정
    
    `pages/_app.jsx` 파일에서 아래처럼 감싸줘야 `useSession()` 쓸 수 있어.
    
    ```jsx
    
    import { SessionProvider } from "next-auth/react"
    
    export default function App({ Component, pageProps: { session, ...pageProps } }) {
      return (
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      )
    }
    
    ```
    
4. 4. 로그인 버튼 만들기
    
    ```jsx
    
    import { useSession, signIn, signOut } from "next-auth/react"
    
    export default function LoginBtn() {
      const { data: session } = useSession()
    
      if (session) {
        return (
          <>
            안녕하세요, {session.user.name || session.user.email}님!
            <button onClick={() => signOut()}>로그아웃</button>
          </>
        )
      }
    
      return <button onClick={() => signIn()}>로그인</button>
    }
    
    ```
    

---

## 🔒 보호된 API 라우트 만들기

```jsx

// pages/api/protected.js
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

export default async (req, res) => {
  const session = await getServerSession(req, res, authOptions)

  if (session) {
    res.send({ message: "로그인한 사용자만 볼 수 있는 정보입니다." })
  } else {
    res.status(401).send({ error: "로그인이 필요합니다." })
  }
}

```

---

## ✨ 고급 설정 (선택사항)

### ✅ 콜백 함수로 토큰 조작 가능

```jsx

callbacks: {
  async jwt({ token, account }) {
    if (account) {
      token.accessToken = account.access_token
    }
    return token
  },
  async session({ session, token }) {
    session.accessToken = token.accessToken
    return session
  },
}

```

이렇게 하면 `useSession()`으로 `accessToken`도 꺼낼 수 있어!

---

## 💡 그럼 카카오 로그인은?

GitHub 대신 `KakaoProvider`를 써주면 돼! 공식 문서나 커뮤니티에서 `next-auth/providers/kakao`처럼 제공되는 패키지를 써야 하고, Kakao 개발자 콘솔에서 REST API 키와 Redirect URI도 등록해야 해.

---

## 🧠 핵심 요약 정리

| 기능 | 설명 |
| --- | --- |
| `useSession()` | 로그인 여부와 유저 정보 확인 |
| `signIn()`, `signOut()` | 로그인/로그아웃 실행 |
| `SessionProvider` | 세션 상태 전역 공유 |
| `getServerSession()` | 서버에서 로그인 상태 확인 |
| 콜백 (`callbacks`) | 로그인 후 토큰이나 세션 조작 가능 |