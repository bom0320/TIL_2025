# Debounce와 throttle은 뭐고 각각 언제 사용할까

> Debounce와 throttle은 **시간이 지남에 따라 함수 실행을 허용하는 횟수를 제어**하는
> 유사하지만 다른 기술이다.
> 즉, 이 두개는 공통적으로 이벤트가 너무 자주 발생하는 걸 제어하는 기술이다. 즉, 함수실행 횟수를 제안해서 성능을 최적화하는 방법
> 각각의 기술에 대해 알아보고 언제 사용하는지 고찰해보자

ex. 입력창에서 글자를 입력할 때마다 검색 요청이 날아간다고 생각해보자.
매 타이핑마다 API를 호출하면 서버도, 브라우저도 부담이 크다.
그래서 이런 폭주를 막기 위해 쓰는게 Debounce와 Throttle이다.

## 1. 디바운싱, Debounce

- 연속적으로 발생한 이벤트를 하나로 처리하는 방식이다.
- 주로 처음이나 마지막으로 실행된 함수만을 실행한다.
- 성능상의 문제를 위해 사용한다.
  - 모든 함수를 실행하면 성능적으로 문제가 생길 수 있다.
    -> 즉, 멈췄을 때 실행

### 작동 원리

1. 이벤트가 발생하면 타이머를 설정한다.
2. 같은 이벤트가 일정 시간 내 다시 발생하면 기존 타이머를 초기화한다.
3. 일정 시간 동안 추가 이벤트가 없을 때 비로소 함수 실행

### 디바운스 구현 코드

> - 디바운스를 어떻게 구현하는지 간단한 예시로 살펴보자
> - 타이핑이 될때마다 이벤트가 발생하는 코드에 디바운스를 적용하여 코드를 수정해보면서 이해하고자 한다.

```js
function typingInput() {
  const name = nameElem.value;
  console.log(`입력된 이름:  ${name}`);
}
const nameElem = document.getElementById("inputName");

name.Elem.adEventListener("input", typingInput);
```

위 코드는 input 태그에 타이핑 될때마다 console 이 찍히는 것을 확인할 수 있다.

- 타이핑할때마다 console이 찍히는 것이 아니라 1초마다 타이핑이 찍히도록 디바운싱을 적용해보았다.
- setTimeout으로 특정 시간동안 딱한번만 함수가 실행되도록 코드를 작성한다.
  - 마지막 함수 실행 후 1초후 console이 찍힌다.

```js
let alertTimer;

function alertWhenTypingStops() {
  // 앞선 타이머를 리셋
  // 따라서 마지막 함수가 실행 (타이핑을 멈추고선 함수 실행)

  if (alertTimer) {
    // 이전에 설정된 타이머가 있다면 지운다.
    clearTimeout(alertTimer);
  }

  const name = nameElem.value;
  // 타이머 시작
  // 현재 input의 value를 읽는다.

  // 새로운 타이머를 설정한다. => 타이핑을 멈추고 1초가 지나야 실행됨
  alertTimer = setTimeout(() => console.log(`입력된 이름: ${name}`), 1000);
}

const nameElem = document.getElementById("inputName");

nameElem.adEventListener("input", alertWhenTypingStops);
```

이 코드는 입력이 계속 이어지는 동안은 이전 타이머가 계속 취소되고, 사용자가 멈춘 뒤 1초 동안 추가 입력이 없으면 그때 딱 한번 실행된다.

## 대표적 사용 예시

- 키워드 검색 혹은 자동완성 기능에서 api 호출 횟수를 최대한 줄이고 싶을때
- 사용자가 창 크기조정을 멈출때까지 기달렸다가 resizing Event를 반영하고 싶을때

---

## 2. 쓰로틀링, Throttling

- 스로틀링은 출력을 조절한다는 의미로 이벤트를 일정 주기마다 발생하도록 하는 기술
- 100ms 를 준다면 이벤트는 100ms 동안 최대 한번만 발생하게 됨
- 즉 마지막 함수가 호출된 후 일정시간이 지나기전에 다시 호출되지 않도록 함
  - 일정 시간동안 딱 한번만 이벤트를 발생시킴!!
- 연이어 발생한 이벤트에 대해, 일정한 delay를 포함시켜 연속적으로 발생한 이벤트는 무시하는 방식을 뜻한다.
- 즉, delay시간동안 호출된 함수는 무시한다.

-> 즉, 일정 간격마다 실행

```js
let isInThrottle;

function increaseScoreDuringTyping() {
  if (isInThrottle) {
    return;
  }

  isInThrottle = true;
  // 타이머 세팅

  setTimeout(() => {
    const score = document.querySelector("#score");
    const newScore = parseInt(score.innerText) + 1;
    score.innerText = newScore;

    isInThrottle = false;
  }, 500);

  const nameElem = document.querySelector("#inputName");

  nameElem.addEventListener("input", increaseScoreDuringTyping);
}
```

- 쓰로틀러를 500ms 동안 작동시키고, 만약 쓰로틀러가 이벤트를 조이고 있는 경우, 해당 이벤트는 무시된다.

### 차이 요약

```
이벤트 발생: ────●●●●────●────●────

디바운스:   ────────────────────────○ (마지막에 한 번)
스로틀:     ───○────○────○──────── (주기적으로)

```

## 대표적 사용 예시

- 스크롤에 많이 사용된다. (모든 스크롤을 기록하는 것.. 또한 성능 문제가 있음 따라서 특정 시간마다의 스크롤의 위치를 찍어주는 것이 좋다.)
  - Lodash라는 라이브러리로 이미 구현되어있는 쓰로틀링을 사용해본 경험이 있다. 이제야 그 라이브러리를 왜 쓰는지 제대로 알게 되었다.
