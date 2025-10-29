# 반응형 웹의 숨겨진 영웅, window.matchMedia() 파헤치기

프론트엔드 개발을 하다보면 흔히 CSS로 "반응형 디자인"을 접하기만 한다. 하지만 이러한 반응형 디자인을 JavaScript 레벨에서 더욱 강력하게 제어할 수 있게 해주는 웹 API, 바로 `window.matchMedia()` 에 대해 자세히 알아보도록 하자

> **window.matchMedia()란?**
>
> css의 @media 쿼리를 JavaScript 에서도 감지하고 반응할 수 있게 해주는 함수

### window.matchMedia() 왜 필요할까?

보통 화면의 크기에 따라 UI 가 바뀌어야 한다? => CSS 의 @media 쿼리를 사용한다.

이렇게 👇

```css
@media (max-width: 768px) {
  body {
    background-color: lightblue;
    /*이건 브라우저 너비가 768px 이하일 때만 CSS가 적용되는 코드*/
  }
}
```

**하지만..**

때로는 이러한 CSS으로만은 부족한 경우가 생긴다. (ex: 단순히 스타일만 바꾸는 걸 넘어서, 동작(로직)을 바꿔야하는 상황)
즉, CSS는 "보여지는 모양"까지만 조정할 수 있지만, JavaScript 는 실제 동작(기능)을 바꿀 수 있다. 아래 예시들을 통해 살펴보도록 하자

### 1. 다크 모드 감지 -> JS로 테마 변경

CSS에서도 `prefers-color-scheme: dark` 를 감지할 수는 있지만, JS로는 그걸 감지해서 로직을 추가할 수 있다. 예를 들어 localStorage에 사용자의 테마 선택을 저장하고 싶다면, CSS 로는 불가능하다.

```js
const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");

if (darkModeQuery.matches) {
  document.body.classList.add("dark");
} else {
  document.body.classList.remove("dark");
}
```

css는 단순히 "다크 테마일 때 스타일을 이렇게 바꿔라" 까지만 가능하지만, JS 는 "다크 모드면 로컬 스토리지에 저장하고, UI 테마 버튼 상태도 같이 바꿔라" 같은 복잡한 행동을 제어할 수 있다.

### 2. 특정 화면 크기에서만 실행되는 기능

CSS 로는 "숨기기/보이기" 까지만 가능하지만, JS에서는 "특정 크기에서만 동작하는 코드"를 실행할 수 있다.

```js
cost mediaQuery = window.matchMedia("(max-width: 768px)");

function handleScreenChange(e) {
    if(e.matches) {
        // 모바일일 때만 실행되는 JS 로직
        enableMobileMenu();
    } else {
        disableMobileMenu();
    }
}

mediaQuery.addEventListener("change", handleScreenChange);
```

css 는 메뉴를 숨시거나 보이게는 할 수는 있어도, 실제로 "메뉴 토글 이벤트를 추가/제거" 하는 건 JS 만 할 수 있다.

### 3. 인쇄 모드 감지

사용자가 문서를 인쇄하려고 할 때, 인쇄 직전에 데이터를 계산하거나 API 요청을 보내는 건 CSS로는 불가능하다.

```js
const printQuery = window.matchMedia("print");

printQuery.addEventListener("change", (e) => {
  if (e.matches) {
    preparePrintData(); // 인쇄용 데이터 준비
  }
});
```

### 4. 접근성 설정에 맞춘 인터랙션 제어

CSS 로는 `prefers-reduced-motion` 을 감지해서 애니메이션을 "줄이거나 끄는" 스타일 변경까지만 가능하지만, JS로는 "애니메이션 자체를 실행하지 않거나, 프레임워크의 트랜지션 로직을 건너뛰게 또는 애니메이션을 줄이는" 만들 수 있다.

```js
const reduceMotion = window.matchMedia("(prefers-reduce-motion: reduce)");

if (reduceMotion.matches) {
  disableAnimations();
}
```

## matchMedia() 사용법

`window.matchMedia()` 는 인자로 CSS 미디어 쿼리 문자열을 받아서 `MediaQueryList` 객체를 반환한다.

```js
const mq = window.matchMedia("(max-width: 600px)");
```

이 `MediaQueryList` 객체에는 다음과 같은 중요한 속성과 메서드가 있다.

### MediaQueryList에 대하여

`MediaQueryList` 는 `window.matchMedia()` 를 실행했을 때 반환되는 특별한 객체이다.

**1. matches 속성: 현재 상태 즉시 확인하기**
가장 많이 사용되는 속성이다. 현재 문서가 미디어 쿼리와 일치하는지 `true` 또는 `false` 로 즉시 알려준다.

```js
const isMobile = window.matchMedia("(max-width: 768px)").matches;

if (isMobile) {
  console.log("현재 모바일 뷰입니다 📱");
} else {
  console.log("현재 데이크톱 뷰입니다 💻");
}
```

**2. media 속성: 적용된 미디어 쿼리 확인**
`matchMedia()` 에 전달했던 미디어 쿼리 문자열을 그대로 반환한다.

```js
const mq = window.matchMedia("(prefers-color-scheme: dark)");
console.log(mq.media);
```

