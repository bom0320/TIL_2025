# CSS module이란, Css module 사용 이유

## CSS Module

> CSS 사용 시, Class 이름을 고유한 값으로 자동 생성하는 것을 말한다.
> 가령 React에서 CSS module을 사용한다면, Component에 적용하는 style 클래스의 이름이 중첩되는 현상을 방지하는 역할을 한다.

## CSS Module 사용 방법

> CSS 파일을 CSS파일명.module.css로 작성하고 className을 import를 하며 지정한 변수의 값, 클래스 이름으로 지정하면 된다.

글로만 작성하면 잘 모르겠으니, 직접 코드를 살펴보도록 하자.

```js
// App.js
import Button from "./otherJs/button.js";
import styles from "./App.module.css";

function App() {
  return (
    <div className="App">
      <h1 className={styles.title}>Welcome!</h1>
      <Button text={"Continue"} />
    </div>
  );
}

export default App;
```

```css
/* App.module.css */
.title {
  font-family: "Courier New", Courier, monospace;
  font-size: 18px;
}
```

1. App.module.css를 import
2. h1.tag에 className을 지정 {styles.titles}
3. App.module.css로 넘어가서 title에 style을 추가
4. h1 tag에 font-family와 font-size가 적용된 것을 확인

## CSS Module 왜 사용?

간단히 장점 2개만 알아보도록 하자.

1. CSS module 사용 시, 클래스 명 충돌이 X (각자 고유한 값을 가지므로 충돌 x)
2. Css module은 Component 단위로 스타일을 적용할 때 유용하다. -> 이에 따라 실수로 CSS 클래스 이름이 다른 곳에서 중첩으로 사용될 걱정을 할 필요가 없다.
