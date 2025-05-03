이벤트 버블링(Bubbling)과 캡처링(Capturing)
===

이번에는 꽤 기초적이지만 중요한 JavaScript로 구현한 이벤트를 브라우저에서 화면 구성요소가 어떻게 감지하고, 그 이벤트가 다른 화면 요소에 전파되는지에 대한 글을 작성하려고 한다.

이벤트 전파에 대해 설명하기 전에 JS 이벤트가 브라우저에서 어떻게 동작하는지에 대해 먼저 설명해보겠다.

## 이벤트 핸들링 (Event Handling)
**이벤트**란 마우스 클릭이나 키보드 입력과 같이 일반적으로  **사용자가 행하는 모든 동작**을 말한다. 이러한 이벤트를 원하는대로 처리하는 것을 **이벤트 핸들링(Event Handling)** 라고 한다.

이벤트 핸들링을 하기 위해 이벤트를 받을 화면 요소를 선택하고,
그 요소와 이벤트를 연결해주는 것을 **이벤트 바인딩(Event Binding)** 이라고 하며, 아래처럼 사용한다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>event binding</title>
  </head>
  <body>
    <button id="eventBtn">Event!</button>
  </body>
</html>
```

```js
var btn = document.getElementById('eventBtn');
btn.addEventListener('click', myFunc);

function myFunc(event) {
  console.log(event);
}
```
화면의 **버튼 요소**에 **click 이벤트**가 발생하면 myFunc 함수가 호출하도록 구현한 코드이다. 여기서 버튼 요소와 click 이벤트를 연결할 때 사용한 addEventListener() 는 화면에 동적인 기능을 추가할 때 사용하는 웹 API로, 사용자의 입력에 따라 추가적인 동작을 구현할 수 있다. 

> **element.addEventListener(event, function, useCapture)**

위처럼 addEventListener()를 사용할 때, 세번째 인자인 **useCapture** 와 관련된 개념이 바로 이벤트 버블링(Bubbling)과 캡쳐링(Capturing)이다. default 값은 false(버블링)이며, true로 변경하면 캠쳐링을 통해 이벤트를 전파한다.

## 이벤트 버블링 (Bubbling)
**이벤트 버블링(Bubbling)** 이란, **하위요소에서 상위요소로의 이벤트 전파 방식** 으로, 말 그대로 HTML 구조상 자식 요소에 발생한 이벤트가 상위의 부모요소에까지 영향을 미치는 것이다. 아래 예를 보면 쉽게 이해가 가능할 것이다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>event bubbling</title>
  </head>
  <body>
    <div class="one">
      <div class="two">
        <div class="three">
            target
        </div>
      </div>
    </div>
</html>
```

```js
document
  .querySelector('.one')
  .addEventListener('click', function() {
    alert('one');
  });

document
  .querySelector('.two')
  .addEventListener('click', function() {
    alert('two');
  });

document
  .querySelector('.three')
  .addEventListener('click', function() {
    alert('three');
  });
```

가장 하위 요소에 해당하는 target 요소를 클릭하면 **three -> two -> one** 순으로 알림창이 뜨는 것을 확인할 수 있다. 이벤트 핸들러가 등록된 중첩된 요소들에서 이벤트가 발생했을 때, 하위 요소에서 상위 요소로 이벤트가 전파되는 것!


실제로 이벤트 버블링으로 인해 브라우저에서 예상치 못한 동작이 이뤄지는 경우가 빈번하다. 

그만큼 중요한 개념이며, 알고있으면 미리 예방하거나 적절하게 이벤트를 차단하므로써 해결이 가능하다.

## 이벤트 캡쳐링 (Capturing)
이벤트 캡쳐링은 이벤트 버블링과는 반대로 **상위요소에서 하위요소로의 이벤트 전파방식**을 의미한다.

앞에서도 설명했지만 addEventListener(event, function, useCapture) 의 세번째 인자 값의 default 가 버블링이기 때문에 일반적으로는 이 특성이 익숙한 사람이 많을 것이다. 앞에서 예를 들었던 코드에 세 번째 인자 값 true를 적용하면 아래와 같은 결과가 발생한다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>event capturing</title>
  </head>
  <body>
    <div class="one">
      <div class="two">
        <div class="three">
            target
        </div>
      </div>
    </div>
</html>
```

```js
document
  .querySelector('.one')
  .addEventListener('click', function() {
      alert('one');
    }, true);

document
  .querySelector('.two')
  .addEventListener('click', function() {
    alert('two');
  }, true);

document
  .querySelector('.three')
  .addEventListener('click', function() {
    alert('three');
  }, true);
```

이벤트 버블링에서는 target 요소를 클릭했을 때, three -> two -> one 순으로 이벤트가 발생했지만, 캡쳐링 이벤트에서는 반대로 **one -> two -> three** 순으로 이벤트가 발생하는 것을 확인할 수 있다.

## 이벤트 차단
이벤트 버블링은 target 요소에서 상위로 올라가 html 태그와 document. window 까지 전달된다. 이를 막기 위해서는 단순히 **event.stopPropagation()** 메서드를 사용해 원하는 곳에서 이벤트 전파를 차단시키면 된다.


그리고 이벤트 캡처링의 경우에는 **event.stopPropagation()** 메소르를 사용하면, target요소의 최상위 요소의 이벤트만 동작시키고 하위 요소들로 이벤트를 전달하지 않는다. 

```js
// 이벤트 버블링
document.querySelector('.three').addEventListener('click', function(event) {
  event.stopPropagation(); // 이벤트 차단
  alert('three');
});
```

```js
// 이벤트 캡쳐링
document.querySelector('.three').addEventListener('click', function(event) {
  event.stopPropagation(); // 이벤트 차단
  alert('three');
}, true);
```
앞서 예시로 설명한 코드 기준에서 이 메소드를 사용하면 각각 three와 one 알람창만 뜨게 된다.


이벤트 등록과 이벤트 전파에 대해 알고 있다면, 이러한 특성을 이용하여 **이벤트 위임**으로 좀 더 자유롭고 간편하게 이벤트를 다룰 수 있게 된다. 이벤트 위임이라는 것도 사실 크게 어려운 개념은 아니고 동적인 요소를 다루다보면 겪게되는 불편함을 위해서 설명한 이벤트 특성을 활용해 해결할 수 있는 유용하면서도 기본적인 패턴이다.