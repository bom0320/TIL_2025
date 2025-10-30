# useCheckScroll 훅

이 훅은 이름 그대로 **스크롤 위치를 감지해서 어떤 컴포넌트를 보이게 할지 숨길지 결정하는 훅** 이다. 주로 헤더(상단바) 같은 UI를 스크롤하면 사라지고, 위로 올리면 다시 보이게 만들 때 쓰는 구조이다.

```js
import { useState, useEffect } from "react";

function unseCheckScroll(initialValue) {
  const [isShow, setIsShow] = useState(true);
  let lastScroll = 0; // lastScroll 변수 선언 및 초기화

  useEffect(() => {
    const checkTop = () => {
      const ScrollTop =
        window.pageYOffset ||
        window.scrollY ||
        document.documentElement.scrollTop;
      let startHeight = initialValue;
    };
  });
}
```
