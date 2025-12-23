# GSAP (GreenSock Animation Platform)

[GSAP 공식 사이트](https://gsap.com/?utm_source=chatgpt.com)

## GSAP 란?

GSAP은 웹에서 거의 모든 것은 부드럽게 애니메이션화 할 수 있는 전문 JS 애니메이션 라이브러리이다.

> 슬로건은 **"Animate Anything"** (무엇이든 애니메이션으로 만들어라) 이다.

즉, GSAP(GreenSock Animation Platform)은 웹에서 DOM/CSS/SVG/Canvas/WebGL 같은걸 아주 부드럽게 움직이게 해주는 자바스크립트 애니메이션 엔진이다.

### 왜 쓸까?

- CSS만으로는 복잡한 시퀸스 제어(여러 요소를 정확한 타이밍으로 이어 붙이기), 재생/일시정지. 역재생, 스크롤 연동 같은 걸 매끄럽게 하기가 어렵다.
- GSAP은 이걸 코드로 유연하게 제어하게 해준다.

### 강점

- 초당 프레임 관리가 뛰어나 **매우 부드러움**
- Timeline 개념으로 복잡한 애니메이션을 한 흐름으로 묶어 관리
- 플러그인(ScrollTrigger, Flip 등)로 스크롤/레이아웃 전환/드래그 등 고급 인터랙션 쉽게 구현
- API 가 직관적이고 문서/예제가 풍부함

> 참고:
>
> GSAP은 웹 전용이다. React Native 앱에는 직접 못 쓰고, 웹(Next.js/React/일반 웹)에 쓰면 좋다.

## 언제 GSAP 을 쓸까?

1. **페이지 전환/영역 등장/카드 쌓기** 처럼 순서가 있는 애니메이션
2. 스크롤 위치에 맞춰 패럴랙스/리빌(reveal) 효과
3. 리스트 재정렬 시 레이아웃이 자연스럽게 바뀌는 전환 (Flip)
4. SVG(로고, 아이콘) 애니메이션
5. 정밀 제어가 필요한 경우 (재생/정지/역재생/특정 초로 점프)

> Tailwind로 "기본 스타일", GSAP로 "움직임"을 맡기는 조합이 유지보수에 좋다.

## 핵심 개념 3가지

[Ease types | GSAP Resources](https://gsap.com/resources/getting-started/Easing/?utm_source=chatgpt.com)

### 1. Tween

- 하나의 동작
- "현재 상태 -> 목표 상태"로 속성을 변화시킴
- **비유 :** 한 장면의 움직임

```js
gsap.to(...),
gsap.from(...)
```

> **`gsap.to("타겟", {속성: 속성값, ...})`**
>
> - 타겟(targets) : 애니메이션을 적용할 개체를 선택
> - 속성(values) : 애니메이션과 관련된 속성을 설정

### 2. Timeline

- 여러 Tween을 시간 축에 순서대로(또는 겹치게)배치하는 컨테이너
- **비유 :** 장면들의 연결(시퀸스)

```js
const tl = gsap.timeline();
```

### 3. Easing

- 움직임의 가속도/감속도(속도 곡선)
- **비유 :** 움직임의 성격 (감정선)

```js
ease: "power2.out";
```

즉, Tween = 단위 동작, Timeline = 동작의 연결, Easing = 움직임의 질감 이 세가지를 알면 GSAP의 나머지 메서드가 맥락 있게 이해된다.

## 기본 메서드

아래는 GSAP에서 가장 자주 쓰이는 핵심 메서드/속성들이다. (이걸 중심으로 실무 대부분을 커버할 수 있다.)

### gsap.to()

움직임이 **끝나는 점**을 저장하는 애니메이션이다.

```js
// x축으로 300 이동하는데 2초가 걸린다+딜레이 5초
gsap.to(".box-1", { x: 300, duration: 2 }, 5);
```

> `gsap.to("타겟", {속성: 속성값. ...});`
>
> - 타겟(targets) : 애니메이션을 적용할 개체를 선택
> - 속성(values) : 애니메이션과 관련된 속성을 설정

### gsap.from()

**시작 점**을 지정하는 애니메이션이다.

```js
// x축 300에서 제자리로 돌아오는데 2초 걸린다 + 딜레이 3초
gsap.from(".box-1", { x: 300, duration: 2 }, 3);
```

> `gsap.from("타겟", {속성: 속성값, ...});`

### gsap.fromTo()

**시작 점과 끝나는 점**을 지정하는 애니메이션이다.

```js
gsap.fromTo(".box-1", { y: 50 }, { duration: 2, x: 500, y: 0 });
```

> `gsap.fromTo("타겟", {시작 속성: 시작 속성값, ...} , {끝나는 속성: 끝나는 속성값, ...});`
>
> - 시작 속성(values)에는 (ease.duration, delay, onComplete 사용 못함)

- fromTo 대문자 주의!

### gsap.set()

요소에 **속성 값을 미리 설정** 한다.

```js
// scale 0.8인 상태에서 1.5로 변하는 애니메이션
gsap.set("sc_intro", { scale: 0.8 });
gsap.to("sc_intro", {
  opacity: 0.5,
  scale: 1.5,
});
```

> `gsap.set("타겟", {속성: 속성값, ...});
>
> - 여러개 속성에 동시에 설정 가능
> - css를 미리 설정할 수 있지만 페이지 로딩 후 바로 보여야하는 애니메이션 경우 gsap 보다 css 에서 직접 설정하는 것이 좋다 (파일을 불러오고 애니메이션이 시작되기 때문에 gsap.set을 설정하기 전 css 가 보일 수 있음
>   )

## 설치

```bash
# NPM
npm i gsap
# or Yarn
yarn add gsap
# or pnpm
pnpm add gsap
```

## React/Next.js에서 기본 패턴

- 중요: Next.js 는 SSR이라 브라우저에서만 애니메이션을 실행해야한다.
  - 따라서 애니메이션 코드는 `"use client"` + `useEffect` 내부에서 DOM 에 접근하도록!

```tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function SimpleCard() {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.4,
        ease: "poser2.out",
      });
    }, cardRef); // context 는 해당 트리만 영향 + unmount 시 자동 정리
    return () => ctx.revert();
    // revert() 는 컴포넌트 언마운트 시 GSAP 애니메이션을 되돌리고 정리하는 함수
  }, []);

  return (
    <div ref={cardRef} className="rounded-2xl bg-neutral-900 p-6 text-white">
      HELLO GSAP
    </div>
  );
}
```

- `gsap.context` : 컴포넌트 언마운트 시 애니메이션 정리를 자동화 => 메모리,누수 방지
- Tailwind 는 그대로 쓰고, 움직임만 GSAP 가 맡는다.
