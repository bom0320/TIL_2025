## **Feature-Sliced Design (FSD)란?**

**기능 단위로 애플리케이션을 나누는 설계 방식.**

- 폴더 구조를 **기능 중심**으로 정리하여 **확장성**, **재사용성**, **유지보수성**을 높이기 위한 설계 철학.

---

## 📁 기본 폴더 구조 (3단계 계층)

```css

src/
├── app/
├── pages/
├── widgets/
├── features/
├── entities/
└── shared/

```

- **FSD는 최대 3단계 depth 구조**로 유지함: `Layer → Slice → Segment`

---

## 1️⃣ **Layers (레이어)**

FSD의 최상위 디렉토리. **책임과 역할에 따라 나눔**.

하위 계층은 상위 계층에서 사용할 수 있지만, **상위 계층은 하위 계층 의존 불가** (의존성 규칙 존재).

| Layer | 설명 |
| --- | --- |
| `app/` | 앱 초기화, provider, router, 전역 스타일 등 |
| `pages/` | 실제 라우트 단위의 페이지들 |
| `widgets/` | 페이지 안의 독립적 UI 조합 (페이지 조각들) |
| `features/` | 사용자 중심의 기능 단위 (예: 로그인, 좋아요 등) |
| `entities/` | 핵심 도메인 모델 (예: User, Article 등) |
| `shared/` | 재사용 가능한 유틸, UI, 타입, API, 설정 등 |

---

## 2️⃣ **Slices (슬라이스)**

각 layer 안에서 **기능별로 나눈 하위 디렉토리,** 

**Slices의 이름은 정해져있지 않으며, 프로젝트내에서 그 목적에 따라 설정된다.**

- 예: `features/login`, `entities/user`, `widgets/profileCard`
- **모든 Slice는 그 기능의 진입점이 되는 공개 API를 포함해야한다.**
    - 즉, 각 slices의 내부 코드가 외부에서 직접적으로 참조될 수 없으며, 해당 slices의 기능을 사용하기 위해서는 반드시 공개 API를 통해서만 접근할 수 있도록 설계되어야한다.
- → 모듈 간 결합도 낮추고 유지보수성 향상

---

## 3️⃣ **Segments (세그먼트)**

각 slice 내부의 **세부적인 구성요소들** (역할에 따라 구분)

기능에 따라 필요한 코드가 다르겠지만, 보통 ㄷ음과 같은 코드들이 위치한다.

| Segment | 설명 |
| --- | --- |
| `api/` | 서버 통신 관련 코드 |
| `UI/` | UI 컴포넌트 |
| `model/` | 상태관리, 로직, store 등 |
| `lib/` | 유틸 함수 |
| `config/` | 설정값 |
| `consts/` | 상수값 |

> 참고: app/과 shared/는 slices 없이 바로 segments로 들어감
> 

---

## 📌 정리 요약

- **기능 중심 구조 → 유지보수와 확장에 유리**
- **명확한 의존성 규칙** → 상위 계층이 하위 계층에 의존하지 않도록 설계
- **slice 내부는 캡슐화 → 공개 API로만 접근**

---

**언제 쓰면 좋을까?**

- 규모가 커질 앱
- 기능 단위로 나누고 싶은 팀
- 도메인 중심 설계를 하고 싶은 경우
- 유지보수와 협업이 중요한 프로젝트