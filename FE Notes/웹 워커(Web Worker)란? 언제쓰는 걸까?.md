# 웹 워커(Web Worker)란? 언제쓰는걸까? feat. timer

> 브라우저가 인식할 수 있는 몇 안되는 언어인 자바스크립트는 놀랍게도 싱글 스레드이다.

그리고 **싱글 스레드**이기 때문에 몇가지 한계가 존재한다.

# 싱글 스레드의 한계

싱글 스레드의 경우 기본적으로 연산량이 많은 작업을 하는 경우, 그 작업이 완료되어야 다른 작업을 수행할 수 있다.
또 setInterval과 같은 함수로 반복 로직을 구현한 경우 브라우저의 정책으로 인해 쓰로틀링이 걸려버릴 수 있다. 예를 들어 브라우저 탭이 비활성화 될 경우 크롬의 경우 시간이 멈추고, 사파리는 시간이 1.5배속으로 흐르는 등.. 결과가 전혀 보장되지 않을 수 있다.

## 쓰로틀링이란?

쓰로틀링이란 브라우저가 자체적으로 판단했을 때 비활성화 된 탭에서 반복적으로 발생하는 이벤트가 있다면 그 이벤트에 delay를 줘서 결국 해당 이벤트를 무시하고 메모리 자원을 다른 곳에 쓰는 등 메모리를 효율적으로 관리하는 방법이다.

어떻게 보면 브라우저의 입장에서는 이해가 되는 부분이지만 로직을 짜는 입장에서는 답답할 수 밖에 없다. 정말 계속해서 몇초마다 돌아야 하는 기능을 구현하게 된다면 이는 큰 문제가 될 것이다.

**그리고 이를 해결할 수 있는게 바로 웹 워커이다.**

## 웹 워커란?

웹 워커는 자바스크립트의 메인 스레드가 아닌 **브라우저의 백그라운드 스레드**에서 돌기 때문에 탭이 비활성화 되어도 영향을 받지 않고 멀티 스레딩의 장점을 취할 수 있다.
즉, 웹 페이지가 사용자 인터페이스(UI)를 그리거나 반응하는 동안 무거운 계산이나 데이터 처리 등을 워커에서 맡길 수 있다. 이렇게 하면 ui 가 멈추거나 끊기지 않고 부드럽게 작동할 수 있다.

> ex) 사진 편집 앱에서 필터 계산이나 이미지 변환을 할 때, 그 처리를 워커에게 맡기면 메인 스크립트(화면을 관리하는 쪽)는 계속 사용자 입력에 반응할 수 있다.

그렇다면 웹 워커를 당장 도입하면 되는거 아닌가?

# 웹 워커를 도입할 때 주의해야 하는 이유

웹 워커는 장점과 단점이 뚜렷하다. 그래서 인지 해외 개발 커뮤니티를 보더라도 웹 워커를 정말 필요로 할 때만 쓰는 것을 추천하는 글이 많다. 이유는 이전글에 설명했다 싶이 모든 것은 비용이기 때문이다. **메모리는 유한하다.**

간단한 로직이라면 싱글 스레드로도 충분한다 굳이 브라우저의 백그라운드 스레드를 사용하는 게 배보다 배꼽이 더 클 수 있다는 것이다. 이전 글에서 설명했듯 멀티 스레드를 사용하게 되면 컨텍스트 스위칭이 잦게 발생하면서 오버헤드 비용이 발생할 수 있고, 그렇게 되면 성능 문제가 생기기 때문에 주의를 기울여야 한다는 것이다.

하지만 필요한 곳에 적절하게 사용한다면 더할나위 없이 없이 좋은 기능이라서 이번 글에서 다뤄보려고 한다. 웹 워커를 사용하여 타이머 기능을 구현하는 방법은 다음과 같다.

## Worker의 기본 사용법

### 생성자

```js
let worker = new Worker("worker.js");
```

이렇게 하면 브라우저가 `worker.js` 라는 파일을 백그라운드 스크립트로 실행할 워커를 만든 것 또는 Blob URL 등을 사용해서 동적으로 스크립트를 전달 할 수 있다.

### 통신 - 메시지 주고 받기

