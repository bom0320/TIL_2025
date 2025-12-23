# GSAP selector/scope 사용 기준 정리

## 1. 문제의 출발

GSAP 애니메이션을 만들 때

- 전역 selector("`.class`") 를 그대로 써도 되는지
- 아니면 scope(`root`기반 selector)를 써야 하는지가 헷갈렸다.
  특히 Header와 Hero에서 **같은 기준을 써야 하나?**라는 고민이 있었다.

## 2. 핵심 결론 요약

> selector를 쓸지, scope를 쓸지는 "브라우저 문제"가 아니라 "내 컴포넌트 구조의 안정성" 문제이다.

## 3. 전역 selector를 써도 괜찮은 경우 (Header)

그 selector가 잡는 DOM이 "이 컴포넌트 안에만" 존재하는 게 확실하고, 동시에 두 개가 생길 일이 없는 구조면 → 전역 selector OK (가독성 우선, 지금 Header의 `.marquee .content` 가 거의 이 케이스)

### 조건

- 해당 selector가 그 컴포넌트 안에만 존재하는 것이 확실
- 동시에 2개 이상 렌더될 가능성이 거의 없는 구조
- UI 구조가 단순하고, 수정/확장이 잦지 않음

### Header가 여기 해당하는 이유

- `<header>`는 항상 1개만 렌더링
- `.marquee`는 Header 전용 UI로 정의됨
- 모바일/PC 분기는 메뉴만 조건부 렌더되고 marquee는 1개
  - 즉, 모바일/pc 분기는 메뉴만 바뀜(마퀴가 두 개 생기는 구조가 아님)
- 전역 selector가 오히려 가독성이 더 좋음

#### 결론

Header에서는 전역 selector 사용 + `gsap.context` 로 수명 관리만 해도 충분

## 4. scope를 고려해야 하는 경우 (Hero)

Hero에서 scope를 권한 이유는 "같은 클래스(`js-hero-title`)"를 또 쓸 것 같아서" 가 아님

### 실제 이유

- Hero는 타이틀, 설명, 캐릭터 등 여러 요소를 동시에 제어
- timeline이 길고, 나중에 scrollTrigger나 분기 애니메이션이 붙을 가능서잉 큼
- 구조 변경, 복붙, 조건부 렌더 등 실수 가능성이 높은 영역

즉,

> Hero는 '지금'보다 '나중에 구조가 바꾸리 가능성'이 높은 섹션
> 이라서, scope(`intro(root)`)를 쓰는 건 보험에 가깝다.

## 5. 중요한 오해 정리

- scope는 "문제가 생길 걸 예측해서 쓰는 것"이 아님 (X)
- scope는 "구조가 복잡해질 가능성이 있는 영역을 덜 취약하게 만드는 선택"
  문제가 언제 생길지는 예측할 수 없고, 그래서 리스크가 높은 영역만 최소 비용으로 방어하는 개념이다.

## 6. 내가 정한 나만의 기준

- 단순 + 고정 UI (Header marquee)
  - 전역 selector OK, 가독성 우선
- 복잡 + 수정이 잦은 UI (Hero timeline)
  - scope 사용 고려 (root 기반 selector)
- 애니메이션 제어 필요 (pause/resume)
  - tween을 ref로 관리 (예외)

### 마치며..

> GSAP scope는 "필수 규칙"이 아니라 구조가 복잡해질 가능성이 있는 곳에만 가는 선택적 안정장치이다.
