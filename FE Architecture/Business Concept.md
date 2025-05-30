Business Concept이란
===

### 비즈니스 개념(Business Concept)이란?
> **"그 서비스나 제품이 실제로 다루고 있는 핵심 개념"** 을 한다.

즉, **앱이나 서비스가 해결하려는 현실 세계의 대상이나 개념을** 코드로 표현한 것

---

### 📌 예시 1: 블로그 서비스라면

| 비즈니스 개념 | 설명 |
| --- | --- |
| `User` | 글 쓰는 사람 (회원) |
| `Post` | 글 (게시물) |
| `Comment` | 댓글 |
| `Tag` | 게시글에 붙이는 태그 |

→ 이 모든 것들이 **비즈니스 개념**, 즉 `entities`가 되는 것이다.

---

### 📌 예시 2: 너희 프로젝트가 "개발자 미션 추천 서비스"라면

| 비즈니스 개념 (Entities) | 설명 |
| --- | --- |
| `User` | 개발자 사용자 |
| `Mission` | 오늘의 미션 |
| `Stage` | 성장 단계 |
| `Ranking` | 랭킹 시스템 |
| `Team` | 팀 또는 그룹 활동 |
| `MiniGame` | 보상형 퀴즈 게임 |

---

## 💡 포인트는?
비즈니스 개념은 아래와 같은 특징이 있다. 

1. 앱이 중심적으로 다루는 대상이다.
2. 대부분은 **데이터 구조(모델)**를 가지고 있다.
3. 대부분 CRUD(Create, Read, Update, Delete)같은 기본 행동이 있다.

---

## 정리 요약

| 구분 | 비즈니스 개념인가? | 이유 |
| --- | --- | --- |
| `User` | ✅ YES | 앱에 로그인하고 활동하는 사람 |
| `Post` | ✅ YES | 유저가 작성하는 글 |
| `LoginForm` | ❌ NO | 기능이나 화면 구성 요소일 뿐, 현실 대상은 아님 |
| `useFetchUser` | ❌ NO | 단지 도구(훅), 핵심 개념 아님 |

---

## 결국

### 비즈니스 개념 = 앱이 다루는 실제 세계의 대상들
이걸 코드로 표현한 폴더가 `entities`이다.