**3. addEventListener("change", handler) : 상태 변화 감지하기**

이것이 `matchMedia()의 진정한 힘이다. 미디어 쿼리 일치 상태가 변경될 때마다 특정 함수를 실행하도록 이벤트 리스너를 등록할 수 있다. 예를 들어, 브라우저 창 크기를 조절하거나, OS의 다크 모드 설정을 변경할 때 유용하다.

```js
// 다크 모드 선호 설정 감시 예시
const darkModeMediaQuery = window.matchMedia("(prefer-color-scheme: dark)");

// 이벤트 리스너 함수 정의
const handleColorSchemeChange = (e) => {
  if (e.matches) {
    console.log("사용자가 다크 모드를 선호합니다.");
    document.body.classList.add("dark-theme"); // body에 dark-theme 클래스 추가
  } else {
    console.log("사용자가 라이트 모드를 선호합니다.");
    document.body.classList.remove("dark-theme"); // dark-theme 클래스 제거
  }
};

// 'change' 이벤트 리스너 등록
darkModeMediaQuery.addEventListener("change", handleColorSchemeChange);

// !중요: 페이지 로드 시 초기 상태를 한 번 실행해 주는 것이 좋다!
handleColorSchemeChange(darkModeMediaQuery); // 현재 상태를 즉시 적용
```

이처럼 `addEventListener` 을 사용하면 실시간으로 미디어 환경 변화에 대응하는 동적인 웹 페이지를 만들 수 있다.

## 실전 활용 예시

### 1. 다크 모드 감지 -> JS 테마로 변경

위에 설명된 (`perfers-color-scheme: dark`) 미디어 쿼리를 사용하면 사용자의 OS 설정에 맞춰 테마를 자동으로 변경할 수 있다. 여기에 `localStorage` 를 활용하여 사용자가 직접 테마를 선택할 수 있는 기능까지 추가하면 금상청화! (아까 사용자 등록 폼에서 본 코드처럼)

### 2. 인쇄 모드 감지

인쇄할 때 보통 내비에기션 바, 푸터, 광고 등은 필요 없다. `(print)` 미디어 쿼리를 사용하면 인쇄 시에만 특정 요소를 숨길 수 있다.

```js
const printMediaQuery = window.matchMedia("print");

const handlePrintChange = (mql) => {
  if (mql.matches) {
    console.log("인쇄 모드 진입");
    document.body.classList.add("is-printing");
    // 필요한 경우 인쇄 전 추가 작업 수행
  } else {
    console.log("인쇄 모드 종료");
    document.body.classList.remove("is-printing");
    // 숨겼던 요소 다시 표시
  }
};

printMediaQuery.addEventListener("change", handlePrintChange);
handlePrintChange(printMediaQuery); // 초기 상태 적용
```

그리고 CSS 에서 `body.is-printing` 클래스를 활용해 스타일을 적용할 수 있다.

```css
/* CSS */
.some-element {
  /* 기본 스타일 */
}

body.is-printing .some-element {
  display: none; /* 인쇄 시 숨김 */
}

/* @media print 직접 사용도 가능 */
@media print {
  header,
  footer,
  nav {
    display: none;
  }
}
```

### 3. 접근성 설정에 맞춘 인터랙션 제어 (애니메이션 선호도 감지)

사용자가 운영체제에서 "움직임 줄이기" 설정을 켜두었다면, 웹페이지의 복잡한 애니메이션을 줄여주는 것이 좋다.

```js
const prefersReduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

const handleMotionChange = (e) => {
  if (e.matches) {
    console.log("움직임 줄이기 모드 활성화");
    // 복잡한 CSS 애니메이션 클래스 제거 또는 JS 애니메이션 비활성화
  } else {
    console.log("움직임이 자유로운 모드 활성화");
    // 애니메이션 활성화
  }
};

prefersReduceMotion.addEventListener("change", handleMotionChange);
handleMotionChange(prefersReduceMotion);
```

## 주의할 점

- `addEventListener()` 로 리스너를 등록했다면, 컴포넌트 언마운트 시점 등 필요 없을 때는 **반드시 `removeEventListener()`로 제거** 해 주어야 메모리 누수를 방지할 수 있다. (Vue의 `onUnmounted` 훅에서 사용하면 좋을듯?)

### 마치며

`window.matchMedia()` 는 단순히 미디어 쿼리 확인을 넘어, 웹 페이지가 사용자의 환경 변화에 더욱 똑똑하고 유연하게 반응하도록 돕는 강력한 도구이다. 우리가 다음 반응형 웹 프로젝트에 `matchMedia()` 를 적극적으로 활용하여 사용자 경험을 한 단계 업그레이드해보도록 하자.

## + Example Code_React Hooks

### useMatchMedia.jsx

```js
import { useState, useEffect } from "react";

const useMatchMedia = (query) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  // 상태 업데이트 함수
  const handleChange = (event) => {
    setMatches(event.matches);
  };

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    // 미디어 쿼리 변화 감지
    mediaQueryList.addEventListener("change", (e) => handleChange(e));

    // 클린 업
    return () => {
      mediaQueryList.removeEventListener("change", (e) => handleChange(e));
    };
  }, [query]);

  return matches;
};

export default useMatchMedia;
```
