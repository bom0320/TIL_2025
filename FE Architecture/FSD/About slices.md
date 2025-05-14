About_Slices
===

### 한 줄 정의

> **slice란 하나의 도메인 또는 기능 단위의 묶음이며, 특정 layer 내부에서 논리적 단위로 분할한 폴더이다.**

## FSD 전체 구조 복습
FSD 구조는 아래처럼 3단계로 구성되어 있다.

```
Layer -> slice -> segment
```
- `Layer` : app, pages, widgets, features, entities, shared
- `Slice` : 기능/도메인 단위 (ex: user, login, post..)
- `Segment` : 실제 파일이 들어 있는 하위 디렉토리 (ui, model, api..)


## 그럼 "Slice"는 뭐지??
### "하나의 기능/도메인 단위로 코드를 묶은 것"

ex)
```
features/
└── login/         ← ← 이 전체 폴더 하나가 'slice'
    ├── ui/
    ├── model/
    └── api/
```
즉, login,comment, signup, ranking, user, post 이런것들이 전부 slice가 될 수 있음

## slices의 특징 3가지 (중요!!!)

### 1. 기능 단위로 분리
- 하나의 slice 는 하나의 도메인이나 하나의 사용자 시나리오(예: 로그인, 댓글쓰기)를 의미
- 내부적으로 `model`, `ui`, `lib`, `api` 같은 segment들로 구성됨

### 2. 공개 API 만을 통해 사용해야 함
- 각 slice의 내부 코드는 외부에서 직접 접근하면 안 됨
- 대신 slice의 index.ts에서 공식적으로 export된 API만 사용하게 해야한다.

ex)

```ts
// ❌ 이렇게 사용하면 안 됨 (내부 파일 직접 접근)
import LoginForm from '@/features/login/ui/LoginForm';

// ✅ 이렇게 사용해야 함 (index.ts 통해서)
import { LoginForm } from '@/features/login';
```
- 이렇게 나중에 내부 폴더 구조가 바뀌어도 외부 코드는 안 바꿔도 됨
- 즉, 캡슐화가 되어 있어서 유지보수가 쉬워짐 

### 3. 결합도 낮추기/ 변경 영향 최소화
- 각 slice는 독립적으로 동작하도록 설계되어야 함
- 한 slice가 바뀌어도 다른 slice에 영향이 최소화됨
- 이는 팀 작업 시 안정성을 크게 높여줌

## 🧱 그럼 어떤 구조로 구성되냐?

### 예시 – 하나의 slice 구성

```
features/
└── login/              ← slice
    ├── ui/             ← segment
    ├── model/          ← segment
    ├── api/            ← segment
    └── index.ts        ← 공개 API (entry point)
```

## 🚫 예외: `app/`과 `shared/`는 slice가 없다
- `app/`은 앱 초기 설정만 담당 (router, layout 등)
- `shared/`는 slice처럼 도메인을 나타내지 않음. 대신 공통 도구를 모은 layer라 segment만 가짐

## ✅ 요약 정리

| 구분 | 설명 |
| --- | --- |
| slice | 하나의 도메인 또는 기능 단위 (예: login, user, post) |
| 목적 | 코드 재사용성, 결합도 낮추기, 캡슐화 |
| 사용법 | 내부 직접 접근 ❌, 반드시 `index.ts` 통한 API 공개 ✅ |
| 예외 | `app`, `shared`는 slice 없이 segment만 가짐 |

---

## ✨ 쉽게 기억하기

> 🔸 “slice는 독립적인 기능 묶음”
> 
> 
> 🔸 “index.ts를 통해서만 접근해야 한다”
> 
> 🔸 “app/shared는 slice가 없다”
>