워커와 메인 스크립트(웹 페이지 쪽)는 서로 **postMessage / onmessage**
방식을 통신한다.

**메인 -> 워커**

```js
worker.postMessage(someDate);
```

**워커 -> 메인 :**

- 워커 내부 스크립트에서

```js
postMessage(result);
```

메인 쪽에서는 워커가 보낸 메시지를 받기 위해 worker.onmessage = function(event) {...} 같은 이벤트 헨들러를 쓴다.

### 워커 종료하기

워커가 더 이상 필요 없을 때는:

```js
worker.terminate();
```

이걸 호출하면 워커가 즉시 종료된다. 진행 중이던 작업도 강제로 멈춘다.

---

# 웹 워커 사용하기

참고로 웹 워커는 DOM에 직접 접근하지 못하기 때문에 **메인 스레드와 서로 메시지를 주고 받아서 통신**한다. postMessage로 메시지를 보내고, onMessage 로 메시지를 받는다. 가장 먼저 이걸 이해해야 웹 워커를 이해할 수 있다.

일단 파일을 분리한다.

1. **메인 자바스크립트 파일과**
2. **웹 워커 로직이 있는 파일**

아래와 같이 1초마다 postMessage라는 함수에 날짜 정보를 넣는 함수가 있다고 가정해보자.

> 웹 워커 로직에 들어가 있는 worker.js 이다.

```js
onmessage = function (e) {
  if (e.data === "start") {
    this.intervalId = this.setInterval(() => {
      postMessage(new Date());
    }, 1000);
  }
  if (e.data === "stop") {
    clearInterval(this.intervalId);
  }
};
```

위 로직에 들어간 worker.js 파일을 메인 자바스크리븥 파일에서 호출한다. 테스트 편의를 위해 script 를 html에 inlined으로 넣었다

```html
<!DOCTYPE html>
<html lang="en">
<head>
</head>
<body>
<div id="timer"></div>

<script type="text/javascript">
    const myWorker = new Worker('./worker.js');
    myWorker.postMessage('start')

    const timerEl = document.querySelector('#timer')
    myWorker.onmessage = function (e) {
        timerEl.innerHTML = e.data
    }

</script>
</html>

```

위 소스를 간단하게 설명하자면,

timer라는 id 를 가진 div를 선언하고, worker라는 js파일을 호출해서 myWorker라는 상수를 담아준다.

그리고 myWorker에 'start'라는 메시지를 보낸다. 그리고 worker.js가 post된 메시지를 onmessage로 받는데, message의 내용이 'start'였으니 분기문을 타고 아래 1초마다 돌아가는 setInterval 함수가 실행되는 것이다.

아무튼 그렇게 1초마다 도는 스코프에서 우리는 return의 의미로 post를 다시 할 것인데 어떤 것을 return 할 것이냐면 바로 날짜이다. 이렇게 되면 날짜 정보가 1초마다 업데이트되면서 return 된다.

```js
onmessage = function (e) {
  if (e.data === "start") {
    this.intervalId = this.setInterval(() => {
      postMessage(new Date());
    }, 1000);
  }
  if (e.data === "stop") {
    clearInterval(this.intervalId);
  }
};
```

return 된 데이터는 onmessage로 받아줘야 하며 받은 데이터를 위에 html body에 선언한 div 태그 값으로 넣어준다.

```js
myWorker.onmessage = function (e) {
  timerEl.innerHTML = e.data;
};
```

그렇게 되면 날짜 정보가 계속해서 바뀌는 것을 볼 수 있다.

이제 이 타이머는 특수한 경우가 아닌 이상 브라우저의 탭이 비활성화되어도 계속 같은 시간마다 반복적으로 돌 것이다.

같은 원리로 제어할 수있다. start 대신 stop 을 보내면 되지 않을가?

```js
myWorker.postMessage('start') X
myWorker.postMessage('stop') O
```

그렇게 되면 worker.js에서 if (e.data === "stop") 라는 분기문을 타고 해당 setInterval함수를 끝낼 수 있다.

```js
onmessage = function (e) {
  if (e.data === "start") {
    this.intervalId = this.setInterval(() => {
      postMessage(new Date());
    }, 1000);
  }
  if (e.data === "stop") {
    clearInterval(this.intervalId);
  }
};
```
