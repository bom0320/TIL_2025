```js
import { useEffect, useState } from "react";
import imagesLoaded from "imagesloaded";

const useRouterLoading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingCount, setLoadingCount] = useState(0);

  useEffect(() => {
    let imgLoaded = 0;
    let current = 0;

    const imgLoad = imagesLoaded("body");
    imgTotal = imgLoad.images.length;

    const updateProgress = () => {
      const target = (imgLoaded / imgTotal) * 100; // 현재 로드된 비율을 %로 계산
      current += (target - current) * 0.1;

      if (current >= 99) {
        setLoadCount(100);
        setIsLoaded(true);
        clearInterval(progressTimer);
      } else {
        setLoadingCount(Math.floor(current));
      }
    };

    // 이미지 1개 로드될 때마다 카운트 업
    const handleProgress = () => {
      imgLoaded++;
    };

    imgLoad.on("progress", handleProgress);

    // 1초당 60번 반복(60fps)
    const progressTimer = setInterval(updateProgress, 1000 / 60);

    // 클린업_컴포넌트가 언마운트될 때 타이머 멈추고 이벤트 핸들러 제거
    return () => {
      clearInterval(progressTimer);
      imgLoad.off("progress", handleProgress);
    };
  }, []);

  // 반환값
  // isLoaded: 모든 이미지 로딩 완료 여부(true -> loading animation 숨기기)
  // loadingCount: 로딩 진행률 (숫자 0~100 -> 로딩 화면에 %로 표시 가능)
  return { isLoaded, loadingCount };
};

export default useRouterLoading;
```

### 이벤트 리스너

```js
imgLoad.on("progress", handleProgress);
```

이건 **이벤트 리스너**이다.
즉, `imagesLoaded()` 는 "이벤트를 발생시키는 객체"를 반환한다. 이 객체(imgLoad)는 이미지가 하나씩 로딩될 때마다 `progress` 라는 **이벤트**를 발생시킨다.

그래서 `imgLoad.on("progress", handleProgress)는 이렇게 읽을 수 있다.

> "이미지가 하나 로드될 때마다, `handleProgress` 함수를 실행시켜줘"

**구조적으로 보면 이런 것**

```js
const imgLoad = imagesLoaded("body");

// imagesLoaded 내부에서 이런 식으로 동작한다고 보면 된다.

imgLoad.on = (eventName, callback) => {
  if (eventName === "progress") {
    // 이미지가 로드될 때마다 이 콜백을 실행
  }
};
```

그래서

```js
const handleProgress = () => {
  imgLoaded++;
};
imgLoad.on("progress", handleProgress);
```

이 코드는

- `imagesLoaded` 가 body안의 이미지를 감시하고 있음
- 이미지 하나가 성공적으로 로드될 때마다 `progress` 이벤트 발생
- 그때마다 `handleProgress()` 실행
- `handleProgress()` 는 단순히 로드된 이미지 개수(imgLoaded)를 +1 증가 시킴

즉, "이미지가 1개,2개,3개 로드될때마다 카운터를 올린다."라는 뜻

---

### `current + (target - current) * 0.1`

이건 "부드럽게 따라가기" 공식
이 식은 갑자기 값이 바뀌지 않고, 목표값(target)에 천천히 가까워지게 하는 보간식이다.
일명 lerp(linear interpolation)또는 ease-out 느낌

예를 들어 target=100, current=0이라고 하면 일반적으로 current = target 즉 바로 100으로 바뀌게 하는 이런식으로 쓸수도 있다. 하지만 이건 숫자가 휙하고 변해서 너무 갑작 스럽다.

대신

```js
current += (target - current) * 0.1;
```

이건 수식으로 보면 current 가 target과의 차이의 10%만큼 따라가라라는것 -> 즉, 매번 10% 씩 목표로 다가감

**그렇다면 왜 0.1을 곱하면 천천히 따라가라는 명령어가 되는걸까?**
이건 수학적 개념으로 보간(interpolation), 또는 감속(easing)이라고 한다. 이것을 이해하면 부드러운 애니메이션의 핵심 원리를 이해할 수 있다.

```js
// 첫번째 실행했을 시,
current += (100 - 0) * 0.1;
current = 10; // 10% 만큼 이동

// 두번째 실행했을 시,
current += (100 - 10) * 0.1;
current = 19; // 이번엔 9만큼 이동

// 3째 실행했을 시,
current += (100 - 19) * 0.1;
current = 27.1; // 점점 더 적게 이동

...

```

위에서 설명했듯, target을 100, current 를 0이라고 가정하고 실행하면, 이렇게 반복 될 수록 점점 target(100)에 가까워진다. 즉, 한번에 확 가지 않고, 점점 목표에 다가가는게 된다.

> **왜 점점 느려질까?**
>
> 매번 target-current 가 작아지기 때문이다. 즉, "남은 거리"가 줄어들수록 "움직이는 양도 작아지는 구조"이다.
> 따라서 변화량이 점점 작아지다보니, 자연스럽게 줄어드는 것처럼 보면 된다.

**💡 수학적으로는 이런 현상을 “감쇠(Damping)”라고 한다.**
이건 공처럼 생각해도 되는데,

공이 목표점(target)을 향해 튀어가는데, 매번 목표까지 남은 거리의 10%까지 이동한다면 처음엔 빠르게, 나중엔 점점 느리게 도착하게 된다. 그리고 결국, 100 에 "수렴(converge)" 하게 된다.

```sql
current
100 |                               ●
    |                          ●
    |                      ●
    |                 ●
    |            ●
    |       ●
    |   ●
    |●
  0 +--------------------------------
      1   2   3   4   5   6   7   ...
             (반복 횟수)

```

점점 천천히 목표에 가까워지는 "곡선형 상승"이 생긴다.

그래서 0.1을 곱한다는 건 "남은 거리의 10%씩만 움직여라"는 듯이 된다. 즉, 한번에 다 가지 말고 천천히 따라가라는 물리적 감속을 만드는 공식이다.
