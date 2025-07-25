## JWT (Json Web Token)

> **정보를 비밀리에 전달하거나 인증할 때 주로 사용하는 토큰으로, Json 객체를 이용**

JWT 는 Json Web Token의 약자로 일반적으로 클라이언트와 서버 사이에서 통신할 때 권한을 위해 사용하는 토큰이다. 웹 상에서 정보를 Json 형태로 주고 받기 위해 표준규약에 따라 생성한 암호화된 토큰으로 복잡하고 읽을 수 없는 string 형태로 저장되어 있다.

## JWT의 구성요소

JWT 는 헤더(header), 페이로드(payload), 서명(signature) 세 파트로 나눠져 있으며, 아래와 같은 형태로 구성되어 있다

## 일반 토큰 기반 vs 클레임 토큰 기반

JWT를 사용하는 가장 큰 이유는 클레임(Claim) 토큰 기반 인증이 주는 편리함이 가장 크다고 할 수 있다. 과연 일반 토큰 기반과 클레임 토큰 기반 인증의 차이는 무엇일까?

기존에 주로 사용하던 일반 토큰 기반 인증은 토큰을 검증할 때 필요한 관련 정보들을 서버에 저장해두고 있었기 때문에 항상 DB에 접근해야만 했었다.

또한 session방식 또한 저장소에 저장해두었던 session ID를 찾아와 검증하는 절차를 가져 다소 번거롭게 느껴지곤 했다

하지만 클레임 토큰 기반으로 이루어진 JWT(Json Web Token)는 사용자 인증에 필요한 모든 정보를 토큰 자체에 담고 있기 때문에 별도의 인증 저장소가 필요없다. 분산 마이크로 서비스 환경에서 중앙 집중식 인증 서버와 데이터베이스에 의존하지 않는 쉬운 인증을 제공하여 일반 토큰 기반 인증에 비해 편리하다고 말할 수 있다.
