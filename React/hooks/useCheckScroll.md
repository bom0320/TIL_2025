# useCheckScroll 훅

이 훅은 이름 그대로 **스크롤 위치를 감지해서 어떤 컴포넌트를 보이게 할지 숨길지 결정하는 훅** 이다. 주로 헤더(상단바) 같은 UI를 스크롤하면 사라지고, 위로 올리면 다시 보이게 만들 때 쓰는 구조이다.

```js
import { useState, useEffect } from "react";

function useCheckScroll(initialValue) {
  const [isShow, setIsShow] = useState(true);
  let lastScroll = 0; // lastScroll 변수 선언 및 초기화

  useEffect(() => {
    // 상단 값 체크 함수
    const checkTop = () => {
      let scrollTop =
        window.pageYOffset ||
        window.scrollY ||
        document.documentElement.scrollTop;
      let startHeight = initialValue; // 초기값을 사용

      if (startHeight >= scrollTop) {
        // 안닿았을 때
        setIsShow(true);
      } else {
        // 닿았을 때
        setIsShow(false);
        lastScroll = scrollTop;
      }
    };

    window.addEventListener("scroll", checkTop);

    return () => {
      window.removeEventListener("scroll", checkTop);
    };
  }, [initialValue]); // initialValue를 의존성 배열에 추가

  return isShow;
}

export default useCheckScroll;
```
