OAuth 인증 흐름 정리 (with Google OAuth)
===

### 오늘 배운 주제: OAuth 인증 과정
- 클라이언트가 사용자의 구글 계정으로 인증을 진행하고, access token 을 받아 사용자 정보를 요청하는 흐름을 정리함

---

## 용어 정리
- 사용자(User) 
    - 서비스를 사용하려는 일반 사용자
- 클라이언트(Client) 
    - 사용자 인증을 위해 OAuth를 요청하는 서비스 제공자 (ex : my service)
- 서버(server)  
    - OAuth 를 제공하는 서비스 (ex: Google)

---

## 전체 인증 흐름 요약
1. 사용자가 클라이언트 서비스에 접속하고, **구글 로그인** 을 선택함.
2. 클라이언트는 구글 OAuth 인증 페이지로 리다이렉트
3. 사용자는 구글 계정으로 로그인하고, 정보 제공 동의를 완료
4. 인증이 완료되면, 구글은 `code=인증코드` 를 포함한 URL로 클라이언트를 리다이렉트
5. 클라이언트는 `request.nextUrl.searchParams.get('code')`로 인증 코드를 꺼냄
6. 이 인증 코드를 이용해 **access token 요청** 을 위해 구글 서버에 POST 요청을 보냄
7. access token을 발급받으면, 이 토큰을 사용해 구글 API에서 사용자 정보를 받아올 수 있음
8. access token은 유효시간이 짧으므로, 함께 받은 refresh token을 통해 갱신 가능
---

## 🔍 `code`의 의미
- 이 `code`는 "사용자가 로그인했고, 정보 제공도 허락했다." 는 임시 티켓 같은 것
- 사용자 정보가 직접 담긴 건 아니다.
- 이걸 통해 다음 단계인 access token 요청이 가능해진다.

```ts
const code = request.nextUrl.searchParams.get('code');

if(code) {
    // 인증 완료 -> access token 요청 단계로 넘어감
}
```

## 🔐 Access Token 요청 예시 (구글 기준)

```ts
await axios.post('https://oauth2.googleapis.com/token', {
  code,
  client_id: 'YOUR_CLIENT_ID',
  client_secret: 'YOUR_CLIENT_SECRET',
  redirect_uri: 'https://yourapp.com/callback',
  grant_type: 'authorization_code',
}, {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
});
```

## 🔓 응답 예시

```json
{
  "access_token": "ya29...",
  "expires_in": 3599,
  "refresh_token": "1//0g...",
  "scope": "...",
  "token_type": "Bearer"
}
```

- access_token: 사용자 정보 요청에 
- refresh_token: access_token 재발급 시 사용
- expires_in: access token의 만료 시간 (초 단위)


---
## 🔍 사용자 정보 요청 예시
```ts
await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

```

## 느낀 점
- `code` -> `access_token` -> 사용자 정보 요청이라는 3단계만 잘 기억하자
- 보안 강화를 위해 직접 사용자 정보를 주지 않고 중간에 `code` 라는 것을 거친다는 것이 인상깊음